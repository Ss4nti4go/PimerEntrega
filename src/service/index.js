import UserDao from "../dao/MONGO/users.dao.js";
import ProductDao from "../dao/MONGO/product.dao.js";
import ProductRepository from "./product.repository.js";
import UserRrepository from "./user.repository.js";
import ticketsRepository from "./tickets.repository.js";
import TicketDAO from "../dao/MONGO/tickets.dao.js";
import CartRepository from "./cart.repository.js";
import CartDao  from "../dao/MONGO/cart.dao.js";

export const userService = new UserRrepository(new UserDao());
export const productService = new ProductRepository(new ProductDao());
export const ticketService = new ticketsRepository(new TicketDAO());
export const cartService = new CartRepository(new CartDao());

