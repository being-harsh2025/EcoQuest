# EcoQuest - Gamified Environmental Learning Platform

A comprehensive web application that gamifies environmental education through interactive quizzes, real-world challenges, and a competitive leaderboard system.

## 🌟 Features

- **Interactive Quizzes**: AI-generated environmental questions with instant feedback
- **Real-World Challenges**: Complete eco-friendly tasks and earn points
- **Leaderboard System**: Compete with other users globally
- **Badge System**: Earn Silver, Gold, and Platinum badges based on points
- **Certificate Generation**: Get certified when you reach 500 points
- **User Profiles**: Customizable profiles with avatar support
- **Daily Login Rewards**: Earn bonus points for consistent engagement
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- Supabase account (for database)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ecoquest
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   npm run setup
   ```
   This will create a `.env` file from `.env.example`. Update it with your actual values:
   ```env
   SUPABASE_URL=your-supabase-project-url
   SUPABASE_ANON_KEY=your-supabase-anon-key
   JWT_SECRET=your-super-secret-jwt-key
   ```

4. **Set up the database**
   - Create a new Supabase project
   - Run the SQL commands from `database/schema.sql` in your Supabase SQL editor

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Visit your application**
   Open http://localhost:3000 in your browser

## 🏗️ Architecture

### Backend (Node.js + Express)
- **Authentication**: JWT-based authentication with bcrypt password hashing
- **Database**: PostgreSQL via Supabase with Row Level Security
- **API**: RESTful API with comprehensive endpoints
- **Security**: Helmet, CORS, rate limiting, and input validation
- **File Upload**: Multer with Sharp for image processing

### Frontend (Vanilla JavaScript)
- **Responsive Design**: Mobile-first CSS with modern styling
- **Local Storage**: Offline-first approach with server synchronization
- **API Integration**: Comprehensive API client for backend communication
- **Real-time Updates**: Dynamic UI updates and progress tracking

### Database Schema
- **Users**: Profile information, points, badges
- **Quiz System**: Questions, attempts, scoring
- **Challenges**: Tasks, completions, proof submissions
- **Leaderboard**: Materialized view for performance
- **Analytics**: Point transactions, user statistics

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `POST /api/user/award-points` - Award points to user

### Quiz System
- `GET /api/quiz/questions` - Get quiz questions
- `POST /api/quiz/submit` - Submit quiz answers

### Challenges
- `GET /api/challenges` - Get available challenges
- `POST /api/challenges/:id/complete` - Complete a challenge

### Leaderboard & Stats
- `GET /api/leaderboard` - Get global leaderboard
- `GET /api/stats/user` - Get user statistics

### Certificate
- `GET /api/certificate/check` - Check certificate eligibility

## 🔧 Development

### Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests
- `npm run setup` - Set up development environment

### Project Structure
```
ecoquest/
├── server.js              # Main server file
├── app.js                 # Frontend core logic
├── test.js                # API integration layer
├── database/
│   └── schema.sql         # Database schema
├── uploads/               # File uploads directory
├── logs/                  # Application logs
├── *.html                 # Frontend pages
├── styles.css             # Styling
└── assets/                # Images and static files
```

## 🛡️ Security Features

- **Password Security**: bcrypt hashing with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: Prevents API abuse
- **Input Validation**: Joi schema validation
- **CORS Protection**: Configured for specific origins
- **Helmet Security**: Security headers and protection
- **Row Level Security**: Database-level access control

## 🌱 Environmental Impact

EcoQuest promotes environmental awareness through:
- **Education**: Interactive learning about sustainability
- **Action**: Real-world challenges that make a difference
- **Community**: Connecting like-minded individuals
- **Gamification**: Making environmental action fun and rewarding

## 📈 Performance Optimizations

- **Materialized Views**: Fast leaderboard queries
- **Database Indexing**: Optimized query performance
- **Image Optimization**: Sharp for image processing
- **Compression**: Gzip compression for responses
- **Caching**: Strategic caching for static assets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues:
1. Check the logs in the `logs/` directory
2. Verify your environment variables in `.env`
3. Ensure your Supabase database is properly configured
4. Check the browser console for frontend errors

## 🔮 Future Enhancements

- [ ] Mobile app development
- [ ] Advanced analytics dashboard
- [ ] Social features and team challenges
- [ ] Integration with IoT environmental sensors
- [ ] Machine learning for personalized recommendations
- [ ] Multi-language support
- [ ] Offline mode capabilities

---

Made with 💚 for a sustainable future
