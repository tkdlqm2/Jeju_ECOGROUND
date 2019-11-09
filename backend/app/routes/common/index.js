import express      from 'express';
import controller   from './common.controller';
import upload       from '../../../common/util/aws/multer-s3';

const router = express.Router();
router.post('/temp/img', upload("temp").array('image', 3), controller.tempImgSave);

module.exports = router;