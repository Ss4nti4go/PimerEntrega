import cartModel from './models/cart.model.js';

class CartDao {
    constructor() {
        this.cartModel = cartModel
    }
  async createCart() {
    return await cartModel.create({ products: [] });
  }

  async getCartById(id) {
    return await cartModel.findById(id);
  }

  async addProductToCart(cid, pid, quantity = 1) {
    const cart = await cartModel.findById(cid);
    if (!cart) throw new Error('Carrito no encontrado');
  
    const index = cart.products.findIndex(p => p.productId.toString() === pid);
  
    if (index !== -1) {
      cart.products[index].quantity += parseInt(quantity);
    } else {
      cart.products.push({ productId: pid, quantity: parseInt(quantity) });
    }
  
    return await cart.save();
  }

  async updateProductQuantity(cid, pid, quantity) {
    const cart = await cartModel.findById(cid);
    if (!cart) throw new Error('Carrito no encontrado');

    const item = cart.products.find(p => p.productId.toString() === pid);
    if (item) item.quantity = parseInt(quantity);

    return await cart.save();
  }


  async removeProductFromCart(cid, pid) {
    const cart = await cartModel.findById(cid);
    if (!cart) return new Error('Carrito no encontrado');
    
    cart.products = cart.products.filter(p => p.product.toString() !== pid);
    return await cart.save();
  }
  async getProducts(cid) {
    const cart = await cartModel.findById(cid);
    if (!cart) throw new Error('Carrito no encontrado');
    return cart.products;
  }

  async clearCart(cid) {
    const cart = await cartModel.findById(cid);
    if (!cart) return new Error('Carrito no encontrado');

    cart.products = [];
    return await cart.save();
  }
}

export default CartDao;
