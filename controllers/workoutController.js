const workoutModel = require('../models/workoutModel');
const dayjs = require('dayjs');

// Tüm antrenmanları listeleme (sadece kullanıcıya ait olanlar)
async function listWorkouts(req, res) {
  const workouts = await workoutModel.getAllWorkoutsForUser(req.session.userId);
  const workoutCount = workouts.length;

  // 🆕 Haftalık özet verisi hazırla
  const today = dayjs();
  const summary = {};

  for (let i = 0; i < 7; i++) {
    const day = today.subtract(i, 'day').format('YYYY-MM-DD');
    summary[day] = 0;
  }

  workouts.forEach(w => {
    const date = dayjs(w.createdAt).format('YYYY-MM-DD');
    if (summary[date] !== undefined) {
      summary[date]++;
    }
  });

  const weeklySummary = Object.entries(summary).reverse(); // eski → yeni

  res.render('index', {
    title: 'Treningi',
    workouts,
    workoutCount,
    weeklySummary
  });
}

// Yeni antrenman formunu gösterme
function showNewForm(req, res) {
  res.render('new', { title: 'Nowy trening' });
}

// Yeni antrenman ekleme (kullanıcıya ait)
async function createWorkout(req, res) {
  await workoutModel.createWorkout(req.body, req.session.userId);
  res.redirect('/');
}

// Antrenman düzenleme formunu gösterme
async function showEditForm(req, res) {
  const workout = await workoutModel.getWorkoutById(req.params.id);

  if (!workout || workout.userId !== req.session.userId) {
    return res.status(403).send("Nie masz uprawnień do edycji tego treningu.");
  }

  res.render('edit', { title: 'Edytuj trening', workout });
}

// Antrenmanı güncelleme
async function updateWorkout(req, res) {
  const workout = await workoutModel.getWorkoutById(req.params.id);
  if (!workout || workout.userId !== req.session.userId) {
    return res.status(403).send("Nie masz uprawnień do aktualizacji tego treningu.");
  }

  await workoutModel.updateWorkout(req.params.id, req.body);
  res.redirect('/');
}

// Antrenmanı silme
async function deleteWorkout(req, res) {
  const workout = await workoutModel.getWorkoutById(req.params.id);
  if (!workout || workout.userId !== req.session.userId) {
    return res.status(403).send("Nie masz uprawnień do usunięcia tego treningu.");
  }

  await workoutModel.deleteWorkout(req.params.id);
  res.redirect('/');
}

module.exports = {
  listWorkouts,
  showNewForm,
  createWorkout,
  showEditForm,
  updateWorkout,
  deleteWorkout
};
