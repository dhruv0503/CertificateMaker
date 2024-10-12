const User = require('../models/userModel');
const Certificate = require("../models/certificateModel")
const {PDFDocument, rgb} = require("pdf-lib")
const fs = require("fs");

const s3 = require('../aws-config')
const { GetObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { PutObjectCommand } = require('@aws-sdk/client-s3');

const expressError = require('../utils/expressError')


function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

module.exports.signUpMultipleUsers = async (data) => {
    const password = generateRandomString(10);
    try {
        data.forEach(async (ele) => {
            ele.password = password;
            const user = new User({ name: ele.Name, email: ele.Email, password });
            const createdUser = await user.save();
        });
    } catch (err) {
        return new expressError(err.message, 500);
    }
    return data;
}

module.exports.getDownloadUrl = async (key) => {
    const getFile = {
        Bucket: process.env.BUCKET_NAME,
        Key: key
    }
    const command = new GetObjectCommand(getFile);
    const fileUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
    return fileUrl;
}

//send file.buffer from the function call
const uploadToAWS = async (file, key) => {
    const uploadParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: key,
        Body: file
    }
    const data = await s3.send(new PutObjectCommand(uploadParams));
    return data;
}

const excelDateToJSDate = (serial) => {
    const excelEpoch = new Date(1899, 11, 30);
    const date = new Date(excelEpoch.getTime() + (serial * 24 * 60 * 60 * 1000));
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

module.exports.uploadCertificates = async (data) => {
    let returnArray = [];

    //Traversing and creating new certificate
    for(const ele of data){
        const existingPdfBytes = fs.readFileSync(process.env.CERTI_PATH);
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const page = pdfDoc.getPages()[0];
        page.drawText(ele.Name, {
            x: 325,
            y: 325,
            size: 32,
            color: rgb(0, 0, 0)
        });

        page.drawText(ele.Department, {
            x: 450,
            y: 285,
            size: 14,
            color: rgb(0, 0, 0)
        });

        page.drawText(excelDateToJSDate( ele.Start_Date), {
            x: 315,
            y: 245,
            size: 14,
            color: rgb(0, 0, 0)
        });

        page.drawText(excelDateToJSDate(ele.End_Date), {
            x: 535,
            y: 245,
            size: 14,
            color: rgb(0, 0, 0)
        });

        const newPdfBytes = await pdfDoc.save();  
        
        //Creating AWS Key and Certificate Upload to DB
        const user = await User.findOne({email : ele.Email});
        const userId = user._id;
        const uploadKey = `${userId}-${ele.Name}-${ele.Department}.pdf`

        await uploadToAWS(newPdfBytes, uploadKey)

        const newCertificateRef = new Certificate({
            user : userId,
            pdf : {
                key : uploadKey
            },
            department : ele.Department
        })
        const newCertificate = await newCertificateRef.save();

        //Adding Certificate to User
        user.certificates.push(newCertificate._id);
        await user.save();

        returnArray.push(newCertificate);
    }
    return returnArray;
};