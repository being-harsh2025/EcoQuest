// EcoQuest - pure JS localStorage app core
(function() {
  const STORAGE_KEYS = {
    users: 'eco_users',
    currentUserEmail: 'eco_current_email'
  };

  const RULES = {
    quizCorrect: 5,
    taskComplete: 50,
    dailyLogin: 2,
    silverThreshold: 100,
    goldThreshold: 250,
    platinumThreshold: 400,
    certificateThreshold: 500
  };

  function readUsers() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.users) || '[]'); } catch { return []; }
  }
  function writeUsers(users) { localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users)); }
  function getCurrentEmail() { return localStorage.getItem(STORAGE_KEYS.currentUserEmail) || null; }
  function setCurrentEmail(email) { if (email) localStorage.setItem(STORAGE_KEYS.currentUserEmail, email); else localStorage.removeItem(STORAGE_KEYS.currentUserEmail); }

  function findUser(email) { return readUsers().find(u => u.email === email) || null; }
  function upsertUser(user) {
    const users = readUsers();
    const idx = users.findIndex(u => u.email === user.email);
    if (idx >= 0) users[idx] = user; else users.push(user);
    writeUsers(users);
  }

  function ensureUserShape(user) {
    return Object.assign({
      email: '',
      name: '',
      school: '',
      password: '',
      avatarDataUrl: '',
      points: 0,
      badges: [],
      tasksCompleted: {},
      lastLoginDate: '',
      quizHistory: [],
      createdAt: ''
    }, user || {});
  }

  function todayStr() { return new Date().toISOString().slice(0,10); }

  function grantDailyLoginIfEligible(user) {
    const today = todayStr();
    if (user.lastLoginDate !== today) {
      user.points += RULES.dailyLogin;
      user.lastLoginDate = today;
      upsertUser(user);
      return true;
    }
    return false;
  }

  function recomputeBadges(user) {
    const badges = new Set(user.badges || []);
    if (user.points >= RULES.silverThreshold) badges.add('Silver');
    if (user.points >= RULES.goldThreshold) badges.add('Gold');
    if (user.points >= RULES.platinumThreshold) badges.add('Platinum');
    user.badges = Array.from(badges);
    upsertUser(user);
  }

  function awardPoints(user, amount, reason) {
    user.points += amount;
    if (reason) user.quizHistory.push({ reason, amount, at: new Date().toISOString() });
    recomputeBadges(user);
    upsertUser(user);
  }

  function signOut() { setCurrentEmail(null); window.location.href = 'index.html'; }

  function requireAuth() {
    const email = getCurrentEmail();
    if (!email || !findUser(email)) {
      window.location.href = 'login.html?redirect=' + encodeURIComponent(location.pathname.split('/').pop() || 'index.html');
      return null;
    }
    return ensureUserShape(findUser(email));
  }

  function getAuthedUser() {
    const email = getCurrentEmail();
    if (!email) return null;
    return ensureUserShape(findUser(email));
  }

  function initialsAvatar(name) {
    const initials = (name || 'Eco User').split(/\s+/).slice(0,2).map(s=>s[0]?.toUpperCase()||'E').join('');
    const canvas = document.createElement('canvas');
    canvas.width = 128; canvas.height = 128;
    const ctx = canvas.getContext('2d');
    const colors = ['#22c55e','#16a34a','#059669','#047857','#065f46'];
    const bg = colors[initials.charCodeAt(0)%colors.length];
    ctx.fillStyle = bg; ctx.fillRect(0,0,128,128);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 56px Inter, Arial';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(initials, 64, 72);
    return canvas.toDataURL('image/png');
  }

  function updateNav() {
    const navUser = document.querySelector('#navUser');
    const authBtns = document.querySelector('#authButtons');
    const user = getAuthedUser();
    if (navUser && authBtns) {
      if (user) {
        authBtns.style.display = 'none';
        navUser.style.display = 'flex';
        const img = navUser.querySelector('img');
        const nameEl = navUser.querySelector('span');
        if (img) img.src = user.avatarDataUrl || initialsAvatar(user.name);
        if (nameEl) nameEl.textContent = user.name || user.email;
      } else {
        navUser.style.display = 'none';
        authBtns.style.display = 'flex';
      }
    }
  }

  function navHandlers() {
    const logoutBtn = document.querySelector('#logoutBtn');
    if (logoutBtn) logoutBtn.onclick = signOut;
  }

  function lockGatedSections() {
    const user = getAuthedUser();
    document.querySelectorAll('[data-gated]')
      .forEach(el => { el.classList.toggle('locked', !user); });
  }

  function formatPoints(n) { return (n||0).toLocaleString(); }

  window.Eco = {
    RULES,
    readUsers, writeUsers, findUser, upsertUser,
    getAuthedUser, requireAuth, setCurrentEmail,
    awardPoints, recomputeBadges, grantDailyLoginIfEligible,
    initialsAvatar, updateNav, navHandlers, lockGatedSections,
    formatPoints
  };

  document.addEventListener('DOMContentLoaded', () => {
    updateNav();
    navHandlers();
    lockGatedSections();
  });
})();
