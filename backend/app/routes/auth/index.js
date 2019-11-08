import express        from 'express';
import controller     from './auth.controller';
import authMiddleware from '../middleware/auth.js'

const router = express.Router();

router.post('/register', controller.register);
router.post('/login', controller.login);

router.use('/check', authMiddleware);
router.get('/check', controller.check);

module.exports = router;