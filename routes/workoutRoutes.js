const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController');
const { requireLogin } = require('../middlewares/authMiddleware');

router.get('/', requireLogin, workoutController.listWorkouts);
router.get('/workouts/new', requireLogin, workoutController.showNewForm);
router.post('/workouts', requireLogin, workoutController.createWorkout);
router.get('/workouts/:id/edit', requireLogin, workoutController.showEditForm);
router.put('/workouts/:id', requireLogin, workoutController.updateWorkout);
router.delete('/workouts/:id', requireLogin, workoutController.deleteWorkout);



// Tüm antrenmanları listele
router.get('/', workoutController.listWorkouts);

// Yeni antrenman formunu göster
router.get('/workouts/new', workoutController.showNewForm);

// Yeni antrenman oluştur
router.post('/workouts', workoutController.createWorkout);

// Antrenman düzenleme formu
router.get('/workouts/:id/edit', workoutController.showEditForm);

// Antrenmanı güncelle
router.put('/workouts/:id', workoutController.updateWorkout);

// Antrenmanı sil
router.delete('/workouts/:id', workoutController.deleteWorkout);

module.exports = router;
