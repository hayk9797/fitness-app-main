const fs = require('fs-extra');
const path = require('path');
const filePath = path.join(__dirname, '../data/users.json');

async function loadUsers() {
  try {
    const users = await fs.readJson(filePath);
    return Array.isArray(users) ? users : [];
  } catch {
    return [];
  }
}

async function saveUsers(users) {
  await fs.writeJson(filePath, users, { spaces: 2 });
}

async function createUser(data) {
  const users = await loadUsers();

  // Kullanıcı zaten varsa oluşturma
  const existingUser = users.find(u => u.username === data.username);
  if (existingUser) return null;

  const newUser = {
    id: Date.now(),
    username: data.username,
    password: data.password
  };

  users.push(newUser);
  await saveUsers(users);
  return newUser;
}

async function findUserByUsername(username) {
  const users = await loadUsers();
  return users.find(u => u.username === username);
}

async function findUserById(id) {
  const users = await loadUsers();
  return users.find(u => u.id === id);
}

module.exports = {
  loadUsers, // ✅ EKLENDİ
  saveUsers,
  createUser,
  findUserByUsername,
  findUserById
};
