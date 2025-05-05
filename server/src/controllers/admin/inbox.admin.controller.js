// backend/src/controllers/admin/inbox.admin.controller.js
import inboxAdminService from '../../services/admin/inbox.admin.service.js';
import AppError from '../../utils/AppError.js';

// Keep existing sendMessageToUser
const sendMessageToUser = async (req, res, next) => {
    const { subject, body } = req.body;
    if (!subject || !body || typeof subject !== 'string' || typeof body !== 'string' || subject.trim() === '' || body.trim() === '') {
        return next(new AppError('Subject and body are required and must be non-empty strings.', 400)); // Use next for errors
    }

    try {
        const targetUserId = req.params.userId; // From route like /admin/users/:userId/inbox
        if (!req.user?._id || !req.user?.fullName) {
            return next(new AppError('Admin user information not found in request. Authentication issue?', 401));
        }
        const adminUserInfo = { id: req.user._id, name: req.user.fullName };

        const createdMessage = await inboxAdminService.createInboxMessageForUser(
            adminUserInfo,
            targetUserId,
            subject.trim(),
            body.trim()
        );

        res.status(201).json({ message: 'Message sent successfully.', data: createdMessage });

    } catch (error) {
        next(error);
    }
};

// --- Get All Messages ---
const getAllMessages = async (req, res, next) => {
    try {
        const { page = 1, limit = 15, sortBy = 'createdAt', sortOrder = 'desc', userId, read } = req.query;

        // Convert 'read' query string ('true'/'false') to boolean or null
        let readStatus = null;
        if (read === 'true') readStatus = true;
        else if (read === 'false') readStatus = false;

        const paginationOptions = {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            sortBy,
            sortOrder,
            userId: userId || null, // Pass userId if provided
            readStatus: readStatus // Pass readStatus if provided
        };

        const result = await inboxAdminService.getAllMessages(paginationOptions);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

// --- NEW: Update Message ---
const updateMessageById = async (req, res, next) => {
    const { messageId } = req.params;
    const { subject, body } = req.body;

    // Basic validation
    if (!subject || !body || typeof subject !== 'string' || typeof body !== 'string' || subject.trim() === '' || body.trim() === '') {
        return next(new AppError('Subject and body are required and must be non-empty strings.', 400));
    }

    try {
        const updatedMessage = await inboxAdminService.updateMessageById(
            messageId,
            subject.trim(),
            body.trim()
        );
        res.status(200).json({ message: 'Message updated successfully.', data: updatedMessage });
    } catch (error) {
        next(error);
    }
};


// --- Delete Message ---
const deleteMessageById = async (req, res, next) => {
    try {
        const messageId = req.params.messageId;
        const result = await inboxAdminService.deleteMessageById(messageId);
        res.status(200).json(result); // Or 204 No Content if preferred
    } catch (error) {
        next(error);
    }
};


export default {
    sendMessageToUser, // Keep existing
    getAllMessages,
    updateMessageById, // <-- ADD NEW
    deleteMessageById,
};