import express from 'express';
import {
  createNotification,
  getUserNotifications,
  markAsRead,
  deleteNotification,
} from '../controllers/notification.controller.js';
import { verifyFirebaseToken } from '../middleware/auth.middleware.js'; 

const router = express.Router();

router.use(verifyFirebaseToken);

router.post('/', createNotification);

router.get('/', getUserNotifications);

router.put('/:id/read', markAsRead);

router.delete('/:id', deleteNotification);

export default router;
