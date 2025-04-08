import { Router } from 'express';
import CartController from '../controllers/cart.controller.js';

const router = Router();
const {
    getCart,
    addProduct,
    purchaseCart,
    clearCart
} = new CartController();

// Obtener un carrito
router.get('/:cid', getCart);

// Agregar un producto al carrito
router.post('/:cid/product/:pid', addProduct);

// Realizar la compra del carrito
router.post('/:cid/purchase', purchaseCart);

// Vaciar el carrito
router.delete('/:cid', clearCart);

export default router;