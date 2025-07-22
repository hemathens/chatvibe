// client/components/Chat/ChatWindow.tsx
import MessageBubble from './MessageBubble';

interface Message {
  id: number;
  sender: string;
  text: string;
  timestamp: Date;
  read: boolean;
}

interface Props {
  messages: Message[];
  currentUser: string;
}

export default function ChatWindow({ messages, currentUser }: Props) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} currentUser={currentUser} />
      ))}
    </div>
  );
}