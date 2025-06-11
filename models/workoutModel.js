const fs = require('fs-extra');
const path = require('path');
const filePath = path.join(__dirname, '../data/workouts.json');

async function loadWorkouts() {
  try {
    return await fs.readJson(filePath);
  } catch (err) {
    return [];
  }
}

async function saveWorkouts(workouts) {
  await fs.writeJson(filePath, workouts, { spaces: 2 });
}

async function createWorkout(data, userId) {
  const workouts = await loadWorkouts();
  const id = Date.now(); // benzersiz ID
  const workout = {
    id,
    title: data.title,
    type: data.type,
    duration: data.duration,
    intensity: data.intensity,
    createdAt: new Date().toISOString(), // ✅ Eklenme zamanı
    userId
  };
  workouts.push(workout);
  await saveWorkouts(workouts);
  return workout;
}

async function getAllWorkoutsForUser(userId) {
  const workouts = await loadWorkouts();
  return workouts.filter(w => w.userId === userId);
}

async function getWorkoutById(workoutId) {
  const workouts = await loadWorkouts();
  return workouts.find(w => w.id === parseInt(workoutId));
}

async function updateWorkout(workoutId, newData) {
  const workouts = await loadWorkouts();
  const index = workouts.findIndex(w => w.id === parseInt(workoutId));
  if (index !== -1) {
    workouts[index] = { ...workouts[index], ...newData };
    await saveWorkouts(workouts);
    return workouts[index];
  }
  return null;
}

async function deleteWorkout(workoutId) {
  let workouts = await loadWorkouts();
  workouts = workouts.filter(w => w.id !== parseInt(workoutId));
  await saveWorkouts(workouts);
}

module.exports = {
  createWorkout,
  getAllWorkoutsForUser,
  getWorkoutById,
  updateWorkout,
  deleteWorkout
};
