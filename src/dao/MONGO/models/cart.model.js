import { Schema, model } from 'mongoose';


const cartSchema = new Schema({
   
    products: [
        {
            productId: { type: Schema.Types.ObjectId, ref: 'Product', required: [true, 'El ID del producto es obligatorio'] },
            quantity: { type: Number, required: [true, 'La cantidad es obligatoria'], min: [1, 'La cantidad debe ser al menos 1'] }
        }
    ],
    user: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'El ID del usuario es obligatorio'] }
});



const cartModel = model('Cart', cartSchema);

export default cartModel;
