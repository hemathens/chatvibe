// client/pages/index.tsx
import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [username, setUsername] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">ChatVibe</h1>
          <p className="mt-2 text-gray-600">Login to start chatting</p>
        </div>

        <form className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your username"
              required
            />
          </div>

          <Link href={`/chat/general?user=${encodeURIComponent(username)}`}>
            <button
              type="submit"
              disabled={!username.trim()}
              className={`w-full py-2 px-4 rounded-md text-white font-semibold transition ${
                username.trim()
                  ? 'bg-indigo-600 hover:bg-indigo-700'
                  : 'bg-indigo-300 cursor-not-allowed'
              }`}
            >
              Sign In
            </button>
          </Link>
        </form>

        <div className="text-center text-sm text-gray-500">
          ChatVibe is in development. Your data is not stored.
        </div>
      </div>
    </div>
  );
}