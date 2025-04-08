import sessionDaoMongo from "../dao/MONGO/sessions.dao.js";
import { createHash , isValidPassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/authToken.js";


import cartModel from "../dao/MONGO/models/cart.model.js";
import { sendLoginEmail, sendTicketEmail } from "../utils/mailer.js";
class SessionsController {
    constructor() {
        this.service = new sessionDaoMongo();
    }

   
    register =  async (req, res) => {
        try {
            const { email, password , first_name, last_name, age} = req.body
        console.log(req.body);
    
        if (!email || !password || !first_name || !last_name) {
             
            return res.status(400).send({ status: 'error', error: 'faltan datos' })
        }
        const userFound = await this.service.getUser(email);
        if (userFound) {
            return res.status(400).send({ status: 'error', error: 'el usuario ya existe' })
        }
    
        const newUser = {
            email,
            first_name,
            full_name: `${first_name} ${last_name}`,
            last_name,
            age,
            password: createHash(password),
            cart: null // Inicializamos el campo 'cart' como null, que se actualizará más tarde
          };
          
          try {
            const result = await this.service.createUser(newUser);
          
            if (!result || !result._id) {
              throw new Error('Error: El usuario no se ha creado correctamente');
            }
          
            console.log("Usuario creado con éxito:", result._id);
          
            const newCart = await cartModel.create({ products: [], user: result._id });
            console.log("Carrito creado con éxito:", newCart._id);
          
            result.cart = newCart._id;
            await result.save();
          
            res.send({ status: 'success', payload: result });
          } catch (error) {
            console.log("Error al crear el usuario o el carrito:", error);
            res.status(500).send({ status: 'error', error: error.message });
          }
        } catch (error) {
            console.log(error);
        }
        
        
       
    }
    login = async (req, res) => {
        const { email, password } = req.body
        if (!email || !password) {
            
            return res.status(400).send({ status: 'error', error: 'faltan datos' })
        }
        const userFound = await this.service.getUser(email);
        if (!userFound) {
            return res.status(400).send({ status: 'error', error: 'el usuario no existe' })
        }
        if(!isValidPassword(password, userFound.password)){
            return res.status(400).send({ status: 'error', error: 'credenciales incorrectas' })
        }
        
        const token = generateToken({
            email: userFound.email,
            id: userFound._id,
            role: userFound.role,
            cart: userFound.cart
        })

        sendLoginEmail(userFound.email, userFound);
        //const result = await userModel.findOne({ email })
        res.cookie('coderCookieToken', token, { 
            maxAge: 1000 * 60 * 60 * 24,secure: false, httpOnly: true 
        })
        .redirect('/')
    
        
    }
    logout =  (req, res) => {
        req.session.destroy(error => {
            if (error) {
                res.status(500).send(error)
            }
        })
        res.send('logout')
    }
    current = (req, res ) => {
        console.log(req.user);
        res.send("info sensible: "+ req.user.email)
    }
  
}
export default SessionsController