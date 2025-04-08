import cartModel from "./models/cart.model.js";
import userModel from "./models/users.models.js";

class sessionDaoMongo {
    constructor() {
        this.userModel = userModel;
    }

    // Obtener todos los usuarios
    getUsers = async () => {
        try {
            return await this.userModel.find();
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
            return [];
        }
    };

    // Buscar usuario por email (ahora con mejor manejo de errores)
    getUser = async (email) => {
        try {
            if (!email) throw new Error("Email no proporcionado");
            const user = await this.userModel.findOne({ email });
            return user || null;
        } catch (error) {
            console.error("Error al buscar usuario:", error);
            return null;
        }
    };

    // Crear usuario (ahora con verificación previa)
    createUser = async (user) => {
        try {
            if (!user || !user.email) throw new Error("Datos de usuario inválidos");
            
            // Verificar si ya existe antes de crearlo
            const existingUser = await this.getUser(user.email);
            if (existingUser) {
                console.log(`Usuario con email ${user.email} ya existe`);
                return null; // Retorna null si ya existe
            }
            
            await this.userModel.create(user);
            const UserWithId = await this.getUser(user.email);
            console.log("Usuario creado:", UserWithId);
            return UserWithId;
        } catch (error) {
            console.error("Error al crear usuario:", error);
            return null;
        }
    };
}

export default sessionDaoMongo;
