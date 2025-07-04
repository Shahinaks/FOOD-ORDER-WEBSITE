import React, { useEffect, useState } from 'react';
import { Container, Card, Spinner, Alert, Badge } from 'react-bootstrap';
import axios from '../api/axiosInstance';
import { getAuth } from 'firebase/auth';
const API = import.meta.env.VITE_API_URL;


const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      const token = await user.getIdToken();

      const { data } = await axios.get('/notifications', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (Array.isArray(data)) {
        setNotifications(data);
      } else {
        console.warn('Unexpected notification data:', data);
        setNotifications([]);
      }
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <Container className="py-4">
      <h3 className="mb-4 text-center">🔔 Notifications</h3>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : Array.isArray(notifications) && notifications.length > 0 ? (
        notifications.map((note) => (
          <Card
            key={note._id}
            className="mb-3 shadow-sm"
            border={note.read ? 'light' : 'primary'}
          >
            <Card.Body>
              <Card.Title className="d-flex justify-content-between">
                {note.title}
                {!note.read && <Badge bg="primary">New</Badge>}
              </Card.Title>
              <Card.Text>{note.message}</Card.Text>
              <small className="text-muted">
                {new Date(note.createdAt).toLocaleString()}
              </small>
            </Card.Body>
          </Card>
        ))
      ) : (
        <Alert variant="info" className="text-center">
          No notifications yet.
        </Alert>
      )}
    </Container>
  );
};

export default NotificationPage;
