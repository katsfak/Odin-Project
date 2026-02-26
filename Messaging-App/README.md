# Messaging App - Full Stack Project

A complete messaging application with user authentication, direct messaging, and friends system.

## 📋 Features

### Core Features ✅

- **User Authentication** - Register, login, logout with JWT
- **Direct Messaging** - Send messages to other users
- **User Profiles** - Customize your profile with bio and avatar
- **Friends System** - Add friends and see online status
- **User Search** - Find users to message or friend

### Extra Credit Features ✅

- **Online Status** - See when friends are online
- **Friends List** - View all friends and pending requests
- **Image Messages** (support in backend)
- **Group Chats** (data model & API endpoints prepared)
- **Message History** - View all past conversations

## 🗂️ Project Structure

```
Messaging-App/
├── backend/                  # Node.js/Express API
│   ├── src/
│   │   ├── controllers/      # Business logic
│   │   ├── routes/           # API endpoints
│   │   ├── middleware/       # Auth & validation
│   │   ├── utils/            # Helpers
│   │   ├── db/               # Database seed
│   │   └── server.js         # Main server
│   ├── prisma/
│   │   └── schema.prisma     # Database schema
│   ├── package.json
│   └── README.md
│
├── frontend/                 # React + Vite SPA
│   ├── src/
│   │   ├── pages/            # Page components
│   │   ├── components/       # Reusable components
│   │   ├── styles/           # CSS files
│   │   ├── utils/            # API & auth
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── README.md
│
├── SETUP.md                  # Setup instructions
├── DEPLOYMENT.md             # Deployment guide
└── README.md                 # This file
```

## 🚀 Quick Start

### 1. Database Setup

```bash
createdb messaging_app
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database URL
npm run migrate
npm run seed   # Optional: loads sample users
npm run dev
```

Backend runs on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

### 4. Test Login

```
Username: alice
Email: alice@example.com
Password: password123
```

## 📱 Features in Detail

### Authentication System

- JWT tokens for secure sessions
- Password hashing with bcryptjs
- Protected routes on frontend
- Token persistence in localStorage
- Auto-logout on invalid token

### Messaging

- Send text messages between users
- Message history with timestamps
- Delete your own messages
- Mark messages as read
- Display last message in conversation preview
- Unread message count

### Friends System

- Add friends (send requests)
- Accept/Reject friend requests
- Remove friends
- View friends list
- Filter by online status
- See online friends separately

### User Profiles

- Username and email
- Bio (short description)
- Avatar (image URL)
- Member since date
- Edit own profile
- View other profiles

### Search & Discovery

- Search users by username or email
- Find users to message
- Find users to friend
- Live search results

## 🔧 Tech Stack

### Backend

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **PostgreSQL** - Database
- **Prisma** - ORM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests

### Frontend

- **React 18** - UI framework
- **Vite** - Build tool
- **React Router** - Navigation
- **Context API** - State management
- **CSS3** - Styling

## 📊 Database Schema

### User

- id, username, email, passwordHash
- avatar, bio, isOnline, lastSeen
- timestamps

### Message

- id, content, imageUrl
- senderId, recipientId (FK to User)
- isRead, createdAt

### Friendship

- id, user1Id, user2Id (FK to User)
- status (pending/accepted/blocked)
- timestamps

### GroupChat & GroupMessage

- For future group chat implementation

## 🔐 Security Features

- Passwords hashed with 10-round bcrypt
- JWT tokens with 7-day expiration
- Protected API endpoints require auth
- User can only edit own profile
- User can only delete own messages
- CORS restricted to frontend URL
- Input validation on all endpoints

## 🎯 API Endpoints

See [backend/README.md](./backend/README.md) for complete API documentation.

### Key Endpoints

```
POST   /api/auth/register        - Create account
POST   /api/auth/login            - Sign in
POST   /api/messages              - Send message
GET    /api/messages/:userId      - Get conversation
POST   /api/friendships           - Add friend
GET    /api/friendships           - Get friends list
```

All endpoints except register/login require `Authorization: Bearer TOKEN` header.

## 📝 How to Use

### First Time

1. Go to login page
2. Click "Register" to create account
3. Fill in username, email, password
4. Click register
5. You'll be logged in automatically

### Sending Messages

1. Click "Users" tab
2. Search for a user
3. Click on them to open chat
4. Type message and click Send
5. **Note:** Messages don't auto-refresh - refresh page to see new messages from others

### Adding Friends

1. Go to Users tab
2. Click on a user
3. Click "Add Friend"
4. Go to Friends tab → Requests
5. Accept or reject request

### Customizing Profile

1. Click settings (⚙️) button in top right
2. Click "Edit Profile"
3. Update username, bio, avatar URL
4. Click "Save Changes"

## 🎨 UI Features

- **Responsive Design** - Works on mobile, tablet, desktop
- **Clean Layout** - Intuitive navigation
- **Loading States** - Shows feedback during API calls
- **Error Messages** - Clear error handling
- **Online Indicators** - Green dot for online users
- **Unread Badges** - Shows unread message count
- **Smooth Animations** - Subtle transitions

## 🚢 Deployment

### Frontend (Vercel/Netlify)

```bash
npm run build
# Deploy dist/ folder
```

### Backend (Railway/Heroku/Render)

```
Set environment variables:
- DATABASE_URL
- JWT_SECRET
- NODE_ENV=production
- PORT=5000
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 📌 Important Notes

**No Real-time Updates:**
This project uses REST API, so messages don't auto-refresh. Users must manually refresh conversations to see new messages. This is intentional per project requirements.

**For Production:**

- Change JWT_SECRET to a strong random string
- Use environment variables for all secrets
- Set up HTTPS for all connections
- Enable CORS only for your frontend domain
- Use database backups
- Set up monitoring and logging

## 🎓 Learning Points

This project demonstrates:

- Full-stack development with React & Node.js
- Database design with Prisma
- Authentication with JWT
- REST API design
- State management with Context API
- Component-based architecture
- Form handling and validation
- Error handling
- Protected routes
- CORS configuration

## 🐛 Troubleshooting

### Can't connect to database

- Verify PostgreSQL is running
- Check DATABASE_URL is correct
- Run migrations: `npm run migrate`

### CORS errors

- Verify FRONTEND_URL in backend .env
- Check frontend URL matches exactly

### Tokens not working

- Clear localStorage and re-login
- Check JWT_SECRET is set
- Verify token is sent in Authorization header

### Messages not appearing

- Refresh the page (no real-time sync)
- Check conversation list is updated
- Verify message was sent successfully

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [Express Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [JWT Handbook](https://auth0.com/resources/ebooks/jwt-handbook)

## 🤝 Contributing

This is a learning project. Feel free to extend it with:

- Real-time updates (Socket.io)
- Image/file uploads
- Typing indicators
- Message reactions
- Voice/video calls
- Dark mode
- Notifications
- Group chat refinement

## 📄 License

MIT

---

**Created for The Odin Project** 💙
