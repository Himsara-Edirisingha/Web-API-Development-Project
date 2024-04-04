const userService = require('../services/userService');

const getUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json({ message: "User data retrieved successfully", data: users });
    } catch (err) {
        res.status(500).send({ error: "Server error" });
    }
};

const createUser = async (req, res) => {
    
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json({ message: "User created successfully", data: user });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const getUserByUsernamePassword = async (req, res) => {
    const { username, password } = req.params;
    try {
        const user = await userService.getUserByUsernamePassword(username, password);
        if (!user) {
            res.status(404).send({ error: "User not found" });
        } else {
            res.status(200).send({ message: "User found", data: user });
        }
    } catch (err) {
        res.status(500).send({ error: "Server error" });
    }
};

const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const deletedUser = await userService.deleteUserById(userId);
        if (deletedUser) {
            res.status(200).send({ message: "User deleted successfully", user: deletedUser });
        } else {
            res.status(404).send({ error: "User not found" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ error: "Server error" });
    }
};

const updateUser = async (req, res) => {
    const userId = req.params.id;
    const updatedData = req.body;
    try {
        const updatedUser = await userService.updateUserById(userId, updatedData);
        if (updatedUser) {
            res.status(200).send({ message: "User updated successfully", user: updatedUser });
        } else {
            res.status(404).send({ error: "User not found" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ error: "Server error" });
    }
};

module.exports = {
    getUsers,
    createUser,
    getUserByUsernamePassword,
    deleteUser,
    updateUser,
};