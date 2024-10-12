const jwt = require('jsonwebtoken')
const expressError = require('./utils/expressError')
const multer = require('multer');


const bufferUpload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5MB
});

module.exports.isLogin = () => {
    return (req, res, next) => {
        const token = req.header('Authorization')?.split(' ')[1];
        if (!token) return res.status(401).json({ status: 'fail', message: 'You are not logged in' });
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (err) {
            return next(new expressError("Invalid Token", 401))
        }
    }
}

module.exports.isAdmin = () => {
    return (req, res, next) => {
        if(req.user.role == "Admin") next();
        else return next(new expressError("You are not authorized to perform this action", 403))
    }
}

module.exports.fileUpload = () => bufferUpload.single('file');