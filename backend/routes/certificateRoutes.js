const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const certifiacteMethods = require("../controllers/certificateController")
const { isLogin, isAdmin, fileUpload } = require('../middleware')

router.route('/upload').post(isLogin(), isAdmin(), fileUpload(), catchAsync(certifiacteMethods.postCertificates))
router.route('/:certificateId').get(isLogin(), catchAsync(certifiacteMethods.getCertificate))
router.route("/").get(isLogin(), isAdmin(), catchAsync(certifiacteMethods.getAllCertificates))
// router.route('/test').post(fileUpload(), catchAsync(certifiacteMethods.test))

module.exports = router;