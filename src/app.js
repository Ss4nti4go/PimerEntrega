import express from 'express';
import logger from 'morgan';
import ProductRouter from './router/product.Router.js';
import CartRouter from './router/carts.router.js';
import { connectDB } from './config/mongoose.js';
import cookieParser from 'cookie-parser';


import handlebars from 'express-handlebars';
import viewrouter from './router/view.router.js';
import sessionrouter from './router/api/sessions.router.js';
import path from 'path';
import inizializePassport from './config/passport.config.js';
import  passport  from 'passport';


const app = express();
const SRC = path.join(path.resolve(), 'src');

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(SRC, 'views')); 
app.set('view engine', 'handlebars');
console.log(path.join(SRC, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(cookieParser('*****')); // Clave secreta para cookies (ajústala)
inizializePassport();
app.use(passport.initialize());

connectDB();


// Configuración de sesión
//
//app.use(session({
//    store: MongoStore.create({
//        mongoUrl: 'mongodb+srv://santiagoluccamiraglia8:1234@cluster0.ugrpl.mongodb.//net/products', 
//        mongoOptions: {
//            useNewUrlParser: true,
//            useUnifiedTopology: true
//        },
//        ttl: 60 * 60, // Tiempo de expiración de la sesión en segundos (1 hora)
//    }),
//    secret: 'secretCode', // Clave secreta para firmar la sesión
//    resave: true, // Guarda la sesión en cada petición
//    saveUninitialized: true, // Guarda la sesión aunque no se haya modificado
//}));
//

// Rutas
app.use('/', viewrouter);
app.use('/api/products', ProductRouter);
app.use('/api/carts', CartRouter);

app.use('/api/sessions', sessionrouter);
// Puerto de escucha
app.listen(3000, () => {
    console.log('Corriendo en el puerto 3000');
});
