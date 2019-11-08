import express        from 'express';
import controller     from './common.controller';
import upload         from '../../../common/util/aws/multer-s3'

const router = express.Router();

router.post('/temp/img', upload.single("imgFile"), controller.tempImgSave);

module.exports = router;