import { verifyToken } from '../services/jwt.js';

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).send({
            message: 'Unauthorized'
        });
    }

    try {
        const decoded = verifyToken(token);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).send({
            message: 'Unauthorized'
        });
    }
}

export default authenticate;