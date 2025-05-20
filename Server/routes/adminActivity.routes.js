import express from 'express';
import { getAllActivities } from '../controllers/adminActivity.controller.js';
import { verifyToken, isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', verifyToken, isAdmin, getAllActivities);

export default router;
