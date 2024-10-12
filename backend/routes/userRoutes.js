const express = require("express");
const router = express.Router();
const userMethods = require("../controllers/userController");
const {isLogin,  isAdmin, fileUpload} = require("../middleware")
const catchAsync = require("../utils/catchAsync");

router.route("/addUsers").post(isLogin(), isAdmin(), fileUpload(), catchAsync(userMethods.addUser))
router.route("/profile").post(isLogin(), catchAsync(userMethods.profile))
router.route('/:userId')
    .get(isLogin(), isAdmin(), catchAsync(userMethods.getUser))
    .patch(isLogin(), isAdmin(), catchAsync(userMethods.createAdmin));
router.route("/").get(isLogin(), isAdmin(), catchAsync(userMethods.getAllUsers));

module.exports = router;