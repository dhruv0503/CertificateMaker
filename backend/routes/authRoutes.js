const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const authMethods = require("../controllers/authController")
const {isLogin} = require("../middleware")

router.route("/signup").post(catchAsync(authMethods.signup));
router.route("/login").post(catchAsync(authMethods.login));
router.route('/changePassword').post(isLogin(), catchAsync(authMethods.changePassword))

module.exports = router;