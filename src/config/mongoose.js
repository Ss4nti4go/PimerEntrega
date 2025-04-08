import { mongoose ,Types }from "mongoose";
import configObject from "./process.config.js";

export const connectDB = async () => {
    const URL = configObject.mongoDB;
    console.log("Conectado");
    return await mongoose.connect(URL);
}
export const isValidId = (id) => {
    return Types.ObjectId.isValid(id);
} 