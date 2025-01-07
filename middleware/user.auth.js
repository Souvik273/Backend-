const jwt = require('jsonwebtoken');

const userAuth = (req, res, next) => {
    if (!req.cookies) {
        return res.status(401).json({ success: false, msg: 'Cookies are missing. Please login first.' });
    }

    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ success: false, msg: 'Please login first. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded && decoded.id) {
            req.user = { id: decoded.id }; // Attach user data
            next();
        } else {
            return res.status(403).json({ success: false, msg: 'Not authorized. Invalid token payload.' });
        }
    } catch (error) {
        console.error('JWT Error:', error.message); // Log the error for debugging
        return res.status(403).json({ success: false, msg: 'Invalid or expired token. Please login again.' });
    }
};

module.exports = userAuth;
