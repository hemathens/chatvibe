// client/components/Chat/ReactionPicker.tsx
interface Props {
  onReact: (emoji: string) => void;
}

export default function ReactionPicker({ onReact }: Props) {
  const reactions = ['❤️', '👍', '😂', '😮', '😢', '🎉'];

  return (
    <div className="flex gap-2">
      {reactions.map((emoji, index) => (
        <button
          key={index}
          onClick={() => onReact(emoji)}
          className="text-xl hover:bg-gray-200 p-1 rounded-full transition"
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}