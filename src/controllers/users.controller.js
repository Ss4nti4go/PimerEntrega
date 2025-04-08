import { userService } from "../service/index.js";

class UserController {
    constructor() {
        this.service= userService
    }
    createUser = async(req, res) => {
        const { body} = req
        const result = await this.userService(body);
        res.send({status: 'success', payload: result})
    }
    getUsers = async (req, res) => {
        const users = await this.service.get();
        res.send({status: 'success', payload: users})
    }
    getUser = async (req, res) => {
        const { email } = req.params;
        const user = await this.service.getById(email);
        res.send({status: 'success', payload: user})
    }
    deleteUser = async (req, res) => {
        const { id } = req.params;
        const user = await this.service.delete(id);
        res.send({status: 'success', payload: user})
    }
    updateUser = async (req, res) => {
        const { id } = req.params;
        const user = await this.service.update(id, req.body);
        res.send({status: 'success', payload: user})
    }
}

export default UserController