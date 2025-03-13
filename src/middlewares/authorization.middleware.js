 const authorization = role => {
    return async (req, res, next) => {
        if (!req.user) {
            return res.status(401).send({status: 'error', error: 'unauthorized, not logged'})
        }

        if (req.user.role !== role) {
            return res.status(403).send({status: 'error', error: 'No permissions'})
        }
        next()
    }
}

export default authorization 