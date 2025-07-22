# In D:\Hem\chatvibe, create a file named setup.ps1 containing:

# create root files
New-Item -Path . -Name "README.md"         -ItemType File -Force
New-Item -Path . -Name ".gitignore"        -ItemType File -Force
Copy-Item -Path ".env.example" -Destination ".env" -ErrorAction SilentlyContinue

# client structure
$clientDirs = @(
  "client/public/assets",
  "client/styles",
  "client/components/Chat",
  "client/components/Call",
  "client/components/UI",
  "client/components/Games",
  "client/contexts",
  "client/hooks",
  "client/pages/chat",
  "client/utils"
)
$clientFiles = @(
  "client/README.md",
  "client/package.json",
  "client/tsconfig.json",
  "client/next.config.js",
  "client/styles/globals.css",
  "client/styles/tailwind.config.js",
  "client/components/Chat/ChatWindow.tsx",
  "client/components/Chat/MessageBubble.tsx",
  "client/components/Chat/TypingIndicator.tsx",
  "client/components/Chat/ReactionPicker.tsx",
  "client/components/Call/VideoCall.tsx",
  "client/components/Call/ScreenShare.tsx",
  "client/components/UI/Button.tsx",
  "client/components/UI/Modal.tsx",
  "client/components/UI/ThemeToggle.tsx",
  "client/components/UI/AvatarPicker.tsx",
  "client/components/Games/Trivia.tsx",
  "client/components/Games/FlashPoll.tsx",
  "client/contexts/AuthContext.tsx",
  "client/contexts/SocketContext.tsx",
  "client/contexts/ThemeContext.tsx",
  "client/hooks/useAuth.ts",
  "client/hooks/useSocket.ts",
  "client/hooks/useVanish.ts",
  "client/pages/_app.tsx",
  "client/pages/index.tsx",
  "client/pages/settings.tsx",
  "client/pages/chat/[roomId].tsx",
  "client/utils/api.ts",
  "client/utils/webrtc.ts",
  "client/utils/constants.ts"
)

# server structure
$serverDirs = @(
  "server/src/config",
  "server/src/controllers",
  "server/src/middleware",
  "server/src/routes",
  "server/src/services",
  "server/src/utils"
)
$serverFiles = @(
  "server/README.md",
  "server/package.json",
  "server/tsconfig.json",
  "server/.env",
  "server/src/index.ts",
  "server/src/config/db.ts",
  "server/src/controllers/authController.ts",
  "server/src/controllers/roomController.ts",
  "server/src/middleware/authMiddleware.ts",
  "server/src/routes/auth.ts",
  "server/src/routes/rooms.ts",
  "server/src/services/socket.ts",
  "server/src/services/callService.ts",
  "server/src/utils/logger.ts"
)

# Create directories and files
$clientDirs + $serverDirs | ForEach-Object { New-Item -ItemType Directory -Path $_ -Force | Out-Null }
$clientFiles + $serverFiles | ForEach-Object { New-Item -ItemType File -Path $_ -Force | Out-Null }

Write-Host "PowerShell scaffold complete! Your ChatVibe folder structure is ready."
