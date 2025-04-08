import { Router } from "express";
import UserController from "../../controllers/users.controller.js";


export const router = Router();
const {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
}= new UserController()


router.post('/', createUser)
router.get('/', getUsers)

router.get('/:uid',getUser)
router.delete('/:uid', deleteUser)
router.put('/:uid',updateUser)
   