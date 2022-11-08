import express from 'express';
import { register, login } from '../controllers/usersController.js';
import isAuth from '../middlewares/isAuth.js';

const router = express('route');

router.post('/login', login);
router.post('/register', register);

export default router;
