import { Router } from 'express';

const router = Router()

router.get('/', (req, res) => {
    res.send('get carts')
})
router.post('/' , (req, res) => {
    res.send('post cart')
})
router.put('/' , (req, res) => {
    res.send('put cart')
})
router.delete('/' , (req, res) => {
    res.send('delete cart')
})

export default router