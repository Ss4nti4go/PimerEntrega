import MongoSingleton from "../utils/MongoSIngleton.js"
import program from "../utils/process.js"
import dotenv from "dotenv"

const { mode } = program.opts()
console.log(mode)
dotenv.config({
    path: mode === 'production' ? './.env.production' : './.env.development'
}) 

const configObject = {
    port: process.env.PORT || 8080,
    sessionSecret: process.env.PRIVATE_KEY || 'secretCoder',
    mongoDB: process.env.MONGO_URL || 'mongodb+srv://santiagoluccamiraglia8:1234@cluster0.ugrpl.mongodb.net/products',
    persistence: process.env.PERSISTENCE,
    email: process.env.MAIL_USERNAME,
    password: process.env.MAIL_PASSWORD
}
export const connectDB = () =>{
    return MongoSingleton.getInstance("mongodb+srv://santiagoluccamiraglia8:1234@cluster0.ugrpl.mongodb.net/products");
}
export default configObject