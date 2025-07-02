import Notification from '../models/Notification.model.js';

export const createNotification = async (req, res) => {
  try {
    const { recipient, title, message, type } = req.body;

    if (!recipient || !title || !message) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const notification = await Notification.create({
      user: recipient,
      title,
      message,
      type,
    });

    res.status(201).json(notification);
  } catch (err) {
    console.error('❌ Failed to create notification:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    console.error('❌ Failed to fetch notifications:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    notification.read = true;
    await notification.save();
    res.json({ message: 'Marked as read', notification });
  } catch (err) {
    console.error('❌ Failed to mark as read:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const deleted = await Notification.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.json({ message: 'Notification deleted' });
  } catch (err) {
    console.error('❌ Failed to delete notification:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
