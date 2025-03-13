import { Router } from "express";
import userModel from "../../models/users.models.js";
import { createHash , isValidPassword } from "../../utils/bcrypt.js";
import { generateToken } from "../../utils/authToken.js";

import passportCall from "../../middlewares/passportCall.js";
import authorization from "../../middlewares/authorization.middleware.js";
import cartModel from "../../models/cartModel.js";



const sessionrouter = Router();
//passport.authenticate('jwt', { session: false })
//register sin passport solo con JWT

sessionrouter.get('/current', passportCall('jwt'), authorization('admin') ,(req, res ) => {
    console.log(req.user);
    res.send("info sensible: "+ req.user.email)
})
sessionrouter.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error) {
            res.status(500).send(error)
        }
    })
    res.send('logout')
})

sessionrouter.post('/login',async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        
        return res.status(400).send({ status: 'error', error: 'faltan datos' })
    }
    const userFound = await userModel.findOne({ email })
    if (!userFound) {
        return res.status(400).send({ status: 'error', error: 'el usuario no existe' })
    }
    if(!isValidPassword(password, userFound.password)){
        return res.status(400).send({ status: 'error', error: 'credenciales incorrectas' })
    }
    
    const token = generateToken({
        email: userFound.email,
        id: userFound._id,
        role: userFound.role
    })

    //const result = await userModel.findOne({ email })
    res.cookie('coderCookieToken', token, { 
        maxAge: 1000 * 60 * 60 * 24, httpOnly: true 
    })
    .send({status: 'success', message: 'login exitoso'})

    
})
sessionrouter.post('/register', async (req, res) => {
    const { email, password , first_name, last_name, age} = req.body
    console.log(req.body);

    if (!email || !password || !first_name || !last_name) {
        
        return res.status(400).send({ status: 'error', error: 'faltan datos' })
    }
    const userFound = await userModel.findOne({ email })
    if (userFound) {
        return res.status(400).send({ status: 'error', error: 'el usuario ya existe' })
    }
    const newCart = await cartModel.create({ products: [] });
    const newUser = {
        email,
        first_name,
        last_name,
        age,
        password: createHash(password),
        cart: newCart._id
    }
    const result = await userModel.create(newUser)
    res.send({status: 'success', payload: result})
   
   
})
export default sessionrouter