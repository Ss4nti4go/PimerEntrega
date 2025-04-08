import express from 'express';
import ProductController from '../controllers/products.controller.js';
import authorization from '../middlewares/authorization.middleware.js';
import passportCall from '../middlewares/passportCall.js';

const router = express.Router();

const {
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
} = new ProductController();
// Ruta para obtener todos los productos
router.get('/', getProducts);

// Ruta para obtener un producto por id
router.get('/:pid', getProduct);

// Ruta para crear un nuevo producto
router.post('/',passportCall('jwt'),authorization('admin') ,createProduct);

// Ruta para actualizar un producto existente
router.put('/:pid',passportCall('jwt'),authorization('admin'),updateProduct);

// Ruta para eliminar un producto
router.delete('/:pid',passportCall('jwt'), authorization('admin'),deleteProduct);

export default router;
