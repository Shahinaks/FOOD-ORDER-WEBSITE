import express from 'express';
import {
  createNotification,
  deleteNotification,
  getAllNotifications,
} from '../controllers/notification.controller.js';

import { verifyFirebaseToken, isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

// 📋 GET all notifications (accessible to all authenticated users)
router.get('/', verifyFirebaseToken, getAllNotifications);

// 🔔 POST create a new notification (admin only)
router.post('/', verifyFirebaseToken, isAdmin, createNotification);

// 🗑 DELETE a notification (admin only)
router.delete('/:id', verifyFirebaseToken, isAdmin, deleteNotification);

export default router;
