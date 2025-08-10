import express from 'express';
import { Register,Login } from '../Controllers/user.js';

const router = express.Router();

// User Registration
// @ dec:-user registration
// @api method :-post
// @api url :-/api/user/register
router.post("/register", Register);

// User Routes
// @ dec:-user login
// @api method :-post
// @api url :-/api/user/login
router.post("/login", Login);

export default router;