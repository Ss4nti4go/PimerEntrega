class UserDto {
    constructor({ email, first_name, last_name, password, cart, id }) {
        this.id = id
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.full_name = `${first_name} ${last_name}`;
        this.password = password;
        this.cart = cart
    }
}

export default UserDto