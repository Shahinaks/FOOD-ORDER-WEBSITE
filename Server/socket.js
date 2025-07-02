let io;


  export const initSocket = async (server) => {
  const { Server } = await import('socket.io');

  io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173',
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('joinOrderRoom', (orderId) => {
      socket.join(orderId);
    });

    socket.on('leaveOrderRoom', (orderId) => {
      socket.leave(orderId);
    });
  });

  return io;
};

export const emitOrderStatusUpdate = (orderId, newStatus) => {
  if (io) {
    io.to(orderId).emit('orderStatusUpdated', { orderId, newStatus });
  }
};
