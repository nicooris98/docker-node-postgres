const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sequelize = require('../config/db');

const register = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { username, email, password } = req.body;

    const user = await User.create({ username, email, password }, { transaction });
    
    await transaction.commit();
    res.status(201).send({ user });
  } catch (error) {
    await transaction.rollback();
    console.error('Error al crear usuario:', error);
    res.status(400).send({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).send({ error: 'Credenciales inválidas' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).send({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.send({ user, token });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = { register, login };