import { Schema, model } from "mongoose";

const usersCollection='users'
const userSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    cart: { type: Schema.Types.ObjectId, ref: "carts" },
    role: { type: String, required: true , enum: ['user', 'admin'], default: 'user' }

})
const userModel = model(usersCollection, userSchema); 
export default userModel;