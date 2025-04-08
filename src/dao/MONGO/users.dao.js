import userModel from "./models/users.models.js";

class UsersDaoMongo {
    constructor() {
        this.userModel = userModel;
    }

    get = async () => await this.userModel.find({});

    create = async (user) => await this.userModel.create(user);

    getUser = async (email) => await this.userModel.findOne({ email });

    getUserById = async (uid) => await this.userModel.findById(uid);

    update = async (uid, userData) => await this.userModel.findByIdAndUpdate(uid, userData, { new: true });

    delete = async (uid) => await this.userModel.findByIdAndDelete(uid);
}

export default UsersDaoMongo;
