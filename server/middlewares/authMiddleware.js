const jwt = require('jsonwebtoken');

// Middleware per verificare il token JWT
exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ error: 'Token non fornito' });
    }

    jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token non valido' });
        }
        req.user = decoded;
        next();
    });
};
