const jwt = require('jsonwebtoken');
const { loginUser, registerUser, getAllUsers } = require('../services/auth.service');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await registerUser(username, email, password);
    res.status(201).send({ user });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    res.send({ user, token });
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
};

const getAllUsersController = async(req, res) => {
  try {
    const users = await getAllUsers()
    res.send(users)
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

module.exports = { register, login, getAllUsersController };