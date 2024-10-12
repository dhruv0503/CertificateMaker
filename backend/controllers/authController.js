const User = require('../models/userModel');
const { generateToken } = require('../utils/jwt');
const expressError = require('../utils/expressError');

module.exports.signup = async(req, res, next) => {
    const {name, email, password} = req.body;
    const user = new User({name, email, password});
    const createdUser = await user.save();
    const token = generateToken(createdUser)
    res.status(201).json({ status: 'success', message: 'User Created Successfully', token, userData : createdUser })
}

module.exports.login = async(req, res, next) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user && (await user.comparePassword(password))){
        const token = generateToken(user);
        const userData = await User.findById(user._id).populate('certificates');
        res.status(200).json({ status: 'success', message: 'User Logged In Successfully', token, userData})
    }else{
        return next(new expressError('Invalid Email or Password', 400));
    }
}

module.exports.changePassword = async(req, res, next) => {
    const {oldPassword, newPassword} = req.body;
    const user = await User.findById(req.user.id);
    if(user && (await user.comparePassword(oldPassword))){
        user.password = newPassword;
        await user.save();
        res.status(200).json({ status: 'success', message: 'Password Changed Successfully'})
    }else{
        return next(new expressError('Invalid Old Password', 400));
    }
}

