// controllers/CartController.js

import  ErrorManager  from '../dao/ErrorManager.js'; // Manejo de errores personalizados
import { cartService } from '../service/index.js';

class CartController {
    constructor() {
        this.cartService = cartService;
    }
  // Obtener un carrito por su ID
  getCart = async (req, res) => {
    try {
      const cart = await cartService.getCartById(req.params.cid);
      if (!cart) {
        return res.status(404).json({ success: false, message: 'Carrito no encontrado' });
      }
      res.json({ success: true, cart });
    } catch (error) {
      console.error('Error al obtener el carrito:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  };

  // Agregar un producto al carrito
  addProduct = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
  
    try {
      const response = await cartService.addProductToCart(cid, pid, quantity || 1);
      res.json(response);
    } catch (error) {
      console.error('Error al agregar el producto:', error);
      res.status(400).json({ success: false, error: error.message });
    }
  };

  // Realizar la compra y actualizar el stock
  purchaseCart = async (req, res) => {
    const { cid } = req.params;
    try {
      const response = await cartService.purchaseCart(cid);
      console.log(response);
      res.status(200).json(response);
    
    } catch (error) {
      console.error('Error al realizar la compra:', error);
      res.status(400).json({ success: false, error: error.message });
    }
  };

  // Vaciar el carrito
  clearCart = async (req, res) => {
    const { cid } = req.params;
    try {
      const cart = await cartService.clearCart(cid);
      res.json({ success: true, cart });
    } catch (error) {
      console.error('Error al vaciar el carrito:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  };
}

export default CartController;
