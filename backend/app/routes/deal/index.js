import express        from 'express';
import controller     from './deal.controller';
import authMiddleware from '../middleware/auth.js'

const router = express.Router();
router.use('/deal/register' , authMiddleware);
router.post('/deal/register', controller.register);

module.exports = router;