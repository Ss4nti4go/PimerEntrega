import express from 'express';
import ProductDaoMongo from '../dao/MONGO/product.dao.js';
import productModel from '../dao/MONGO/models/product.models.js';
const productDaoInstance = new ProductDaoMongo();
const viewrouter = express.Router();
import ErrorManager from '../dao/ErrorManager.js';
import configObject from '../config/process.config.js';
// Ruta para renderizar todos los productos

import jwt from 'jsonwebtoken'
import { cartService, productService } from '../service/index.js';

viewrouter.get('/', async (req, res) => {
  try {
    // Obtén los parámetros de paginación de la query (page y limit)
    const { page = 1, limit = 5 } = req.query;
    const token = req.cookies.coderCookieToken
 
    let user = null;
 
  if (token) {
    try {
      // Decodificar el token
      user = jwt.verify(token, configObject.sessionSecret);
      
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      res.status(401).send('Token inválido');
    }
  }
    // Realiza la consulta paginada
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      lean: true, // Retorna objetos JS simples en lugar de documentos de Mongoose
    };

    const products = await productModel.paginate({}, options);
  
    // Renderiza la vista y pasa los datos de productos y paginación
    res.status(200).render('home', {
      user: user,
      products: products.docs, // Los productos de la página actual
      totalPages: products.totalPages, // Total de páginas
      currentPage: products.page, // Página actual
      hasPrevPage: products.hasPrevPage, // Si hay una página anterior
      hasNextPage: products.hasNextPage, // Si hay una página siguiente
      prevPage: products.prevPage, // Página anterior
      nextPage: products.nextPage // Página siguiente
  
    });
  } catch (error) {
    res.status(500).send(`<h1>Error al obtener los productos: ${error.message}</h1>`);
    throw new ErrorManager(error.message, 500);
  }
});
// Ruta para renderizar un producto por id
viewrouter.get('/product/:pid', async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await productDaoInstance.getBy(pid);
    const token = req.cookies.coderCookieToken
 
    let user = null;
 
  if (token) {
    try {
      // Decodificar el token
      user = jwt.verify(token, configObject.sessionSecret);
  
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      res.status(401).send('Token inválido');
    }
  } 
    const plainProduct = product.toObject();

    console.log(plainProduct);
    res.status(200).render('product', { 
      product: plainProduct,
      user: user,
      cart: user.cart
    });
 
  } catch (error) {

    res.status(500).send(`<h1>Error al obtener el producto: ${error.message}</h1>`);
    throw new ErrorManager(error.message, 500);
  }
});

viewrouter.get('/cart', async (req, res) => {
  const token = req.cookies.coderCookieToken;
  let user = null;

  if (token) {
    try {
      user = jwt.verify(token, configObject.sessionSecret);
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return res.status(401).send('Token inválido');
    }
    try {
      const cart = await cartService.getCartById(user.cart);
      const productsInCart = cart.products;
      let absTotal=0;
      // Traemos los detalles de cada producto (usando Promise.all para esperar todos)
      const products = await Promise.all(
        productsInCart.map(async (item) => {
         
          console.log(item);
          const productData = await productService.getProduct(item.productId);
          const total = item.quantity * productData.price;
          absTotal += total;
        
          return {
            ...productData.toObject(),
            quantity: item.quantity,
            total: total
          };
        })
      );
   
      res.status(200).render('cart', {
        cart,
        products,
        absTotal,
        user: user,
        cart_id: cart._id.toString()
      });
    } catch (error) {
      console.error("Error al cargar el carrito:", error);
      res.status(500).send("Error al cargar el carrito: " + error.message);
    }
  } else {
    res.status(401).send("No autenticado");
  }
});
viewrouter.get('/login', (req, res) => {
    
    res.render('login', { title: 'Login' })
})
viewrouter.get('/register', (req, res) => {
    res.render('register', { title: 'Register' })
})

export default viewrouter