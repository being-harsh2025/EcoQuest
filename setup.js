// EcoQuest Setup Script
// This script helps set up the development environment

const fs = require('fs');
const path = require('path');

console.log('🌱 Setting up EcoQuest development environment...\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, '.env.example');

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ Created .env file from .env.example');
    console.log('⚠️  Please update the .env file with your actual configuration values\n');
  } else {
    console.log('❌ .env.example file not found');
  }
} else {
  console.log('✅ .env file already exists\n');
}

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('✅ Created uploads directory');
} else {
  console.log('✅ Uploads directory already exists');
}

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
  console.log('✅ Created logs directory');
} else {
  console.log('✅ Logs directory already exists');
}

console.log('\n🎉 Setup complete!');
console.log('\nNext steps:');
console.log('1. Update your .env file with the correct values');
console.log('2. Set up your Supabase database using the schema in database/schema.sql');
console.log('3. Run "npm run dev" to start the development server');
console.log('4. Visit http://localhost:3000 to see your application\n');

console.log('📚 Documentation:');
console.log('- API endpoints: http://localhost:3000/api/health');
console.log('- Database schema: ./database/schema.sql');
console.log('- Environment variables: ./.env.example\n');
