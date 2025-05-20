import express from 'express';
import {
  loginUser,
  registerUser,
  refreshAccessToken,
  logoutUser
} from '../controllers/auth.controller.js';

const router = express.Router();

// Auth routes
router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/refresh-token', refreshAccessToken);  
router.post('/logout', logoutUser);                

export default router;
