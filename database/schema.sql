-- EcoQuest Database Schema for Supabase/PostgreSQL

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    school VARCHAR(255),
    points INTEGER DEFAULT 0,
    badges TEXT[] DEFAULT '{}',
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true
);

-- Point transactions table
CREATE TABLE point_transactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    points INTEGER NOT NULL,
    reason TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quiz questions table
CREATE TABLE quiz_questions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    question TEXT NOT NULL,
    options JSONB NOT NULL,
    correct_answer INTEGER NOT NULL,
    explanation TEXT,
    category VARCHAR(100),
    difficulty VARCHAR(20) DEFAULT 'easy',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true
);

-- Quiz attempts table
CREATE TABLE quiz_attempts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    answers JSONB NOT NULL,
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Challenges table
CREATE TABLE challenges (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    instructions TEXT,
    points_reward INTEGER DEFAULT 50,
    category VARCHAR(100),
    difficulty VARCHAR(20) DEFAULT 'medium',
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    active BOOLEAN DEFAULT true
);

-- Challenge completions table
CREATE TABLE challenge_completions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    challenge_id UUID REFERENCES challenges(id) ON DELETE CASCADE,
    proof_url TEXT,
    notes TEXT,
    status VARCHAR(20) DEFAULT 'pending_review',
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    reviewed_by UUID REFERENCES users(id),
    UNIQUE(user_id, challenge_id)
);

-- Daily login tracking
CREATE TABLE daily_logins (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    login_date DATE NOT NULL,
    points_awarded INTEGER DEFAULT 2,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, login_date)
);

-- User achievements/badges tracking
CREATE TABLE user_achievements (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    achievement_type VARCHAR(50) NOT NULL,
    achievement_name VARCHAR(100) NOT NULL,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    points_at_earning INTEGER
);

-- Leaderboard view (materialized for performance)
CREATE MATERIALIZED VIEW leaderboard AS
SELECT 
    u.id,
    u.name,
    u.school,
    u.points,
    u.badges,
    u.avatar_url,
    ROW_NUMBER() OVER (ORDER BY u.points DESC, u.created_at ASC) as rank
FROM users u
WHERE u.is_active = true
ORDER BY u.points DESC, u.created_at ASC;

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_points ON users(points DESC);
CREATE INDEX idx_point_transactions_user_id ON point_transactions(user_id);
CREATE INDEX idx_point_transactions_created_at ON point_transactions(created_at DESC);
CREATE INDEX idx_quiz_attempts_user_id ON quiz_attempts(user_id);
CREATE INDEX idx_quiz_attempts_completed_at ON quiz_attempts(completed_at DESC);
CREATE INDEX idx_challenge_completions_user_id ON challenge_completions(user_id);
CREATE INDEX idx_challenge_completions_status ON challenge_completions(status);
CREATE INDEX idx_daily_logins_user_date ON daily_logins(user_id, login_date);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_challenges_updated_at BEFORE UPDATE ON challenges
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to refresh leaderboard materialized view
CREATE OR REPLACE FUNCTION refresh_leaderboard()
RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW leaderboard;
END;
$$ LANGUAGE plpgsql;

-- Insert sample quiz questions
INSERT INTO quiz_questions (question, options, correct_answer, explanation, category) VALUES
('What is the most energy-efficient way to light your home?', 
 '["Incandescent bulbs", "LED bulbs", "Halogen bulbs", "Fluorescent bulbs"]', 
 1, 
 'LED bulbs use up to 80% less energy than incandescent bulbs and last much longer!', 
 'Energy Conservation'),

('How long should you shower to save water?', 
 '["20 minutes", "5 minutes", "15 minutes", "30 minutes"]', 
 1, 
 'A 5-minute shower uses about 25 gallons of water, while a 20-minute shower uses 100 gallons!', 
 'Water Conservation'),

('What should you do with food scraps?', 
 '["Throw in trash", "Compost them", "Flush down toilet", "Burn them"]', 
 1, 
 'Composting food scraps creates nutrient-rich soil and reduces landfill waste!', 
 'Waste Reduction'),

('What is the most eco-friendly way to travel short distances?', 
 '["Drive alone", "Walk or bike", "Take a taxi", "Use a motorcycle"]', 
 1, 
 'Walking or biking produces zero emissions and provides health benefits!', 
 'Transportation'),

('What helps support local wildlife?', 
 '["Planting native species", "Using pesticides", "Removing all plants", "Concrete landscaping"]', 
 0, 
 'Native plants provide food and habitat for local wildlife and require less maintenance!', 
 'Biodiversity');

-- Insert sample challenges
INSERT INTO challenges (title, description, instructions, points_reward, category) VALUES
('Plant a Tree', 
 'Plant a tree in your community or school grounds to help combat climate change.', 
 'Find a suitable location, get permission if needed, plant a native tree species, and take a photo as proof.', 
 50, 
 'Environmental Action'),

('Organize a Cleanup Drive', 
 'Organize a community cleanup drive to remove litter from public spaces.', 
 'Gather volunteers, choose a location, collect trash for at least 2 hours, and document your impact.', 
 75, 
 'Community Service'),

('Start Composting', 
 'Set up a composting system at home or school to reduce organic waste.', 
 'Create a compost bin, add organic waste regularly, and maintain it for at least 2 weeks.', 
 40, 
 'Waste Reduction'),

('Energy Audit', 
 'Conduct an energy audit of your home or school to identify energy-saving opportunities.', 
 'Check for energy waste, document findings, and implement at least 3 energy-saving measures.', 
 60, 
 'Energy Conservation'),

('Water Conservation Project', 
 'Implement water-saving measures in your daily routine.', 
 'Install water-saving devices, track water usage, and reduce consumption by at least 20%.', 
 45, 
 'Water Conservation');

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE point_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_logins ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

-- Users can only see and update their own data
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Point transactions are viewable by the user who earned them
CREATE POLICY "Users can view own transactions" ON point_transactions
    FOR SELECT USING (auth.uid() = user_id);

-- Quiz attempts are viewable by the user who took them
CREATE POLICY "Users can view own quiz attempts" ON quiz_attempts
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quiz attempts" ON quiz_attempts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Challenge completions are viewable by the user who completed them
CREATE POLICY "Users can view own completions" ON challenge_completions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own completions" ON challenge_completions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Daily logins are viewable by the user
CREATE POLICY "Users can view own daily logins" ON daily_logins
    FOR SELECT USING (auth.uid() = user_id);

-- User achievements are viewable by the user
CREATE POLICY "Users can view own achievements" ON user_achievements
    FOR SELECT USING (auth.uid() = user_id);

-- Quiz questions and challenges are publicly readable
CREATE POLICY "Quiz questions are publicly readable" ON quiz_questions
    FOR SELECT USING (is_active = true);

CREATE POLICY "Challenges are publicly readable" ON challenges
    FOR SELECT USING (active = true);

-- Create a function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.users (id, email, name)
    VALUES (new.id, new.email, new.raw_user_meta_data->>'name');
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();
