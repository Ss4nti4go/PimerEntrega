import { Router } from "express";

const router = Router();

router.get('/mail', (req, res) => {
    res.send('mail')
});
router.post('/mail', (req, res) => {
    try {
        res.send('mail')
    } catch (error) {
        res.sendServerError(error)
    }
});

export default router