# Habit Tracker - Gamified XP System

A gamified habit tracker built with MERN that rewards daily consistency through XP and level progression.

Transform your daily habits into an engaging RPG-style experience. Build streaks, earn XP, and level up as you complete your goals.

## Tech Stack

- **Frontend:** React, TailwindCSS, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Build Tool:** Vite

## Features

✨ **User Authentication**
- Secure registration and login with JWT tokens
- Protected routes and endpoints
- Session persistence

🎮 **Habit Management**
- Create, read, update, and delete habits
- Track daily habit completion
- Streak counting system

⭐ **Gamification System**
- Earn XP for completing habits
- Level progression based on accumulated XP
- Visual progress tracking
- Motivational rewards for consistency

📊 **Dashboard**
- Real-time habit overview
- XP and level display
- Streak visualization
- Habit history

🎨 **Responsive UI**
- Clean, intuitive interface with TailwindCSS
- Mobile-friendly design
- Smooth user experience

## Project Structure

```
habit-tracker/
├── client/                          # React Frontend
│   ├── src/
│   │   ├── api/                     # API calls & axios config
│   │   │   ├── authApi.js
│   │   │   └── habitApi.js
│   │   ├── assets/                  # Images and static files
│   │   ├── pages/                   # Page components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── App.jsx                  # Main app component
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── server/                          # Express Backend
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                # MongoDB connection
│   │   ├── controllers/             # Business logic
│   │   │   ├── auth.controller.js
│   │   │   ├── habit.controller.js
│   │   │   └── user.controller.js
│   │   ├── middleware/              # Custom middleware
│   │   │   ├── auth.middleware.js   # JWT verification
│   │   │   ├── error.middleware.js
│   │   │   └── asyncHandler.js
│   │   ├── models/                  # MongoDB schemas
│   │   │   ├── User.js
│   │   │   └── Habit.js
│   │   ├── routes/                  # API endpoints
│   │   │   ├── auth.routes.js
│   │   │   ├── habit.routes.js
│   │   │   └── user.routes.js
│   │   ├── services/                # Utility services
│   │   ├── utils/                   # Helper functions
│   │   ├── .env                     # Environment variables
│   │   └── server.js                # Entry point
│   └── package.json
│
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v22 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/habit-tracker.git
cd habit-tracker
```

2. **Backend Setup**
```bash
cd server
npm install

# Create .env file in server directory
cat > .env << EOF
MONGO_URI=mongodb://localhost:27017/habit-tracker
# Or use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/habit-tracker
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=development
EOF

npm run dev
```

3. **Frontend Setup** (in a new terminal)
```bash
cd client
npm install
npm run dev
```

4. **Access the application**
- Frontend: `http://localhost:5173` (Vite default)
- Backend API: `http://localhost:5000`

## How It Works

### User Journey
1. **Register** → Create an account with email and password
2. **Login** → Secure JWT authentication
3. **Create Habits** → Define daily habits to track
4. **Complete Habits** → Mark habits as done each day
5. **Earn XP** → Gain experience points for consistency
6. **Level Up** → Unlock new levels as XP accumulates
7. **Build Streaks** → Maintain daily consistency for rewards

### XP & Leveling System
- Each completed habit grants XP
- XP accumulates toward level milestones
- Streak bonuses increase with consistency
- Levels unlock as you progress

## API Endpoints

### Authentication
```
POST   /api/auth/register     - Register new user
POST   /api/auth/login        - Login user
GET    /api/auth/verify       - Verify JWT token
```

### Habits
```
GET    /api/habits            - Get all user habits
POST   /api/habits            - Create new habit
PUT    /api/habits/:id        - Update habit
DELETE /api/habits/:id        - Delete habit
POST   /api/habits/:id/complete - Mark habit as complete
```

### User
```
GET    /api/users/profile     - Get user profile & XP data
PUT    /api/users/profile     - Update user profile
```

## Project Status

🚀 **Currently Under Active Development**

This is a learning project following a structured 15-day build plan. The foundation is solid with core features implemented and working.

### ✅ Completed
- User authentication (Register/Login with JWT)
- Habit CRUD operations
- XP tracking and reward system
- Level progression mechanics
- Responsive UI with TailwindCSS
- API routes and middleware

### 🔨 In Progress / Next Steps
- Enhanced dashboard visualizations
- Leaderboards and global rankings
- Achievement badges and reward tiers
- Advanced habit analytics and insights
- Reminder notifications
- Mobile optimization improvements

## Development

### Running Tests
```bash
cd server
npm test
```

### Building for Production
```bash
# Frontend
cd client
npm run build

# Backend
cd server
npm run build
```

## Key Learning Outcomes

This project demonstrates:
- Full-stack MERN development
- JWT authentication and authorization
- MongoDB schema design and relationships
- RESTful API architecture and best practices
- React component composition and state management
- Error handling and middleware implementation
- Gamification mechanics and user engagement
- Responsive design with TailwindCSS

## Contributing

Found a bug or have suggestions? Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Contact

Have questions or want to connect? Reach out on GitHub!

---

**Made with ❤️ to track habits and build better habits.**
