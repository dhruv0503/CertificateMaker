const User = require('../models/userModel')
const xlsx = require('xlsx');
const expressError = require('../utils/expressError')
const { signUpMultipleUsers, getDownloadUrl } = require("../utils/utilityFunctions");
const { model } = require('mongoose');

//admin Routes

//Adds login credentials for users. Upload an excel sheet with fields : Name and Email to register users, make sure the emails are unique.
module.exports.addUser = async (req, res, next) => {
    if (!req.file) {
        return next(new expressError('Please upload a valid file', 400))
    }
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(worksheet);
    const updatedData = await signUpMultipleUsers(data);
    res.status(200).json({ message: 'Users added successfully', data: updatedData });
};

module.exports.getAllUsers = async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({ message: 'Users found', users });
}

module.exports.getUser = async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
        return next(new expressError('User not found', 404));
    }
    res.status(200).json({ message: 'User found', user });
}

module.exports.profile = async(req, res, next) =>{
    const userId = req.user.id;
    const user = await User.findById(userId).populate("certificates");
    res.status(200).json({message: 'User found', user});
}

module.exports.createAdmin = async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findByIdAndUpdate(userId, { role: 'Admin' }, { new: true })
    res.status(200).json({ message: 'Admin created', user });
}