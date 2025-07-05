import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { socket } from '../src/socket.js';

const useNotificationListener = () => {
  useEffect(() => {
    socket.on('notification', (note) => {
      toast.info(`${note.title}: ${note.message}`);
    });

    return () => {
      socket.off('notification');
    };
  }, []);
};

export default useNotificationListener;
