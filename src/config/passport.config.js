import passport from "passport";
import jwt from "passport-jwt";
import { PRIVATE_KEY } from "../utils/authToken.js";


const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const inizializePassport = () => {
    const cookieExtractor = req => {
        let token=null
        if(req && req.cookies){
            token = req.cookies['coderCookieToken']

        }
        return token
    }
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY     
 }, async (dataFromToken, done) => {
     try {
         return done(null, dataFromToken)
     } catch (error) {
         done(error)
     }
 }))
 
}
/*const inizializePassport = () => {
   passport.use('github', new GithubStrategy({
    clientID: 'Iv23litK1WUYykljQsuV',
    clientSecret: '73543c9b8ff7261f5ca235cd57154638a5903b5c',
    callbackURL: 'http://localhost:3000/api/sessions/githubcallback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        if (!profile._json.email) {
            return done(null, false, { message: "Tu email en GitHub es privado. Cámbialo a público o usa otro método de registro." });
        }

        let userFound = await userModel.findOne({ email: profile._json.email });

        if (!userFound) {
            let newUser = {
                first_name: profile._json.name ,
                last_name: profile._json.name,
                email: profile._json.email,
                password: '123456' // Puedes mejorar esto generando una clave aleatoria
            };
            let result = await userModel.create(newUser);
            return done(null, result);
        } else {
            return done(null, userFound);
        }

    } catch (error) {
        return done(error);
    }
}));

    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email',
   
    }, async (req, username, password, done) => {
        try {
            const { first_name, last_name } = req.body
            let userFound = await userModel.findOne({ email: username })
            if (userFound) {
                return done(null, false, { message: 'El usuario ya existe' })
            }
            const newUser = {
                first_name,
                last_name,
                email: username,
                password: createHash(password)
            }
            const result = await userModel.create(newUser)
            return done(null, result)

       
          
        } catch (error) {
            return done('Error al registrar el usuario' + error)
        }
    }))
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser(async (id, done) => {
        let user = await userModel.findById(id)
        done(null, user)
    })
    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async (username, password, done) => {
        try {
            const userFound = await userModel.findOne({ email: username })

            if (!userFound) {
                return done(null, false, { message: 'El usuario no existe' })
            }
            if (!isValidPassword(password,{password: userFound.password})) {
                return done(null, false, { message: 'Contraseña incorrecta' })
            }
            console.log(userFound);
             done(null, userFound)
        } catch (error) {
            return done(null, 'Error al loguear el usuario' + error)
        }
    }))
}*/

export default inizializePassport