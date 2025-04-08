import configObject from "../config/process.config.js";



const { persistence } = configObject
let UserDao;
let ProductDao;
let CartDao;
switch (persistence) {
  
    case "MEMORY":
        const usersDaoMemory = import("./MEMORY/product.dao.js");
        UserDao= usersDaoMemory;
        break;
    default: 
        const UsersDaoMongo =import ("./MONGO/users.dao.js");
        const ProductDaoMongo =import ("./MONGO/product.dao.js");
        const CartDaoMongo =import ("./MONGO/cart.dao.js");
        CartDao = CartDaoMongo;
        UserDao = UsersDaoMongo;
        ProductDao = ProductDaoMongo;
        break;
}

export { UserDao, ProductDao, CartDao }; 