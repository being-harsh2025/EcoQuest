// EcoQuest API Integration Layer
// This file handles all API communications with the backend

class EcoQuestAPI {
  constructor() {
    this.baseURL = window.location.origin;
    this.token = localStorage.getItem('ecoquest_token');
  }

  // Helper method to make authenticated requests
  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseURL}/api${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Authentication methods
  async register(userData) {
    const response = await this.makeRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });

    if (response.token) {
      this.token = response.token;
      localStorage.setItem('ecoquest_token', response.token);
    }

    return response;
  }

  async login(credentials) {
    const response = await this.makeRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });

    if (response.token) {
      this.token = response.token;
      localStorage.setItem('ecoquest_token', response.token);
    }

    return response;
  }

  logout() {
    this.token = null;
    localStorage.removeItem('ecoquest_token');
  }

  // User profile methods
  async getProfile() {
    return await this.makeRequest('/user/profile');
  }

  async updateProfile(profileData) {
    return await this.makeRequest('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
  }

  // Points and badges
  async awardPoints(points, reason) {
    return await this.makeRequest('/user/award-points', {
      method: 'POST',
      body: JSON.stringify({ points, reason })
    });
  }

  // Quiz methods
  async getQuizQuestions() {
    return await this.makeRequest('/quiz/questions');
  }

  async submitQuiz(quizData) {
    return await this.makeRequest('/quiz/submit', {
      method: 'POST',
      body: JSON.stringify(quizData)
    });
  }

  // Leaderboard
  async getLeaderboard() {
    return await this.makeRequest('/leaderboard');
  }

  // Challenges
  async getChallenges() {
    return await this.makeRequest('/challenges');
  }

  async completeChallenge(challengeId, completionData) {
    return await this.makeRequest(`/challenges/${challengeId}/complete`, {
      method: 'POST',
      body: JSON.stringify(completionData)
    });
  }

  // User statistics
  async getUserStats() {
    return await this.makeRequest('/stats/user');
  }

  // Certificate
  async checkCertificate() {
    return await this.makeRequest('/certificate/check');
  }

  // Health check
  async healthCheck() {
    return await this.makeRequest('/health');
  }
}

// Initialize API instance
window.EcoAPI = new EcoQuestAPI();

// Enhanced Eco object with API integration
window.Eco = {
  ...window.Eco, // Preserve existing functionality
  
  // API integration methods
  async syncUserData() {
    try {
      const response = await window.EcoAPI.getProfile();
      if (response.user) {
        // Update local storage with server data
        const users = this.readUsers();
        const userIndex = users.findIndex(u => u.email === response.user.email);
        if (userIndex >= 0) {
          users[userIndex] = {
            ...users[userIndex],
            ...response.user,
            points: response.user.points,
            badges: response.user.badges
          };
          this.writeUsers(users);
        }
      }
    } catch (error) {
      console.warn('Failed to sync user data:', error);
    }
  },

  async submitQuizToServer(answers, score, totalQuestions) {
    try {
      return await window.EcoAPI.submitQuiz({
        answers,
        score,
        totalQuestions
      });
    } catch (error) {
      console.error('Failed to submit quiz to server:', error);
      return null;
    }
  },

  async getServerLeaderboard() {
    try {
      const response = await window.EcoAPI.getLeaderboard();
      return response.leaderboard || [];
    } catch (error) {
      console.error('Failed to fetch server leaderboard:', error);
      return [];
    }
  }
};

// Auto-sync user data when page loads
document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('ecoquest_token');
  if (token) {
    try {
      await window.Eco.syncUserData();
    } catch (error) {
      console.warn('Auto-sync failed:', error);
    }
  }
});