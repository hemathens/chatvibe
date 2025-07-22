import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

// Initialize Socket.IO server
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET', 'POST']
  }
});

// In-memory store for rooms and participants
const rooms: Map<string, Set<string>> = new Map();

// Handle socket connections
io.on('connection', (socket: Socket) => {
  console.log(`🟢 Socket connected: ${socket.id}`);

  // User joins a room
  socket.on('join-room', ({ roomId, userId }: { roomId: string; userId: string }) => {
    socket.join(roomId);
    if (!rooms.has(roomId)) {
      rooms.set(roomId, new Set());
    }
    rooms.get(roomId)!.add(userId);
    socket.to(roomId).emit('user-joined', { userId });
    console.log(`User ${userId} joined room ${roomId}`);
  });

  // Handle incoming chat messages
  socket.on('send-message', ({ roomId, userId, text }: { roomId: string; userId: string; text: string }) => {
    const message = {
      userId,
      text,
      timestamp: Date.now()
    };
    io.to(roomId).emit('new-message', message);
    console.log(`Message from ${userId} in ${roomId}: ${text}`);
  });

  // Typing indicator
  socket.on('typing', ({ roomId, userId, isTyping }: { roomId: string; userId: string; isTyping: boolean }) => {
    socket.to(roomId).emit('user-typing', { userId, isTyping });
  });

  // Handle disconnection
  socket.on('disconnecting', () => {
    socket.rooms.forEach((roomId) => {
      if (rooms.has(roomId)) {
        rooms.get(roomId)!.delete(socket.id);
        socket.to(roomId).emit('user-left', { userId: socket.id });
      }
    });
    console.log(`🔴 Socket disconnecting: ${socket.id}`);
  });

  socket.on('disconnect', () => {
    console.log(`❌ Socket disconnected: ${socket.id}`);
  });
});

// Define a simple health-check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: Date.now() });
});

// Start the server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
