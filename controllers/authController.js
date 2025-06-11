const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

// Kayıt formunu göster
function showRegisterForm(req, res) {
  res.render('register', { title: "Zarejestruj się", error: null });
}

// Giriş formunu göster
function showLoginForm(req, res) {
  res.render('login', { title: "Zaloguj się", error: null });
}

// Yeni kullanıcı oluştur
async function registerUser(req, res) {
  const { username, password } = req.body;

  // 🧠 Şifre güvenlik kontrolü
  const isStrongPassword = password.length >= 6 && /[A-Za-z]/.test(password) && /\d/.test(password);
  if (!isStrongPassword) {
    return res.render('register', {
      title: 'Zarejestruj się',
      error: 'Hasło musi zawierać co najmniej 6 znaków, w tym litery i cyfry.'
    });
  }

  const users = await userModel.loadUsers();
  const existingUser = users.find(u => u.username === username);

  if (existingUser) {
    return res.render('register', {
      title: 'Zarejestruj się',
      error: 'Ta nazwa użytkownika jest już zajęta.'
    });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  await userModel.createUser({ username, password: hashedPassword });
  res.redirect('/login');
}

// Giriş işlemi
async function loginUser(req, res) {
  const { username, password } = req.body;
  const user = await userModel.findUserByUsername(username);

  if (!user) {
    return res.send("Użytkownik nie został znaleziony.");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.send("Nieprawidłowe hasło.");
  }

  req.session.userId = user.id;
  res.redirect('/');
}

// Çıkış işlemi
function logoutUser(req, res) {
  req.session.destroy(() => {
    res.redirect('/login');
  });
}

module.exports = {
  showRegisterForm,
  showLoginForm,
  registerUser,
  loginUser,
  logoutUser
};
