import adminUserService from '../../services/admin/user.admin.service.js';

const getAllUsersAdmin = async (req, res, next) => {
    try {
        const users = await adminUserService.getAllUsersAdmin();
        res.json(users);
    } catch (error) {
        next(error);
    }
};

export default {
    getAllUsersAdmin,
};
