import adminUserService from '../../services/admin/user.admin.service.js';

const getAllUsersAdmin = async (req, res, next) => { // Add 'next' for error handling
    try {
        const users = await adminUserService.getAllUsersAdmin();
        res.json(users);
    } catch (error) {
        next(error); // Pass errors to error handling middleware
    }
};

export default {
    getAllUsersAdmin,
};