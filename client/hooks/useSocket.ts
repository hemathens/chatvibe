// client/hooks/useSocket.ts
import { useSocket } from '../contexts/SocketContext';

export const useSocketEvents = (roomId: string, user: string) => {
  const { socket } = useSocket();

  const sendMessage = (message: string) => {
    if (!socket || !message.trim()) return;
    socket.emit('sendMessage', { roomId, user, message });
  };

  const sendTyping = () => {
    if (!socket) return;
    socket.emit('typing', { roomId, user });
  };

  const sendReadReceipt = (msgId: number) => {
    if (!socket) return;
    socket.emit('readReceipt', { roomId, user, msgId });
  };

  return {
    sendMessage,
    sendTyping,
    sendReadReceipt,
  };
};