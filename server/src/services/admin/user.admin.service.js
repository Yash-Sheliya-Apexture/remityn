import User from '../../models/User.js';

const getAllUsersAdmin = async () => {
    try {
        return await User.find().select('-password'); // Exclude password field from admin user list for security
    } catch (error) {
        // Log the error for debugging and monitoring - important for production
        console.error("Error in getAllUsersAdmin service:", error);
        throw new Error("Failed to fetch users for admin."); // Re-throw a generic error for controller to handle
    }
};

export default {
    getAllUsersAdmin,
};