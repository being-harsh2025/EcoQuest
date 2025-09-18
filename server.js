const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname)));

// Initialize Supabase client (with fallback for development)
let supabase = null;
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (supabaseUrl && supabaseKey && supabaseUrl !== 'your-supabase-url') {
  try {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('✅ Supabase client initialized successfully');
  } catch (error) {
    console.warn('⚠️  Supabase initialization failed:', error.message);
    console.log('📝 Server will run in demo mode without database');
  }
} else {
  console.log('📝 Running in demo mode - please configure Supabase in .env file');
}

// JWT middleware for authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// User Authentication Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name, school } = req.body;

    // Validation
    if (!email || !password || !name || !school) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Demo mode fallback
    if (!supabase) {
      return res.status(201).json({
        message: 'Demo mode: User registration simulated',
        user: {
          id: 'demo-' + Date.now(),
          email: email.toLowerCase(),
          name,
          school,
          points: 0,
          badges: []
        },
        token: 'demo-token'
      });
    }

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email.toLowerCase())
      .single();

    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user in database
    const { data: user, error } = await supabase
      .from('users')
      .insert([{
        email: email.toLowerCase(),
        password_hash: hashedPassword,
        name,
        school,
        points: 0,
        badges: [],
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString()
      }])
      .select('id, email, name, school, points, badges, created_at')
      .single();

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ error: 'Failed to create user' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        school: user.school,
        points: user.points,
        badges: user.badges
      },
      token
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Demo mode fallback
    if (!supabase) {
      return res.json({
        message: 'Demo mode: Login simulated',
        user: {
          id: 'demo-user',
          email: email.toLowerCase(),
          name: 'Demo User',
          school: 'Demo School',
          points: 150,
          badges: ['Silver'],
          avatar_url: null
        },
        token: 'demo-token'
      });
    }

    // Find user
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email.toLowerCase())
      .single();

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last login
    await supabase
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', user.id);

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        school: user.school,
        points: user.points,
        badges: user.badges,
        avatar_url: user.avatar_url
      },
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// User Profile Routes
app.get('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, name, school, points, badges, avatar_url, created_at, last_login')
      .eq('id', req.user.userId)
      .single();

    if (error || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const { name, school, avatar_url } = req.body;
    
    const updates = {};
    if (name) updates.name = name;
    if (school) updates.school = school;
    if (avatar_url) updates.avatar_url = avatar_url;

    const { data: user, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', req.user.userId)
      .select('id, email, name, school, points, badges, avatar_url')
      .single();

    if (error) {
      return res.status(500).json({ error: 'Failed to update profile' });
    }

    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Points and Badges System
app.post('/api/user/award-points', authenticateToken, async (req, res) => {
  try {
    const { points, reason } = req.body;

    if (!points || points <= 0) {
      return res.status(400).json({ error: 'Invalid points value' });
    }

    // Get current user data
    const { data: user, error: fetchError } = await supabase
      .from('users')
      .select('points, badges')
      .eq('id', req.user.userId)
      .single();

    if (fetchError || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newPoints = user.points + points;
    let newBadges = [...(user.badges || [])];

    // Award badges based on points
    if (newPoints >= 100 && !newBadges.includes('Silver')) {
      newBadges.push('Silver');
    }
    if (newPoints >= 250 && !newBadges.includes('Gold')) {
      newBadges.push('Gold');
    }
    if (newPoints >= 400 && !newBadges.includes('Platinum')) {
      newBadges.push('Platinum');
    }

    // Update user points and badges
    const { data: updatedUser, error: updateError } = await supabase
      .from('users')
      .update({ 
        points: newPoints, 
        badges: newBadges 
      })
      .eq('id', req.user.userId)
      .select('points, badges')
      .single();

    if (updateError) {
      return res.status(500).json({ error: 'Failed to award points' });
    }

    // Log the points transaction
    await supabase
      .from('point_transactions')
      .insert([{
        user_id: req.user.userId,
        points,
        reason: reason || 'Points awarded',
        created_at: new Date().toISOString()
      }]);

    res.json({
      message: 'Points awarded successfully',
      points: updatedUser.points,
      badges: updatedUser.badges,
      pointsAwarded: points
    });

  } catch (error) {
    console.error('Award points error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Quiz questions
app.get('/api/quiz/questions', async (req, res) => {
  try {
    // Demo mode fallback
    if (!supabase) {
      const demoQuestions = [
        {
          id: 1,
          question: "What percentage of the Earth's water is freshwater?",
          options: ["3%", "10%", "25%", "50%"],
          correct_answer: 0,
          difficulty: "easy",
          category: "water",
          points: 10
        },
        {
          id: 2,
          question: "Which renewable energy source is most widely used globally?",
          options: ["Solar", "Wind", "Hydroelectric", "Geothermal"],
          correct_answer: 2,
          difficulty: "medium",
          category: "energy",
          points: 15
        },
        {
          id: 3,
          question: "How long does it take for a plastic bottle to decompose?",
          options: ["10 years", "50 years", "100 years", "450 years"],
          correct_answer: 3,
          difficulty: "hard",
          category: "waste",
          points: 20
        }
      ];
      return res.json({ questions: demoQuestions });
    }

    const { data: questions, error } = await supabase
      .from('quiz_questions')
      .select('*')
      .eq('active', true);

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch questions' });
    }

    res.json({ questions });
  } catch (error) {
    console.error('Quiz questions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/quiz/submit', authenticateToken, async (req, res) => {
  try {
    const { answers, score, totalQuestions } = req.body;

    // Save quiz attempt
    const { data: quizAttempt, error } = await supabase
      .from('quiz_attempts')
      .insert([{
        user_id: req.user.userId,
        answers,
        score,
        total_questions: totalQuestions,
        completed_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: 'Failed to save quiz attempt' });
    }

    // Award points for correct answers
    if (score > 0) {
      await fetch(`${req.protocol}://${req.get('host')}/api/user/award-points`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': req.headers.authorization
        },
        body: JSON.stringify({
          points: score,
          reason: `Quiz completion - ${score}/${totalQuestions} correct`
        })
      });
    }

    res.json({
      message: 'Quiz submitted successfully',
      quizId: quizAttempt.id,
      score,
      pointsEarned: score
    });

  } catch (error) {
    console.error('Quiz submit error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Leaderboard
app.get('/api/leaderboard', async (req, res) => {
  try {
    // Demo mode fallback
    if (!supabase) {
      const demoLeaderboard = [
        { id: 'demo-1', name: 'Eco Champion', school: 'Green University', points: 500, badges: ['Silver', 'Gold', 'Platinum'] },
        { id: 'demo-2', name: 'Nature Lover', school: 'Sustainable College', points: 350, badges: ['Silver', 'Gold'] },
        { id: 'demo-3', name: 'Earth Guardian', school: 'Environmental Institute', points: 280, badges: ['Silver', 'Gold'] },
        { id: 'demo-4', name: 'Climate Hero', school: 'Eco Academy', points: 150, badges: ['Silver'] },
        { id: 'demo-5', name: 'Green Warrior', school: 'Nature School', points: 75, badges: [] }
      ];
      return res.json({ leaderboard: demoLeaderboard });
    }

    const { data: leaderboard, error } = await supabase
      .from('users')
      .select('id, name, school, points, badges')
      .order('points', { ascending: false })
      .limit(50);

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }

    res.json({ leaderboard });
  } catch (error) {
    console.error('Leaderboard error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Challenges System
app.get('/api/challenges', authenticateToken, async (req, res) => {
  try {
    const { data: challenges, error } = await supabase
      .from('challenges')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch challenges' });
    }

    res.json({ challenges });
  } catch (error) {
    console.error('Challenges error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/challenges/:id/complete', authenticateToken, async (req, res) => {
  try {
    const challengeId = req.params.id;
    const { proof_url, notes } = req.body;

    // Check if challenge exists
    const { data: challenge, error: challengeError } = await supabase
      .from('challenges')
      .select('*')
      .eq('id', challengeId)
      .single();

    if (challengeError || !challenge) {
      return res.status(404).json({ error: 'Challenge not found' });
    }

    // Check if user already completed this challenge
    const { data: existing, error: existingError } = await supabase
      .from('challenge_completions')
      .select('id')
      .eq('user_id', req.user.userId)
      .eq('challenge_id', challengeId)
      .single();

    if (existing) {
      return res.status(409).json({ error: 'Challenge already completed' });
    }

    // Record challenge completion
    const { data: completion, error: completionError } = await supabase
      .from('challenge_completions')
      .insert([{
        user_id: req.user.userId,
        challenge_id: challengeId,
        proof_url,
        notes,
        completed_at: new Date().toISOString(),
        status: 'pending_review'
      }])
      .select()
      .single();

    if (completionError) {
      return res.status(500).json({ error: 'Failed to record completion' });
    }

    res.json({
      message: 'Challenge completion recorded',
      completion
    });

  } catch (error) {
    console.error('Challenge completion error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Analytics and Stats
app.get('/api/stats/user', authenticateToken, async (req, res) => {
  try {
    // Get user stats
    const { data: user } = await supabase
      .from('users')
      .select('points, badges, created_at')
      .eq('id', req.user.userId)
      .single();

    // Get quiz attempts count
    const { count: quizAttempts } = await supabase
      .from('quiz_attempts')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', req.user.userId);

    // Get completed challenges count
    const { count: challengesCompleted } = await supabase
      .from('challenge_completions')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', req.user.userId)
      .eq('status', 'approved');

    // Get user rank
    const { count: rank } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .gt('points', user.points);

    res.json({
      stats: {
        points: user.points,
        badges: user.badges,
        quizAttempts: quizAttempts || 0,
        challengesCompleted: challengesCompleted || 0,
        rank: (rank || 0) + 1,
        memberSince: user.created_at
      }
    });

  } catch (error) {
    console.error('User stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Certificate Generation
app.get('/api/certificate/check', authenticateToken, async (req, res) => {
  try {
    const { data: user } = await supabase
      .from('users')
      .select('points, name, school')
      .eq('id', req.user.userId)
      .single();

    const eligible = user.points >= 500;
    
    res.json({
      eligible,
      points: user.points,
      requiredPoints: 500,
      user: {
        name: user.name,
        school: user.school
      }
    });

  } catch (error) {
    console.error('Certificate check error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve frontend files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('*', (req, res) => {
  // Check if it's an API route
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  
  // For all other routes, try to serve the corresponding HTML file
  const filePath = path.join(__dirname, req.path);
  res.sendFile(filePath, (err) => {
    if (err) {
      res.sendFile(path.join(__dirname, 'index.html'));
    }
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🌱 EcoQuest server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;

