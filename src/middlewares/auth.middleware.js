import jwt from 'jsonwebtoken'
import { PRIVATE_KEY } from '../utils/authToken.js'

export const authToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
        return res.status(401).send({ status: 'error', error: 'No se proporcionó un token' });
    }

    const token = authHeader.split(' ')[1]; 
    
    if (!token) {
        return res.status(401).send({ status: 'error', error: 'Token no válido' });
    }

    jwt.verify(token, PRIVATE_KEY, (err, userDataDecode) => {
        if (err) {
            return res.status(403).send({ status: 'error', error: 'Token inválido o expirado' });
        }
        req.user = userDataDecode;
        console.log(userDataDecode);
        next();
    });
};
