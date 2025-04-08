// repositories/CartRepository.js

import { productService, ticketService, userService } from "./index.js";


class CartRepository {

  constructor(CartDao) {
    this.cartDao = CartDao;
    this.productRepo = productService;
  }

  // Obtener un carrito por su ID
  getCartById = async (id) => {
    return await this.cartDao.getCartById(id);
  };

  // Agregar un producto al carrito
  addProductToCart = async (cid, pid, quantity) => {
    const product = await this.productRepo.getProduct(pid); // Obtenemos el producto
    if (product.stock < quantity) {
      throw new Error("No hay suficiente stock para este producto");
    }
    await this.cartDao.addProductToCart(cid, pid, quantity);
    await this.productRepo.updateProductStock(pid, quantity); // Restamos stock
    return { success: true, message: "Producto agregado correctamente" };
  };

  // Realizar la compra y actualizar el stock
  purchaseCart = async (cid) => {
    const cart = await this.cartDao.getCartById(cid);
    if (!cart || cart.products.length === 0) {
      throw new Error("El carrito está vacío");
    }
  
    let totalCarrito = 0;
  
    for (const item of cart.products) {
      const product = await this.productRepo.getProduct(item.productId);
  
      if (product.stock < item.quantity) {
        return new Error(`No hay suficiente stock para el producto: ${product.title}  No se agregará a la compra.`);
      }
  
      totalCarrito += product.price * item.quantity;
    }
  
    // Reducir el stock
    for (const item of cart.products) {
      await this.productRepo.updateProductStock(item.productId, item.quantity);
    }
  
    // Limpiar el carrito
  
    // Obtener el usuario que hizo la compra
    const purchaser = await userService.getUserById(cart.user);
    console.log("El usuario es:", purchaser);
    console.log("El total del carrito es:", totalCarrito);
    if (!purchaser) {
      throw new Error("El usuario no existe");
    }
    // Crear el ticket
    const ticket = await ticketService.createTicket({
      amount: totalCarrito,
      purchaser: purchaser.email, // o purchaser._id si lo preferís
    });
    await this.cartDao.clearCart(cid);
    await this.cartDao.removePurchasedProducts(cid, productosAComprar);
    return ticket;
  };
}

export default CartRepository;
