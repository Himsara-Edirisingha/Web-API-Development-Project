const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt')

const getAllUsers = async () => {
    return await userRepository.getAllUsers();
};

const getUserByUsernamePassword = async (username, password) => {
    return await userRepository.getUserByUsernameAndPassword(username, password);
};

const createUser = async (userData) => {
    const user = userData;
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt)
    return await userRepository.createUser(user);
};

const deleteUserById = async (userId) => {
    return await userRepository.deleteUserById(userId);
};

const updateUserById = async (userId, updatedData) => {
    return await userRepository.updateUserById(userId, updatedData);
};

const authUser = async (username, password) => {
    const user = await userRepository.getByUserName(username);
    if(!user){
        return null;
    }
    if (await bcrypt.compare(password,user.password)) {
        return user;
    }
    return null;
   
};

module.exports = {
    getAllUsers,
    getUserByUsernamePassword,
    createUser,
    deleteUserById,
    updateUserById,
    authUser
};