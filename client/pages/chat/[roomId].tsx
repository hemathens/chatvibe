// client/pages/chat/[roomId].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ChatRoom from '../../components/Chat/ChatRoom';

export default function ChatPage() {
  const router = useRouter();
  const rawUser = router.query.user;
  const user = typeof rawUser === 'string' ? rawUser : 'Guest';
  const { roomId } = router.query as { roomId: string };

  // Simulated socket setup
  useEffect(() => {
    const socket = (window as any).socket || {
      emit: () => {},
      on: () => {},
      off: () => {},
    };
    (window as any).socket = socket;
  }, []);

  return <ChatRoom roomId={roomId} user={user} />;
}