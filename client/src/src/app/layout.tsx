import "../styles/globals.css";

export const metadata = {
  title: "ChatVibe",
  description: "A modern chat app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
