# 🟣 ChatVibe

**AI-Powered Realtime Chat Application**  
Connect, collaborate, and vibe in real-time with ChatVibe — a modern, AI-integrated messaging platform built for performance, interactivity, and developer delight.

---

## 🚀 Features

-  AI Assistant Integration (e.g., OpenAI GPT)
-  Real-time messaging using WebSockets (Socket.IO)
-  User Authentication with JWT + Refresh tokens
-  Secure sign-in (login/signup/logout flow)
-  Responsive UI with Tailwind CSS
-  Dark & Light mode toggle
-  Profile system with avatars
-  Clean modular folder structure (client/server)
-  Future-ready for voice/video integration

---

## 📁 Folder Structure

```bash
chatvibe/
├── client/                  # Frontend (React + Vite or Next.js)
│   ├── public/              # Static assets
│   ├── src/                 # React source code
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Route-based pages
│   │   ├── hooks/           # Custom React hooks
│   │   ├── utils/           # Utility functions
│   │   ├── assets/          # Icons, images
│   │   └── App.jsx          # Root component
│   └── tailwind.config.js   # TailwindCSS config
│
├── server/                  # Backend (Node.js + Express)
│   ├── controllers/         # API logic
│   ├── routes/              # Express routes
│   ├── models/              # Mongoose models
│   ├── middleware/          # Auth, error handlers
│   ├── config/              # DB & environment configs
│   └── server.js            # Entry point
│
├── .gitignore
├── README.md
├── package.json             # Main package manager
└── LICENSE
```

---

## 🛠️ Tech Stack

| Layer      | Technology                    |
| ---------- | ----------------------------- |
| Frontend   | React / Next.js, Tailwind CSS |
| Backend    | Node.js, Express.js           |
| Auth       | JWT, bcrypt                   |
| Database   | MongoDB + Mongoose            |
| Real-time  | Socket.IO                     |
| AI         | OpenAI (planned/integrated)   |
| Deployment | Vercel / Render / Railway     |
| Dev Tools  | ESLint, Prettier, GitHub      |

---

## 🧪 Getting Started
Clone and run locally:

```
# 1. Clone the repo
git clone https://github.com/hemathens/chatvibe.git
cd chatvibe

# 2. Install dependencies
cd client
npm install
cd ../server
npm install

# 3. Add environment variables
Create `.env` files in `client/` and `server/` with necessary keys (OpenAI API, Mongo URI, JWT secret)

# 4. Run the app
# In two terminals:
cd server && npm run dev       # Backend on http://localhost:5000
cd client && npm run dev       # Frontend on http://localhost:5173 or 3000
```

---

## ⚙️ Environment Variables
In server/.env:
```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_key
```

---

## 📜 License
This project is licensed under the MIT License.
swift
```
MIT License

Copyright (c) 2025 Hem

Permission is hereby granted, free of charge, to any person obtaining a copy...
```
---

## 🙌 Acknowledgements
OpenAI for ChatGPT APIs

Socket.IO for seamless real-time communication

Tailwind CSS for lightning-fast UI building
---
Built with ❤️ by Hem Ajit Patel
