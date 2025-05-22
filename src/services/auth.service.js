const User = require('../models/User');
const jwt = require('jsonwebtoken');
const sequelize = require('../config/db');

const registerUser = async (username, email, password) => {
    const transaction = await sequelize.transaction();
    try {
        const userEmail = await User.findOne({ where: { email } });
        if (userEmail) throw new Error('Ya existe un usuario con ese email');

        const userUsername = await User.findOne({ where: { username } });
        if (userUsername) throw new Error('Ya existe un usuario con ese nombre');

        const user = await User.create({ username, email, password }, { transaction });
        await transaction.commit();
        return user;
    } catch (error) {
        await transaction.rollback();
        throw new Error('Error al registrar usuario: ' + error.message);
    }
}

const loginUser = async (email, password) => {
    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw new Error('Credenciales inválidas');
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new Error('Credenciales inválidas');
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        return { user, token };
    } catch (error) {
        throw new Error('Error en login: ' + error.message);
    }
};

const getAllUsers = async () => {
    try {
        const users = await User.findAll()

        return users
    } catch (error) {
        throw new Error('Error getAllUsers: ' + error.message);
    }
}


module.exports = { loginUser, registerUser, getAllUsers };
