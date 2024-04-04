const User = require('../models/userModel');

const getAllUsers = async () => {
    return await User.find({});
};

const getUserByUsernameAndPassword = async (username, password) => {
    return await User.findOne({ username: username, password: password });
};

const createUser = async (userData) => {
    return await User.create(userData);
};

const deleteUserById = async (userId) => {
    return await User.findByIdAndDelete(userId);
};

const updateUserById = async (userId, updatedData) => {
    return await User.findByIdAndUpdate(userId, updatedData, { new: true });
};

const getByUserName = async (userName) => {
    try {
        return await User.findOne({ username: userName });
    }
    catch (e) {
        return null
    }

};

module.exports = {
    getAllUsers,
    getUserByUsernameAndPassword,
    createUser,
    deleteUserById,
    updateUserById,
    getByUserName
};