import { useEffect, useState } from 'react';

interface Props {
  typingUser: string | null;
  currentUser: string;
}

export default function TypingIndicator({ typingUser, currentUser }: Props) {
  if (!typingUser || typingUser === currentUser) return null;

  return (
    <div className="px-4 py-1 text-sm text-gray-500 italic">
      {typingUser} is typing...
    </div>
  );
}