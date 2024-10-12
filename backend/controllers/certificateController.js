const Certifiacte = require('../models/certificateModel')
const expressError = require("../utils/expressError")
const xlsx = require('xlsx');
const { uploadCertificates } = require("../utils/utilityFunctions")

module.exports.getAllCertificates = async (req, res, next) => {
    try {
        const certificates = await Certifiacte.find()
        res.status(200).json(certificates)
    } catch (error) {
        return next(new expressError(error.message, 500))
    }
}

// module.exports.getPendingCertificates = async (req, res, next) => {
//     try {
//         const certificates = await Certifiacte.find({ status: "pending" })
//         res.status(200).json(certificates)
//     } catch (error) {
//         return next(new expressError(error.message, 500))
//     }
// }

module.exports.postCertificates = async (req, res, next) => {
    if (!req.file) {
        return next(new expressError(400, 'Please upload a valid file'))
    }
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(worksheet);
    const uploadedCertificates = await uploadCertificates(data);
    res.status(200).json(uploadedCertificates)
}

module.exports.getCertificate = async(req, res, next) => {
    const {certificateId} = req.params; 
    const certificate = await Certificate.findById(certificateId);
    if(!certificateId){
        return next(new expressError('Certificate not found', 404));
    }
    const downloadUrl = getDownloadUrl(certificate.pdf.key);
    certificate.pdf.downloadUrl = downloadUrl;
    await certificate.save();
    res.status(200).json({message: 'Certificate found', downloadUrl});
}


// module.exports.test = async (req, res, next) => {
//     const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
//     const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//     const data = xlsx.utils.sheet_to_json(worksheet);
//     data.forEach(async (ele) => {
//         console.log(ele);
//         console.log(excelDateToJSDate(ele.Start_Date));
//         console.log(excelDateToJSDate(ele.End_Date));
//     })
//     res.send("Done")
// }