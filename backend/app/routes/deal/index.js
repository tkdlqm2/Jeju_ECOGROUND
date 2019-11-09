import express        from 'express';
import controller     from './deal.controller';
import authMiddleware from '../middleware/auth.js'

const router = express.Router();

router.use('/register' , authMiddleware);
router.post('/register', controller.register);

router.use('/view' , authMiddleware);
router.get('/view', controller.getDealList);

module.exports = router;