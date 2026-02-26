# Messaging App - Frontend

React + Vite frontend for the messaging application.

## Features

- **Authentication** - User login and registration
- **Real-time Chat Interface** - Send and receive messages
- **User Profiles** - Create and customize profiles
- **Friends System** - Add friends and see online status
- **User Search** - Find and message other users
- **Message History** - View previous conversations
- **Responsive Design** - Works on all devices

## Setup

### Prerequisites

- Node.js 16+
- Backend running on http://localhost:5000

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

App runs on `http://localhost:5173`

### Build

Create optimized production build:

```bash
npm run build
```

Output in `dist` folder.

## Project Structure

```
src/
├── pages/            # Page components
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── DashboardPage.jsx
│   ├── ChatPage.jsx
│   ├── ProfilePage.jsx
│   └── FriendsPage.jsx
├── components/       # Reusable components
│   ├── ConversationList.jsx
│   ├── UserList.jsx
│   └── FriendsList.jsx
├── styles/           # CSS files
├── utils/
│   ├── api.js        # API functions
│   └── AuthContext.jsx # Auth state management
├── App.jsx
└── main.jsx
```

## Features Explained

### Authentication

- **Register** - Create account with username, email, password
- **Login** - Sign in with email and password
- **Token Storage** - JWT stored in localStorage
- **Protected Routes** - Routes require authentication

### Messaging

- **Direct Messages** - Send private messages to other users
- **Conversation View** - See message history with each user
- **Delete Messages** - Remove your own messages
- **Unread Count** - See unread message count
- **Message Timestamps** - See when messages were sent

### Friends

- **Add Friends** - Send friend requests to other users
- **Accept Requests** - Approve pending friend requests
- **Friends List** - View all friends
- **Online Status** - See when friends are online
- **Online Friends** - Separate tab for online friends only

### Profiles

- **Edit Profile** - Update username, bio, and avatar
- **View Profile** - See other users' profiles
- **User Search** - Search for users by username or email
- **Online Indicator** - Visual indicator of online status

## API Integration

The frontend connects to the backend at `/api`:

**Auth:**

- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me
- POST /api/auth/logout

**Users:**

- GET /api/users
- GET /api/users/search
- GET /api/users/:id
- PUT /api/users/:id

**Messages:**

- POST /api/messages
- GET /api/messages/conversations
- GET /api/messages/:userId
- DELETE /api/messages/:id

**Friendships:**

- POST /api/friendships
- GET /api/friendships
- GET /api/friendships/pending
- GET /api/friendships/online
- PUT /api/friendships/:id
- DELETE /api/friendships/:id

## Notes

**No Real-time Updates:**
This is a REST API app, so messages don't auto-update. You need to manually refresh conversations to see new messages. This is intentional per project requirements.

## Deployment

1. Build for production:

```bash
npm run build
```

2. Deploy `dist` folder to Vercel, Netlify, or your static host

See [../DEPLOYMENT.md](../DEPLOYMENT.md) for detailed deployment instructions.

## License

MIT
