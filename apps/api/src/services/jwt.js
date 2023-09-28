import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY || 'mysecretkey';

export const generateToken = (userId) => {
    const token = jwt.sign({ userId }, secretKey, { expiresIn: '7d' });
    return token;
}

export const verifyToken = (token) => {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
}
