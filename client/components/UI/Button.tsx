// client/components/UI/Button.tsx
interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export default function Button({ children, onClick, variant = 'primary' }: Props) {
  const base =
    'px-4 py-2 rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2';

  const styles = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
    secondary:
      'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 focus:ring-indigo-500',
  };

  return (
    <button className={`${base} ${styles[variant]}`} onClick={onClick}>
      {children}
    </button>
  );
}