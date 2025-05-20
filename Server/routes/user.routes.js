import express from 'express';
const router = express.Router();

import { verifyToken, isAdmin } from '../middleware/auth.middleware.js';

import {
  getProfile,
  updateProfile,
  getAllUsers,
  deleteUser,
  checkUser, 
} from '../controllers/user.controller.js';

router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, updateProfile);
router.get('/check', verifyToken, checkUser); // 👈 NEW route

router.get('/users', verifyToken, isAdmin, getAllUsers);
router.delete('/users/:id', verifyToken, isAdmin, deleteUser);

export default router;
