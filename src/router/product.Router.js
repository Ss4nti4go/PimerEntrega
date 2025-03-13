import { Router } from 'express';
import  productModel  from '../models/product.models.js';

const router = Router()

router.get('/', async (req, res) => {

    const products = await productModel.find();
    res.send(products)
})
router.post('/' , async (req, res) => {
    const { body } = req;
    const result = await productModel.create(body);
    res.send(result)
})
router.put('/' , (req, res) => {
    res.send('put product')
})
router.delete('/' , (req, res) => {
    res.send('delete product')
})

export default router