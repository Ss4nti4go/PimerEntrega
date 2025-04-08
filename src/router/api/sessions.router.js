import { Router } from "express";

import passportCall from "../../middlewares/passportCall.js";
import authorization from "../../middlewares/authorization.middleware.js";

import SessionsController from "../../controllers/sessions.controller.js";


const {
    register,
    login,
    current,
    logout
}= new SessionsController()
const sessionrouter = Router();


sessionrouter.get('/current', passportCall('jwt'), authorization('admin'),current)
sessionrouter.get('/logout', logout)

sessionrouter.post('/login', login)
sessionrouter.post('/register', register)
export default sessionrouter