import UserDto from "../Dtos/users.dto.js";


class UserRrepository {
    constructor(dao) {
        this.dao = dao;
    }
    
   createUser= async(newUser) => {
    const user = new UserDto(newUser);
    return await this.dao.create(user)
}
getUsers= async() => {
    return await this.dao.get()
}
getById= async(email) => {
   
    return await this.dao.getUser(email)
}
getUserById= async(id) => {
   
    return await this.dao.getUserById(id)
}
delete= async(uid) => {
    return await this.dao.delete(uid)
}
update= async(uid, user) => {
    return await this.dao.update(uid, user)
}
}

export default UserRrepository