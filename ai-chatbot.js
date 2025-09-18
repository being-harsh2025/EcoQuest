// EcoQuest AI Chatbot - Advanced Environmental Assistant
class EcoChatbot {
  constructor() {
    this.isOpen = false;
    this.conversationHistory = [];
    this.userContext = {};
    this.knowledgeBase = this.initializeKnowledgeBase();
    this.init();
  }

  initializeKnowledgeBase() {
    return {
      // Comprehensive Site Features
      features: {
        'eco simulator': {
          description: 'Build your own sustainable city with renewable energy, green buildings, and environmental challenges.',
          points: '10-20 points per action',
          location: 'eco-simulator.html',
          details: 'Interactive city building game where you make environmental decisions, manage resources, and see the impact of your choices on the environment.'
        },
        'leaderboard': {
          description: 'Compete with students globally and see school vs school battles in real-time.',
          location: 'advanced-leaderboard.html',
          details: 'View global rankings, school competitions, top performers, and track your progress against other students worldwide.'
        },
        'achievements': {
          description: 'Unlock rare badges, collect items, and track your environmental impact milestones.',
          location: 'achievements.html',
          details: 'Earn Silver (100 pts), Gold (250 pts), Platinum (400 pts) badges and special achievement badges for various accomplishments.'
        },
        'social hub': {
          description: 'Connect with friends, join teams, chat live, and participate in collaborative challenges.',
          location: 'social-hub.html',
          details: 'Real-time chat, team formation, friend connections, and collaborative environmental projects.'
        },
        'story mode': {
          description: 'Follow an interactive adventure to save the planet through engaging missions.',
          location: 'story-mode.html',
          details: 'Narrative-driven environmental adventure with missions, character development, and educational storylines.'
        },
        'impact tracker': {
          description: 'See your real-world environmental impact with carbon footprint calculations.',
          location: 'impact-tracker.html',
          details: 'Track your carbon footprint, water usage, waste reduction, and get personalized recommendations for improvement.'
        },
        'challenges': {
          description: 'Complete photo-verified environmental tasks for points and recognition.',
          points: '+50 points each',
          location: 'challenges.html',
          details: 'Real-world environmental tasks like tree planting, waste segregation, community cleanup with photo verification.'
        },
        'quizzes': {
          description: 'Interactive AI-generated environmental quizzes with instant feedback.',
          points: '+5 points per correct answer',
          location: 'quiz.html',
          details: '10-question quizzes covering climate change, sustainability, renewable energy, and environmental science.'
        },
        'certificate': {
          description: 'Earn official environmental certificates for your achievements.',
          requirement: '500+ points',
          location: 'certificate.html',
          details: 'Downloadable certificates recognizing your environmental learning and impact achievements.'
        }
      },
      
      // Comprehensive Environmental Knowledge
      environment: {
        'climate change': {
          definition: 'Global warming caused by greenhouse gas emissions, leading to rising temperatures and extreme weather.',
          causes: 'Burning fossil fuels, deforestation, industrial processes, agriculture',
          effects: 'Rising sea levels, extreme weather, ecosystem disruption, food security issues',
          solutions: 'Renewable energy, carbon reduction, reforestation, sustainable practices'
        },
        'carbon footprint': {
          definition: 'The total amount of greenhouse gases produced by human activities, measured in CO2 equivalent.',
          average: 'Global average: 4.8 tons CO₂/year per person',
          target: 'Climate goal: Under 2 tons CO₂/year per person',
          calculation: 'Includes transportation, energy use, food, consumption, and waste'
        },
        'renewable energy': {
          definition: 'Energy from sources that naturally replenish like solar, wind, hydro, and geothermal.',
          types: 'Solar, wind, hydroelectric, geothermal, biomass, tidal',
          benefits: 'Clean, sustainable, reduces greenhouse gases, creates jobs',
          growth: 'Fastest growing energy sector globally'
        },
        'recycling': {
          definition: 'Processing waste materials into new products to reduce consumption of fresh raw materials.',
          benefits: 'Saves energy, reduces landfill waste, conserves natural resources',
          facts: 'Recycling one aluminum can saves enough energy to power a TV for 3 hours',
          process: 'Collection, sorting, processing, manufacturing, purchasing recycled products'
        },
        'biodiversity': {
          definition: 'The variety of life on Earth, including different species, ecosystems, and genetic diversity.',
          importance: 'Ecosystem stability, food security, medicine, climate regulation',
          threats: 'Habitat loss, climate change, pollution, invasive species',
          conservation: 'Protected areas, sustainable practices, restoration projects'
        },
        'sustainability': {
          definition: 'Meeting present needs without compromising future generations ability to meet their needs.',
          pillars: 'Environmental, social, and economic sustainability',
          practices: 'Renewable energy, circular economy, sustainable agriculture, green building',
          goals: 'UN Sustainable Development Goals (SDGs)'
        }
      },

      // Detailed Action Guides
      actions: {
        'reduce carbon': {
          transport: 'Use public transport, bike, walk, electric vehicles, carpool',
          energy: 'Switch to renewable energy, improve home insulation, use efficient appliances',
          diet: 'Eat less meat, choose local/seasonal food, reduce food waste',
          consumption: 'Buy less, choose sustainable products, repair instead of replace'
        },
        'save water': {
          home: 'Take shorter showers, fix leaks, use low-flow fixtures, collect rainwater',
          garden: 'Drought-resistant plants, drip irrigation, mulching',
          habits: 'Turn off taps, full loads in dishwasher/washing machine',
          facts: 'Average person uses 80-100 gallons per day'
        },
        'reduce waste': {
          hierarchy: 'Reduce, Reuse, Recycle - in that order of priority',
          reduce: 'Buy only what you need, choose products with less packaging',
          reuse: 'Repurpose items, donate, repair, share with others',
          recycle: 'Proper sorting, clean containers, know local guidelines'
        },
        'plant trees': {
          benefits: 'Absorb CO2, provide oxygen, prevent soil erosion, support wildlife',
          impact: 'One tree absorbs 48 lbs of CO2 per year',
          tips: 'Choose native species, proper spacing, regular watering',
          programs: 'Join local tree planting initiatives, school programs'
        }
      },

      // Comprehensive EcoQuest Information
      ecoquest: {
        'points system': {
          quiz: '+5 points per correct answer',
          challenges: '+50 points per completed challenge',
          daily: '+2 points for daily login',
          simulator: '+10-20 points per eco-friendly action',
          special: '+100+ points for major achievements'
        },
        'badge system': {
          silver: '100 points - First milestone badge',
          gold: '250 points - Advanced learner badge',
          platinum: '400 points - Expert environmentalist badge',
          special: 'Achievement-specific badges for various accomplishments'
        },
        'school features': {
          competition: 'School vs school global rankings',
          collaboration: 'Team challenges and group projects',
          teacher: 'Teacher verification for challenges',
          progress: 'Class and school progress tracking'
        },
        'certificates': {
          requirement: '500+ points for official certificate',
          recognition: 'Downloadable PDF certificates',
          sharing: 'Share achievements on social media',
          value: 'Official recognition for environmental learning'
        }
      },

      // Site Navigation and Help
      navigation: {
        'getting started': 'Sign up → Complete profile → Take first quiz → Join challenges → Earn points',
        'main features': 'Dashboard, Quizzes, Challenges, Eco Simulator, Social Hub, Leaderboard',
        'user account': 'Profile management, progress tracking, achievement history',
        'help sections': 'FAQ, tutorials, contact support, community guidelines'
      },

      // Current Environmental Issues and Facts
      current_issues: {
        'global warming': 'Earth has warmed 1.1°C since pre-industrial times',
        'deforestation': 'We lose 18.7 million acres of forest annually',
        'ocean plastic': '8 million tons of plastic enter oceans yearly',
        'species extinction': '1 million species face extinction risk',
        'renewable growth': 'Renewable energy grew 260% in the last decade'
      }
    };
  }

  init() {
    this.createChatbotUI();
    this.attachEventListeners();
    this.loadUserContext();
  }

  createChatbotUI() {
    const chatbotHTML = `
      <div id="ecoChatbot" class="eco-chatbot">
        <div class="chatbot-toggle" id="chatbotToggle">
          <div class="bot-avatar">🤖</div>
          <div class="toggle-text">EcoBot</div>
        </div>
        
        <div class="chatbot-window" id="chatbotWindow">
          <div class="chatbot-header">
            <div class="bot-info">
              <div class="bot-avatar-large">🌱</div>
              <div>
                <div class="bot-name">EcoBot Assistant</div>
                <div class="bot-status">Online • Ready to help</div>
              </div>
            </div>
            <button class="close-btn" id="closeChatbot">×</button>
          </div>
          
          <div class="chat-messages" id="chatMessages">
            <div class="message bot-message">
              <div class="message-avatar">🌱</div>
              <div class="message-content">
                <div class="message-text">Hi! I'm EcoBot, your environmental assistant! 🌍 Ask me about:</div>
                <div class="quick-actions">
                  <button class="quick-btn" data-query="How do I earn points?">💚 Earning Points</button>
                  <button class="quick-btn" data-query="What are the challenges?">🎯 Challenges</button>
                  <button class="quick-btn" data-query="How to reduce carbon footprint?">🌱 Eco Tips</button>
                  <button class="quick-btn" data-query="Tell me about climate change">🌍 Climate Info</button>
                </div>
              </div>
            </div>
          </div>
          
          <div class="chat-input-area">
            <div class="typing-indicator" id="typingIndicator" style="display: none;">
              <div class="typing-dots">
                <span></span><span></span><span></span>
              </div>
              <span>EcoBot is thinking...</span>
            </div>
            <div class="chat-input">
              <input type="text" id="chatInput" placeholder="Ask me anything about environment or EcoQuest..." maxlength="500">
              <button id="sendMessage" class="send-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    this.addChatbotStyles();
  }

  addChatbotStyles() {
    const styles = `
      <style>
        .eco-chatbot {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 10000;
          font-family: Inter, system-ui, sans-serif;
        }
        
        .chatbot-toggle {
          display: flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          padding: 12px 16px;
          border-radius: 25px;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(34, 197, 94, 0.3);
          transition: all 0.3s ease;
          animation: pulse 2s infinite;
        }
        
        .chatbot-toggle:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(34, 197, 94, 0.4);
        }
        
        .bot-avatar {
          font-size: 20px;
        }
        
        .toggle-text {
          font-weight: 600;
          font-size: 14px;
        }
        
        .chatbot-window {
          position: absolute;
          bottom: 70px;
          right: 0;
          width: 380px;
          height: 500px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
          display: none;
          flex-direction: column;
          overflow: hidden;
          border: 2px solid #e5e7eb;
        }
        
        .chatbot-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
        }
        
        .bot-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .bot-avatar-large {
          font-size: 32px;
        }
        
        .bot-name {
          font-weight: 600;
          font-size: 16px;
        }
        
        .bot-status {
          font-size: 12px;
          opacity: 0.9;
        }
        
        .close-btn {
          background: none;
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: background 0.2s;
        }
        
        .close-btn:hover {
          background: rgba(255,255,255,0.2);
        }
        
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          background: #f9fafb;
        }
        
        .message {
          display: flex;
          gap: 8px;
          margin-bottom: 16px;
          animation: slideIn 0.3s ease;
        }
        
        .user-message {
          flex-direction: row-reverse;
        }
        
        .message-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          flex-shrink: 0;
        }
        
        .bot-message .message-avatar {
          background: #22c55e;
        }
        
        .user-message .message-avatar {
          background: #3b82f6;
        }
        
        .message-content {
          max-width: 280px;
        }
        
        .message-text {
          background: white;
          padding: 12px 16px;
          border-radius: 16px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          line-height: 1.4;
          font-size: 14px;
        }
        
        .user-message .message-text {
          background: #3b82f6;
          color: white;
        }
        
        .quick-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-top: 8px;
        }
        
        .quick-btn {
          background: #f3f4f6;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 8px 12px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }
        
        .quick-btn:hover {
          background: #22c55e;
          color: white;
          border-color: #22c55e;
        }
        
        .chat-input-area {
          padding: 16px;
          border-top: 1px solid #e5e7eb;
          background: white;
        }
        
        .typing-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          font-size: 12px;
          color: #6b7280;
        }
        
        .typing-dots {
          display: flex;
          gap: 2px;
        }
        
        .typing-dots span {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #22c55e;
          animation: typing 1.4s infinite;
        }
        
        .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
        .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
        
        .chat-input {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        
        .chat-input input {
          flex: 1;
          padding: 12px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 25px;
          outline: none;
          font-size: 14px;
          transition: border-color 0.2s;
        }
        
        .chat-input input:focus {
          border-color: #22c55e;
        }
        
        .send-btn {
          background: #22c55e;
          color: white;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        
        .send-btn:hover {
          background: #16a34a;
          transform: scale(1.05);
        }
        
        .send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes typing {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-10px); }
        }
        
        @media (max-width: 480px) {
          .chatbot-window {
            width: calc(100vw - 40px);
            height: 70vh;
            bottom: 80px;
            right: 20px;
          }
        }
      </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
  }

  attachEventListeners() {
    const toggle = document.getElementById('chatbotToggle');
    const closeBtn = document.getElementById('closeChatbot');
    const sendBtn = document.getElementById('sendMessage');
    const input = document.getElementById('chatInput');

    toggle.addEventListener('click', () => this.toggleChatbot());
    closeBtn.addEventListener('click', () => this.closeChatbot());
    sendBtn.addEventListener('click', () => this.sendMessage());
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });

    // Quick action buttons
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('quick-btn')) {
        const query = e.target.dataset.query;
        this.processUserMessage(query);
      }
    });
  }

  toggleChatbot() {
    const window = document.getElementById('chatbotWindow');
    this.isOpen = !this.isOpen;
    window.style.display = this.isOpen ? 'flex' : 'none';
    
    if (this.isOpen) {
      document.getElementById('chatInput').focus();
    }
  }

  closeChatbot() {
    this.isOpen = false;
    document.getElementById('chatbotWindow').style.display = 'none';
  }

  sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    this.addMessage(message, 'user');
    input.value = '';
    
    this.processUserMessage(message);
  }

  addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageHTML = `
      <div class="message ${sender}-message">
        <div class="message-avatar">${sender === 'bot' ? '🌱' : '👤'}</div>
        <div class="message-content">
          <div class="message-text">${text}</div>
        </div>
      </div>
    `;
    
    messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  showTyping() {
    document.getElementById('typingIndicator').style.display = 'flex';
  }

  hideTyping() {
    document.getElementById('typingIndicator').style.display = 'none';
  }

  async processUserMessage(message) {
    this.showTyping();
    
    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const response = this.generateResponse(message.toLowerCase());
    
    this.hideTyping();
    this.addMessage(response, 'bot');
    
    // Store conversation
    this.conversationHistory.push({
      user: message,
      bot: response,
      timestamp: new Date()
    });
  }

  generateResponse(message) {
    // Enhanced context-aware response generation
    const user = window.Eco ? window.Eco.getAuthedUser() : null;
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Greeting patterns with personalization
    if (this.matchesPattern(message, ['hello', 'hi', 'hey', 'greetings', 'start'])) {
      const userGreeting = user ? `Hi ${user.name || user.email}! 🌱` : 'Hi there! 🌱';
      const contextualInfo = this.getContextualWelcome(user, currentPage);
      return `${userGreeting} I'm EcoBot, your intelligent environmental assistant!\n\n${contextualInfo}\n\n💬 Ask me about any EcoQuest feature, environmental topic, or how to earn more points!`;
    }

    // Comprehensive points and scoring system
    if (this.matchesPattern(message, ['points', 'score', 'earn', 'get points', 'how many points'])) {
      return this.generatePointsResponse(user);
    }

    // Enhanced challenges information
    if (this.matchesPattern(message, ['challenge', 'task', 'mission', 'activity', 'what challenges'])) {
      return this.generateChallengesResponse(user);
    }

    // Comprehensive site features with navigation
    if (this.matchesPattern(message, ['features', 'what can i do', 'site features', 'navigation', 'menu'])) {
      return this.generateFeaturesOverview(user);
    }

    // Enhanced environmental topics with detailed information
    for (const [topic, info] of Object.entries(this.knowledgeBase.environment)) {
      if (message.includes(topic.replace(' ', '')) || message.includes(topic)) {
        return this.generateEnvironmentalResponse(topic, info);
      }
    }

    // Detailed site features with navigation help
    for (const [feature, data] of Object.entries(this.knowledgeBase.features)) {
      if (message.includes(feature.replace(' ', '')) || message.includes(feature)) {
        return this.generateFeatureResponse(feature, data, user);
      }
    }

    // Enhanced action guides with personalized tips
    for (const [action, data] of Object.entries(this.knowledgeBase.actions)) {
      if (this.matchesPattern(message, action.split(' ')) || message.includes(action.replace(' ', ''))) {
        return this.generateActionResponse(action, data);
      }
    }

    // EcoQuest specific features with user context
    for (const [topic, data] of Object.entries(this.knowledgeBase.ecoquest)) {
      if (message.includes(topic.replace(' ', '')) || message.includes(topic)) {
        return this.generateEcoQuestResponse(topic, data, user);
      }
    }

    // Badge and achievement system
    if (this.matchesPattern(message, ['badge', 'achievement', 'unlock', 'silver', 'gold', 'platinum'])) {
      return this.generateBadgeResponse(user);
    }

    // Certificate information
    if (this.matchesPattern(message, ['certificate', 'certification', 'diploma', 'credential'])) {
      return this.generateCertificateResponse(user);
    }

    // School and competition features
    if (this.matchesPattern(message, ['school', 'compete', 'leaderboard', 'ranking', 'competition'])) {
      return this.generateSchoolResponse(user);
    }

    // Navigation and getting started help
    if (this.matchesPattern(message, ['how to start', 'getting started', 'begin', 'first steps', 'tutorial'])) {
      return this.generateGettingStartedResponse(user);
    }

    // User progress and statistics
    if (this.matchesPattern(message, ['progress', 'stats', 'statistics', 'my progress', 'how am i doing'])) {
      return this.generateProgressResponse(user);
    }

    // Environmental facts and current issues
    if (this.matchesPattern(message, ['fact', 'facts', 'statistics', 'current issues', 'environment news'])) {
      return this.generateEnvironmentalFactsResponse();
    }

    // Help and support with comprehensive guidance
    if (this.matchesPattern(message, ['help', 'support', 'how', 'guide', 'assistance', 'stuck'])) {
      return this.generateHelpResponse(currentPage);
    }

    // Smart fallback with contextual suggestions
    return this.generateSmartFallback(message, user, currentPage);
  }

  getContextualWelcome(user, currentPage) {
    if (!user) {
      return "🚀 Sign up to start your environmental journey and earn points!";
    }
    
    const pageContext = {
      'quiz.html': 'Ready for an environmental quiz? Each correct answer gives you +5 points!',
      'challenges.html': 'Time for some real-world environmental action! Complete challenges for +50 points each.',
      'eco-simulator.html': 'Build your sustainable city and earn +10-20 points per eco-friendly action!',
      'leaderboard.html': `You're currently ranked with ${user.points || 0} points. Keep climbing!`,
      'achievements.html': `You have ${user.badges?.length || 0} badges. Check what you can unlock next!`,
      'social-hub.html': 'Connect with fellow eco-warriors and join collaborative challenges!',
      'impact-tracker.html': 'Track your environmental impact and get personalized recommendations!'
    };
    
    return pageContext[currentPage] || `You have ${user.points || 0} points and ${user.badges?.length || 0} badges. What would you like to explore?`;
  }

  generatePointsResponse(user) {
    const currentPoints = user ? user.points || 0 : 0;
    const nextBadge = this.getNextBadge(currentPoints);
    
    return `🎯 EcoQuest Points System:\n\n📚 Quiz correct answers: +5 points\n🎯 Completed challenges: +50 points\n📅 Daily login bonus: +2 points\n🏙️ Eco Simulator actions: +10-20 points\n🏆 Special achievements: +100+ points\n\n${user ? `💚 Your current score: ${currentPoints} points\n${nextBadge}` : '🔐 Sign in to start earning points and tracking progress!'}\n\n💡 Tip: Complete challenges for the biggest point boost!`;
  }

  generateChallengesResponse(user) {
    return `🎯 Real-World Environmental Challenges:\n\n🌳 Tree Planting Initiative (+50 pts)\n♻️ Waste Segregation Project (+50 pts)\n🚴 Sustainable Transport Week (+50 pts)\n💡 Energy Conservation Challenge (+50 pts)\n🧹 Community Cleanup Drive (+50 pts)\n🌱 Start a School Garden (+50 pts)\n\n📸 All challenges require photo verification by teachers\n🌍 Your actions create real environmental impact\n\n${user ? `💪 Ready to make a difference? Visit the Challenges page to get started!` : '🔐 Sign in to participate in challenges and earn points!'}\n\n🏆 Pro tip: Team up with classmates for group challenges!`;
  }

  generateFeaturesOverview(user) {
    return `🚀 EcoQuest Features Overview:\n\n📚 **Interactive Quizzes** - Test your environmental knowledge\n🎯 **Real-World Challenges** - Make actual environmental impact\n🏙️ **Eco Simulator** - Build sustainable cities\n📊 **Impact Tracker** - Monitor your carbon footprint\n🏆 **Achievements System** - Unlock badges and certificates\n📈 **Global Leaderboard** - Compete with students worldwide\n🤝 **Social Hub** - Connect and collaborate\n📖 **Story Mode** - Interactive environmental adventures\n\n${user ? `🎮 You're signed in! All features are unlocked.` : '🔐 Sign up to unlock all features and start earning points!'}\n\n🧭 **Navigation**: Use the top menu to explore each feature\n💡 **Getting Started**: Take a quiz → Join challenges → Earn points!`;
  }

  generateEnvironmentalResponse(topic, info) {
    const sections = [];
    if (info.definition) sections.push(`📖 **Definition**: ${info.definition}`);
    if (info.causes) sections.push(`⚠️ **Causes**: ${info.causes}`);
    if (info.effects) sections.push(`🌍 **Effects**: ${info.effects}`);
    if (info.solutions) sections.push(`✅ **Solutions**: ${info.solutions}`);
    if (info.types) sections.push(`🔧 **Types**: ${info.types}`);
    if (info.benefits) sections.push(`💚 **Benefits**: ${info.benefits}`);
    if (info.facts) sections.push(`💡 **Did you know?** ${info.facts}`);
    
    return `🌍 **${topic.toUpperCase()}**\n\n${sections.join('\n\n')}\n\n🎓 **Learn More**: Take our environmental quizzes to test your knowledge!\n🎯 **Take Action**: Check out related challenges to make real impact!`;
  }

  generateFeatureResponse(feature, data, user) {
    return `✨ **${feature.toUpperCase()}**\n\n📝 ${data.description}\n\n${data.points ? `🎯 **Points**: ${data.points}\n` : ''}${data.requirement ? `📋 **Requirement**: ${data.requirement}\n` : ''}\n💡 **Details**: ${data.details}\n\n🚀 **Ready to try it?** ${data.location ? `Visit: ${data.location.replace('.html', '').replace('-', ' ').toUpperCase()}` : 'Check the navigation menu!'}\n\n${user ? '🎮 You have access to this feature!' : '🔐 Sign in to unlock this feature!'}`;
  }

  generateActionResponse(action, data) {
    const sections = [];
    for (const [key, value] of Object.entries(data)) {
      sections.push(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`);
    }
    
    return `🌱 **${action.toUpperCase()} GUIDE**\n\n${sections.join('\n\n')}\n\n💚 **EcoQuest Connection**: Log these actions in our challenges section for points!\n🏆 **Impact**: Every small action contributes to global environmental health!`;
  }

  generateEcoQuestResponse(topic, data, user) {
    const sections = [];
    for (const [key, value] of Object.entries(data)) {
      sections.push(`**${key.charAt(0).toUpperCase() + key.slice(1)}**: ${value}`);
    }
    
    return `🎮 **${topic.toUpperCase()} IN ECOQUEST**\n\n${sections.join('\n\n')}\n\n${user ? `🎯 Your current progress fits into this system!` : '🔐 Sign in to start participating!'}\n\n🌟 Explore the platform to discover more features!`;
  }

  generateBadgeResponse(user) {
    const currentPoints = user ? user.points || 0 : 0;
    const badges = user ? user.badges || [] : [];
    
    return `🏆 **BADGE SYSTEM**\n\n🥈 **Silver Badge** - 100 points (${currentPoints >= 100 ? '✅ Unlocked!' : `${100 - currentPoints} points to go!`})\n🥇 **Gold Badge** - 250 points (${currentPoints >= 250 ? '✅ Unlocked!' : `${250 - currentPoints} points to go!`})\n💎 **Platinum Badge** - 400 points (${currentPoints >= 400 ? '✅ Unlocked!' : `${400 - currentPoints} points to go!`})\n\n${user ? `🎖️ **Your Badges**: ${badges.length > 0 ? badges.join(', ') : 'None yet - start earning points!'}\n💪 **Current Points**: ${currentPoints}` : '🔐 Sign in to start earning badges!'}\n\n🌟 **Special Badges**: Unlock unique badges for specific achievements!\n🏅 **Achievement Page**: Visit Achievements to see all available badges!`;
  }

  generateCertificateResponse(user) {
    const currentPoints = user ? user.points || 0 : 0;
    const canGetCertificate = currentPoints >= 500;
    
    return `🎓 **ENVIRONMENTAL CERTIFICATES**\n\n📋 **Requirement**: 500+ points for official certificate\n📄 **Format**: Downloadable PDF certificate\n🌟 **Recognition**: Official environmental learning credential\n📱 **Sharing**: Share achievements on social media\n\n${user ? `${canGetCertificate ? '🎉 **Congratulations!** You qualify for a certificate! Visit the Certificate page to download it.' : `📈 **Progress**: ${currentPoints}/500 points (${500 - currentPoints} points needed)`}` : '🔐 Sign in to track your progress toward certification!'}\n\n💡 **Tip**: Complete challenges for +50 points each - the fastest way to reach 500!`;
  }

  generateSchoolResponse(user) {
    return `🏫 **SCHOOL FEATURES & COMPETITIONS**\n\n🏆 **Global School Rankings**: See how your school compares worldwide\n👥 **Team Challenges**: Collaborate with classmates on group projects\n📊 **Class Progress**: Teachers can track entire class performance\n🥇 **School vs School**: Real-time competitions between institutions\n✅ **Teacher Verification**: Teachers verify challenge completions\n\n${user && user.school ? `🎓 **Your School**: ${user.school}\n🔥 Check the Advanced Leaderboard to see your school's ranking!` : '🏫 Add your school info in your profile to join school competitions!'}\n\n🤝 **Collaboration**: Work together to make your school an environmental leader!\n🌍 **Real Impact**: School competitions drive real environmental action!`;
  }

  generateGettingStartedResponse(user) {
    if (user) {
      return `🚀 **NEXT STEPS FOR YOU**\n\n✅ You're signed in! Here's what to do next:\n\n1️⃣ **Take a Quiz** (+5 points per correct answer)\n2️⃣ **Join a Challenge** (+50 points per completion)\n3️⃣ **Try Eco Simulator** (+10-20 points per action)\n4️⃣ **Visit Social Hub** (connect with other eco-warriors)\n5️⃣ **Track Your Impact** (monitor your environmental footprint)\n\n🎯 **Current Status**: ${user.points || 0} points, ${user.badges?.length || 0} badges\n🏆 **Next Goal**: ${this.getNextBadge(user.points || 0)}\n\n💡 **Pro Tip**: Complete challenges for the biggest point boost!`;
    } else {
      return `🌱 **GET STARTED WITH ECOQUEST**\n\n1️⃣ **Sign Up** - Create your free account\n2️⃣ **Complete Profile** - Add your school and info\n3️⃣ **Take First Quiz** - Start earning points immediately\n4️⃣ **Join Challenges** - Make real environmental impact\n5️⃣ **Explore Features** - Discover all EcoQuest has to offer\n\n🎯 **Goal**: Reach 100 points for your first Silver badge!\n🏫 **School**: Join your school's team for competitions\n🤝 **Community**: Connect with fellow environmental enthusiasts\n\n🚀 **Ready?** Click 'Sign Up' in the top menu to begin your journey!`;
    }
  }

  generateProgressResponse(user) {
    if (!user) {
      return `📊 **PROGRESS TRACKING**\n\n🔐 Sign in to see your detailed progress including:\n\n📈 Points earned over time\n🏆 Badges and achievements unlocked\n🎯 Challenges completed\n📚 Quizzes taken and scores\n🌍 Environmental impact metrics\n📊 Ranking among peers\n\n🚀 **Get Started**: Sign up to begin tracking your environmental journey!`;
    }
    
    const points = user.points || 0;
    const badges = user.badges || [];
    const nextBadge = this.getNextBadge(points);
    
    return `📊 **YOUR PROGRESS DASHBOARD**\n\n🎯 **Total Points**: ${points}\n🏆 **Badges Earned**: ${badges.length > 0 ? badges.join(', ') : 'None yet'}\n📅 **Last Login**: ${user.lastLoginDate || 'Today'}\n🎓 **School**: ${user.school || 'Not set'}\n\n📈 **Next Milestone**: ${nextBadge}\n🎖️ **Certificate Status**: ${points >= 500 ? '✅ Eligible! Visit Certificate page' : `${500 - points} points needed`}\n\n💡 **Recommendations**:\n${this.getPersonalizedRecommendations(user)}\n\n🔍 **Detailed Stats**: Visit your profile for complete analytics!`;
  }

  generateEnvironmentalFactsResponse() {
    const facts = [];
    for (const [issue, fact] of Object.entries(this.knowledgeBase.current_issues)) {
      facts.push(`**${issue.replace('_', ' ').toUpperCase()}**: ${fact}`);
    }
    
    return `🌍 **CURRENT ENVIRONMENTAL FACTS**\n\n${facts.join('\n\n')}\n\n💡 **What You Can Do**:\n• Take our quizzes to learn more about these issues\n• Complete challenges to make real environmental impact\n• Use the Impact Tracker to monitor your carbon footprint\n• Share knowledge with friends through Social Hub\n\n🎯 **EcoQuest Connection**: Every point you earn represents real environmental learning and action!`;
  }

  generateHelpResponse(currentPage) {
    const pageHelp = {
      'quiz.html': 'Answer 10 environmental questions to earn +5 points each. Read explanations to learn!',
      'challenges.html': 'Choose real-world environmental tasks, complete them, and upload photo proof for +50 points.',
      'eco-simulator.html': 'Build a sustainable city by making eco-friendly choices. Earn +10-20 points per action.',
      'leaderboard.html': 'View global rankings, school competitions, and see how you compare with other students.',
      'achievements.html': 'Track your badges, see requirements for new ones, and monitor your progress.',
      'social-hub.html': 'Connect with friends, join teams, chat, and participate in collaborative challenges.',
      'impact-tracker.html': 'Calculate your carbon footprint, track environmental metrics, and get reduction tips.'
    };
    
    return `🆘 **COMPREHENSIVE HELP**\n\n${pageHelp[currentPage] ? `📍 **Current Page Help**: ${pageHelp[currentPage]}\n\n` : ''}🎯 **I can help you with**:\n\n🌍 **Environmental Topics**: Climate change, sustainability, renewable energy\n🎮 **EcoQuest Features**: Points, badges, challenges, quizzes, simulator\n📊 **Progress Tracking**: Your stats, next goals, recommendations\n🏫 **School Features**: Competitions, team challenges, rankings\n🧭 **Navigation**: How to use each feature and page\n\n💬 **Ask me anything specific!** Examples:\n• "How do I earn more points?"\n• "What is climate change?"\n• "How do challenges work?"\n• "What's my next badge?"\n\n🚀 **Quick Start**: Try asking "getting started" or "features overview"!`;
  }

  generateSmartFallback(message, user, currentPage) {
    // Analyze the message for keywords and provide contextual suggestions
    const keywords = message.toLowerCase().split(' ');
    const suggestions = [];
    
    // Check for partial matches in knowledge base
    for (const category of Object.keys(this.knowledgeBase)) {
      for (const item of Object.keys(this.knowledgeBase[category])) {
        if (keywords.some(keyword => item.includes(keyword) || keyword.includes(item.split(' ')[0]))) {
          suggestions.push(`Ask about "${item}"`);
        }
      }
    }
    
    const contextualFacts = [
      `🌳 Did you know? Forests absorb 2.6 billion tons of CO₂ annually - try our Eco Simulator to build your own forest!`,
      `♻️ Fun fact: Recycling one aluminum can saves enough energy to power a TV for 3 hours! Check out our recycling challenges!`,
      `💡 Energy tip: LED bulbs use 75% less energy than traditional bulbs! Visit our Impact Tracker to calculate savings!`,
      `🌊 Ocean fact: Our oceans absorb 25% of all CO₂ emissions! Learn more in our Story Mode adventure!`,
      `🌱 Green tip: One tree absorbs 48 lbs of CO₂ per year! Join our tree planting challenges!`
    ];
    
    let response = `🤔 I'd love to help you with that! Here's what I found:\n\n${this.getRandomResponse(contextualFacts)}`;
    
    if (suggestions.length > 0) {
      response += `\n\n💡 **You might be interested in**:\n${suggestions.slice(0, 3).map(s => `• ${s}`).join('\n')}`;
    }
    
    response += `\n\n🎯 **Popular questions**:\n• "How do I earn points?"\n• "What are the challenges?"\n• "Tell me about climate change"\n• "How do I get started?"\n\n💬 **Ask me anything specific about EcoQuest or environmental topics!**`;
    
    return response;
  }

  getNextBadge(points) {
    if (points < 100) return `${100 - points} points until Silver badge!`;
    if (points < 250) return `${250 - points} points until Gold badge!`;
    if (points < 400) return `${400 - points} points until Platinum badge!`;
    if (points < 500) return `${500 - points} points until Certificate eligibility!`;
    return 'All major milestones achieved! Keep earning for special badges!';
  }

  getPersonalizedRecommendations(user) {
    const points = user.points || 0;
    const recommendations = [];
    
    if (points < 50) {
      recommendations.push('• Take a few quizzes to build your foundation (+5 each)');
    }
    if (points < 100) {
      recommendations.push('• Complete your first challenge for a big point boost (+50)');
    }
    if (!user.school) {
      recommendations.push('• Add your school to join competitions');
    }
    if (points >= 100 && points < 250) {
      recommendations.push('• Try the Eco Simulator for steady point earning');
    }
    if (points >= 250) {
      recommendations.push('• Focus on challenges and help others in Social Hub');
    }
    
    return recommendations.length > 0 ? recommendations.join('\n') : '• Keep up the great work! Try exploring new features.';
  }

  matchesPattern(message, keywords) {
    return keywords.some(keyword => message.includes(keyword));
  }

  getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
  }

  loadUserContext() {
    if (window.Eco && window.Eco.getAuthedUser) {
      this.userContext = window.Eco.getAuthedUser() || {};
    }
  }
}

// Initialize chatbot immediately
function initializeChatbot() {
  try {
    if (!window.ecoChatbot) {
      window.ecoChatbot = new EcoChatbot();
      console.log('EcoBot initialized successfully!');
    }
  } catch (error) {
    console.error('EcoBot initialization error:', error);
    // Retry after a short delay
    setTimeout(initializeChatbot, 1000);
  }
}

// Multiple initialization attempts for reliability
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeChatbot);
} else {
  initializeChatbot();
}

// Backup initialization
setTimeout(initializeChatbot, 500);
