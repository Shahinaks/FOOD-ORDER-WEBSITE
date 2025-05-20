import AdminActivity from '../models/AdminActivity.model.js';

export const logActivity = async (adminId, action, description) => {
  try {
    const log = new AdminActivity({ admin: adminId, action, description });
    await log.save();
  } catch (err) {
    console.error('Error logging admin activity:', err.message);
  }
};

export const getAllActivities = async (req, res) => {
  try {
    const logs = await AdminActivity.find().populate('admin', 'name email').sort({ timestamp: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch admin activities' });
  }
};
