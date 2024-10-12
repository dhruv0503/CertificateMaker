const {S3Client} = require("@aws-sdk/client-s3");

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    },
    region: process.env.AWS_REGION
});

module.exports = s3;