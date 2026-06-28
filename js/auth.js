function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }
}

function initAuth() {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const showRegister = document.getElementById('showRegister');
  const showLogin = document.getElementById('showLogin');
  const loginBox = document.getElementById('loginBox');
  const registerBox = document.getElementById('registerBox');

  if (showRegister && showLogin && loginBox && registerBox) {
    showRegister.addEventListener('click', (e) => {
      e.preventDefault();
      loginBox.style.display = 'none';
      registerBox.style.display = 'block';
    });
    showLogin.addEventListener('click', (e) => {
      e.preventDefault();
      loginBox.style.display = 'block';
      registerBox.style.display = 'none';
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('regName').value;
      const email = document.getElementById('regEmail').value;
      const phone = document.getElementById('regPhone').value;
      const password = document.getElementById('regPassword').value;

      const users = JSON.parse(localStorage.getItem('dps_users') || '[]');
      if (users.find(u => u.email === email)) {
        alert('An account with this email already exists. Please login.');
        return;
      }

      users.push({ name, email, phone, password });
      localStorage.setItem('dps_users', JSON.stringify(users));
      localStorage.setItem('dps_logged_in', JSON.stringify({ name, email }));
      alert('Account created successfully! Redirecting to dashboard...');
      window.location.href = 'dashboard.html';
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;

      const users = JSON.parse(localStorage.getItem('dps_users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        localStorage.setItem('dps_logged_in', JSON.stringify({ name: user.name, email: user.email }));
        alert('Login successful! Redirecting to dashboard...');
        window.location.href = 'dashboard.html';
      } else {
        alert('Invalid email or password. Please try again or create a new account.');
      }
    });
  }

  const dashName = document.getElementById('dashName');
  const dashUserEmail = document.getElementById('dashUserEmail');
  const logoutBtn = document.getElementById('logoutBtn');

  const loggedIn = JSON.parse(localStorage.getItem('dps_logged_in'));
  if (dashName && loggedIn) {
    dashName.textContent = loggedIn.name;
  }
  if (dashUserEmail && loggedIn) {
    dashUserEmail.textContent = loggedIn.email;
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('dps_logged_in');
      alert('Logged out successfully.');
      window.location.href = 'index.html';
    });
  }

  if (!loggedIn && window.location.pathname.includes('dashboard.html')) {
    alert('Please login to access the dashboard.');
    window.location.href = 'login.html';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initAuth();
});
