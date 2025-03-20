import User from '../models/User.js';

const getAllUsers = async () => {
    try {
        return await User.find().select('-password'); // Exclude password field when fetching users
    } catch (error) {
        console.error("Error in getAllUsers service:", error);
        throw new Error("Failed to fetch users.");
    }
};

const getUserById = async (userId) => {
    try {
        const user = await User.findById(userId).select('-password'); // Exclude password field
        if (!user) {
            return null; // Or throw a NotFoundError if you have custom errors
        }
        return user;
    } catch (error) {
        console.error("Error in getUserById service:", error);
        throw new Error("Failed to fetch user.");
    }
};

export default {
    getAllUsers,
    getUserById,
};