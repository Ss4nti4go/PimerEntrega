import mongoose from "mongoose";

export const connectDB = async () => {
    const URL = "mongodb+srv://santiagoluccamiraglia8:1234@cluster0.ugrpl.mongodb.net/products";
    console.log("Conectado");
    return await mongoose.connect(URL);
}