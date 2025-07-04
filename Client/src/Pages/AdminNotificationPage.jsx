import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API = import.meta.env.VITE_API_URL;

const AdminNotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const { firebaseToken } = useAuth();

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`${API}/notifications`, {
        headers: { Authorization: `Bearer ${firebaseToken}` },
      });

      if (Array.isArray(res.data)) {
        setNotifications(res.data);
      } else {
        console.warn('Expected an array but got:', res.data);
        setNotifications([]);
      }
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
      setNotifications([]);
    }
  };

  const handleCreate = async () => {
    try {
      await axios.post(`${API}/notifications`, { title, message }, {
        headers: { Authorization: `Bearer ${firebaseToken}` },
      });
      setTitle('');
      setMessage('');
      fetchNotifications();
    } catch (err) {
      console.error('Failed to create notification:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/notifications/${id}`, {
        headers: { Authorization: `Bearer ${firebaseToken}` },
      });
      fetchNotifications();
    } catch (err) {
      console.error('Failed to delete notification:', err);
    }
  };

  useEffect(() => {
    if (firebaseToken) {
      fetchNotifications();
    }
  }, [firebaseToken]);

  return (
    <div className="container py-4">
      <h2 className="mb-3">🛠 Admin Notifications</h2>

      <div className="mb-4">
        <input
          type="text"
          className="form-control mb-2"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          className="form-control mb-2"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Message"
        />
        <button className="btn btn-primary" onClick={handleCreate}>
          ➕ Create Notification
        </button>
      </div>

      <ul className="list-group">
        {Array.isArray(notifications) && notifications.length > 0 ? (
          notifications.map((n) => (
            <li key={n._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{n.title}</strong><br />
                <small>{n.message}</small>
              </div>
              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(n._id)}>
                ❌ Delete
              </button>
            </li>
          ))
        ) : (
          <li className="list-group-item text-muted">No notifications found.</li>
        )}
      </ul>
    </div>
  );
};

export default AdminNotificationPage;
