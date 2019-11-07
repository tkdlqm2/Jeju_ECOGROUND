require('dotenv').config();
const AWS = require('aws-sdk');
AWS.config.update({ 
    accessKeyId: process.env.AWS_IAM_ACCESS_KEY, 
    secretAccessKey: process.env.AWS_IAM_SECRET_ACCESS_KEY, 
    region: process.env.AWS_REGION
});

/**
 * AWS S3 module - singleton
 * @author Dong-Min Seol
 * @since  2019-11-01
 */
module.exports = class S3 {
    constructor() {
        this.s3Obj      = new AWS.S3({apiVersion: process.env.AWS_S3_API_VERSION});
        this.bucketName = process.env.AWS_S3_BUCKET_NAME;
    }

    upload(URL, fileReadStream) {
        const param = { 
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key   : URL,
            Body  : fileReadStream
        }

        this.s3Obj.upload(param, (err, data) => {
            if(err)
                console.log("[AWS S3 ERROR]", err);

            if(data) 
                console.log("[AWS S3 SUCCESS]", data);
        })
    }

    copy() {

    }

    move() {
        
    }

    delete() {

    }
}
