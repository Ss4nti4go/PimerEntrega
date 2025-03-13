import bcrypt from 'bcrypt';

export const createHash = password =>  bcrypt.hashSync(password, bcrypt.genSaltSync(10));// crea el codigo de 10 digitos
export const isValidPassword = (password, user) => bcrypt.compareSync(password, user);
