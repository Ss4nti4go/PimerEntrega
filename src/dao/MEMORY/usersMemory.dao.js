

class usersDaoMemory {
    constructor() {
        this.users=[
            {id:1, email:"admin", password:"admin123", role:"ADMIN"},
            {id:2, email:"user", password:"user123", role:"USER"}
        ];
    }
    get = () => this.users
    create = async newUser => this.users.push(newUser)
    getBy = async email => this.users.find(user => user.email === email)
    update = async (uid, user) => this.users.find(user => user.uid === uid)
    delete = async (uid) => this.users.find(user => user.uid === uid)
}

export default usersDaoMemory