import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import ReactionPicker from './ReactionPicker';

interface Message {
  id: number;
  sender: string;
  text: string;
  timestamp: Date;
  read: boolean;
  reactions?: Record<string, string[]>; // e.g., { "❤️": ["user1", "user2"] }
}

interface Props {
  message: Message;
  currentUser: string;
}

export default function MessageBubble({ message, currentUser }: Props) {
  const [reactions, setReactions] = useState<Record<string, string[]>>(message.reactions || {});

  const handleReact = (emoji: string) => {
    const updatedReactions = { ...reactions };
    if (!updatedReactions[emoji]) {
      updatedReactions[emoji] = [currentUser];
    } else if (!updatedReactions[emoji].includes(currentUser)) {
      updatedReactions[emoji] = [...updatedReactions[emoji], currentUser];
    }

    setReactions(updatedReactions);

    // Emit reaction to server
    const socket = (window as any).socket;
    if (socket) {
      socket.emit('messageReaction', {
        roomId: 'general',
        messageId: message.id,
        emoji,
        user: currentUser,
      });
    }
  };

  return (
    <div className={`flex ${message.sender === currentUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
          message.sender === currentUser ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800 shadow'
        }`}
      >
        <div className="font-medium text-sm mb-1">{message.sender}</div>
        <div>{message.text}</div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs opacity-70">
            {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
            {message.read && <span className="ml-2">✅</span>}
          </span>
          <ReactionPicker onReact={handleReact} />
        </div>

        {/* Show Reactions */}
        <div className="mt-1 flex gap-1">
          {Object.entries(reactions).map(([emoji, users]) => (
            <div key={emoji} className="flex items-center gap-1 text-sm">
              <span>{emoji}</span>
              <span>({users.length})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}