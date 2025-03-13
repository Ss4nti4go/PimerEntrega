import jwt from 'jsonwebtoken'

export const PRIVATE_KEY = 'secretCoder';

export const generateToken = userData => {
    const token = jwt.sign(userData, PRIVATE_KEY, {expiresIn: '1d'});
    return token;
}

export const validateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if(!authHeader) return res.status(401).send('token not found')
    const token = authHeader.split(' ')[1]
    jwt.verify(token, PRIVATE_KEY, (err, userDecode) => {
        if(err) return res.status(403).send({status: 'error', error: 'invalid token'})
        req.user = userDecode
        next()
    })
}