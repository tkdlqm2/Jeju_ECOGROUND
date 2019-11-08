const AWS      = require("aws-sdk");
const multer   = require("multer");
const multerS3 = require('multer-s3');
const path     = require("path");

AWS.config.update({
    accessKeyId: process.env.AWS_IAM_ACCESS_KEY,
    secretAccessKey: process.env.AWS_IAM_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const s3 = new AWS.S3();
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET_NAME,
        key: function (req, file, cb) {
            let extension = path.extname(file.originalname);
            cb(null, Date.now().toString() + extension)
        },
        acl: 'public-read-write',
    })
});

export default upload;