import userService from '../services/user.service.js';

const getAllUsers = async (req, res, next) => { // Add 'next' for error handling
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        next(error); // Pass errors to error handling middleware
    }
};

const getUserById = async (req, res, next) => { // Add 'next' for error handling
    try {
        const user = await userService.getUserById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // 404 Not Found if user not found
        }
        res.json(user);
    } catch (error) {
        next(error); // Pass errors to error handling middleware
    }
};

export default {
    getAllUsers,
    getUserById,
};