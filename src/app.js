import express from 'express';
import logger from 'morgan';
import ProductRouter from './router/product.Router.js';
import CartRouter from './router/carts.router.js';
import { connectDB } from './config/process.config.js';
import cookieParser from 'cookie-parser';
import handlebars from 'express-handlebars';
import viewrouter from './router/view.router.js';
import sessionrouter from './router/api/sessions.router.js';
import path from 'path';
import inizializePassport from './config/passport.config.js';
import  passport  from 'passport';

import { router as usersRouter } from './router/api/users.router.js';
import configObject from './config/process.config.js';
import { TicketRouter } from './router/api/tickets.router.js';



const app = express();
const SRC = path.join(path.resolve(), 'src');

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(SRC, 'views')); 
app.set('view engine', 'handlebars');
console.log(path.join(SRC, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(cookieParser(
    configObject.sessionSecret
)); 
inizializePassport();
app.use(passport.initialize());

connectDB()
connectDB()

// Rutas
app.use('/', viewrouter);
app.use('/api/products', ProductRouter);
app.use('/api/cart', CartRouter);
app.use('/api/users', usersRouter);
app.use('/api/ticket', TicketRouter);
app.use('/api/sessions', sessionrouter);
// Puerto de escucha
app.listen(configObject.port,() => {
    console.log('Corriendo en el puerto ' + configObject.port);
});
