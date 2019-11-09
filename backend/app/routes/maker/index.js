import express        from 'express';
import controller     from './maker.controller';
import authMiddleware from '../middleware/auth.js'

const router = express.Router();

router.use('/register', authMiddleware);
router.post('/register', controller.register);

router.get('/view/:id'  , controller.getMaker);
router.get('/list/:page', controller.getMakerList);

module.exports = router;