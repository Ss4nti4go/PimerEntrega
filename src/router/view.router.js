import { Router } from "express";

const viewrouter = Router();

viewrouter.get('/', (req, res) => {
     
    res.render('home')
})

viewrouter.get('/login', (req, res) => {
    res.render('login', { title: 'Login' })
})
viewrouter.get('/register', (req, res) => {
    res.render('register', { title: 'Register' })
})
viewrouter.get('/main', (req, res) => {
    res.render('main')
})
export default viewrouter