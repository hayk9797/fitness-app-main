const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');

// Routers
const workoutRoutes = require('./routes/workoutRoutes');
const authRoutes = require('./routes/authRoutes');

// Ayarlar
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// 🔐 Express-session burada aktif hale geliyor
app.use(session({
  secret: 'fitness-secret-key',
  resave: false,
  saveUninitialized: false
}));

// 🔄 currentUser değişkeni tüm sayfalarda erişilebilir
app.use((req, res, next) => {
  res.locals.currentUser = req.session.userId || null;
  next();
});

// Rotalar
app.use(authRoutes);
app.use(workoutRoutes);

// Sunucu başlat
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
