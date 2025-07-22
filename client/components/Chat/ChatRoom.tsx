// client/components/Chat/ChatRoom.tsx
import { useEffect, useState, useRef } from 'react';
import ChatWindow from './ChatWindow';
import TypingIndicator from './TypingIndicator';

// Add this inside useEffect or at the top of your main page
if (typeof window !== 'undefined' && !(window as any).socket) {
  (window as any).socket = {
    emit: (event: string, data: any) => {
      console.log('Socket emit:', event, data);
      // Simulate receiving message
      setTimeout(() => {
        const mockEvent = { user: data.user, message: data.message, msgId: data.msgId };
        (window as any).socket.onMessage(mockEvent);
      }, 200);
    },
    on: (event: string, callback: (data: any) => void) => {
      (window as any).socket.onMessage = callback;
    },
    off: () => {},
  };
}

interface Message {
  id: number;
  sender: string;
  text: string;
  timestamp: Date;
  read: boolean;
  reactions?: Record<string, string[]>;
}

interface Props {
  roomId: string;
  user: string;
}

export default function ChatRoom({ roomId, user }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'bot',
      text: 'Welcome to ChatVibe! Say hello.',
      timestamp: new Date(),
      read: true,
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Real-time typing indicator
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  // Simulate socket.io connection
  const socket = (window as any).socket;

  // Send message via Socket.IO
  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const msgId = messages.length + 1;
    const message: Message = {
      id: msgId,
      sender: user,
      text: newMessage,
      timestamp: new Date(),
      read: false,
      reactions: {},
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage('');

    // Emit message via socket
    if (socket) {
      socket.emit('sendMessage', {
        roomId,
        user,
        message: newMessage,
        msgId,
      });
    }

    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }

    // Trigger typing event
    if (!isTyping && newMessage.length === 1) {
      setTypingUser(user);
      setIsTyping(true);

      if (socket) {
        socket.emit('typing', { roomId, user });
      }
    }
  };

  // Listen for incoming messages
  useEffect(() => {
    if (!socket) return;

    const handleMessage = (data: { user: string; message: string; msgId: number }) => {
      const msg: Message = {
        id: data.msgId,
        sender: data.user,
        text: data.message,
        timestamp: new Date(),
        read: false,
        reactions: {},
      };
      setMessages((prev) => [...prev, msg]);
    };

    socket.on('receiveMessage', handleMessage);

    return () => {
      socket.off('receiveMessage', handleMessage);
    };
  }, [socket]);

  // Listen for typing events
  useEffect(() => {
    if (!socket) return;

    const handleTyping = (data: { user: string; roomId: string }) => {
      if (data.roomId === roomId && data.user !== user) {
        setTypingUser(data.user);
        const timer = setTimeout(() => setTypingUser(null), 2000);
        return () => clearTimeout(timer);
      }
    };

    socket.on('typing', handleTyping);

    return () => {
      socket.off('typing', handleTyping);
    };
  }, [socket, roomId, user]);

  // Read receipts
  const lastReadMessageIdRef = useRef<number>(0);

  useEffect(() => {
    const container = document.querySelector('.chat-window');
    const handleScroll = () => {
      if (container?.scrollTop === 0 && messages.length > 0) {
        const firstMessage = messages[0];
        if (firstMessage.id > lastReadMessageIdRef.current) {
          lastReadMessageIdRef.current = firstMessage.id;

          if (socket) {
            socket.emit('readReceipt', {
              roomId,
              messageId: firstMessage.id,
              user,
            });
          }
        }
      }
    };

    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">{roomId}</h2>
        <span className="text-sm text-green-500">You're online</span>
      </header>

      {/* Messages */}
      <ChatWindow messages={messages} currentUser={user} />

      {/* Typing Indicator */}
      <TypingIndicator typingUser={typingUser} currentUser={user} />

      {/* Input */}
      <div className="bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              if (e.target.value.length === 1) {
                setTypingUser(user);
                setIsTyping(true);
              }
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className={`p-2 rounded-full transition ${
              newMessage.trim()
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}