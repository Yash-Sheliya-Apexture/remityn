// backend/src/services/admin/inbox.admin.service.js
import InboxMessage from '../../models/InboxMessage.js';
import User from '../../models/User.js';
import mongoose from 'mongoose';
import AppError from '../../utils/AppError.js';

/**
 * Admin creates and sends an inbox message to a specific user.
 * (Keep this function as it is)
 */
const createInboxMessageForUser = async (adminSenderInfo, targetUserId, subject, body) => {
    // ... (keep existing implementation)
    if (!mongoose.Types.ObjectId.isValid(targetUserId)) {
        throw new AppError('Invalid target user ID format.', 400);
    }
    if (!subject || !body) {
        throw new AppError('Subject and body are required.', 400);
    }

    try {
        const targetUser = await User.findById(targetUserId).select('_id');
        if (!targetUser) {
            throw new AppError('Target user not found.', 404);
        }

        const newMessage = new InboxMessage({
            userId: targetUserId,
            sender: `Admin (${adminSenderInfo.name || adminSenderInfo.id})`,
            subject: subject,
            body: body,
            isRead: false,
        });

        await newMessage.save();

        console.log(`Admin ${adminSenderInfo.id} sent message to user ${targetUserId}`);
        return newMessage.toObject();

    } catch (error) {
        console.error(`Error sending admin message to user ${targetUserId}:`, error);
        if (error instanceof AppError) throw error;
        if (error.name === 'ValidationError') {
            throw new AppError(`Validation failed: ${error.message}`, 400);
        }
        throw new AppError('Failed to send inbox message.', 500);
    }
};

/**
 * Admin gets all inbox messages across all users with pagination and sorting.
 */
const getAllMessages = async ({ page = 1, limit = 15, sortBy = 'createdAt', sortOrder = 'desc', userId = null, readStatus = null } = {}) => {
    // ... (keep existing implementation)
    const skip = (page - 1) * limit;
    const sortParams = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };
    const query = {};

    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
        query.userId = userId;
    }
    if (readStatus !== null && typeof readStatus === 'boolean') {
        query.isRead = readStatus;
    }

    try {
        const messages = await InboxMessage.find(query)
            .populate('userId', 'fullName email _id') // Populate user details
            .sort(sortParams)
            .skip(skip)
            .limit(limit)
            .lean(); // Use lean for performance

        const totalMessages = await InboxMessage.countDocuments(query);

        return {
            messages,
            currentPage: page,
            totalPages: Math.ceil(totalMessages / limit),
            totalMessages,
        };
    } catch (error) {
        console.error('Error fetching all inbox messages for admin:', error);
        throw new AppError('Failed to retrieve inbox messages.', 500);
    }
};

/**
 * Admin updates a specific message (subject/body) by its ID.
 */
const updateMessageById = async (messageId, subject, body) => {
    if (!mongoose.Types.ObjectId.isValid(messageId)) {
        throw new AppError('Invalid message ID format.', 400);
    }
    if (!subject || !body) {
        throw new AppError('Subject and body are required.', 400);
    }

    try {
        const updatedMessage = await InboxMessage.findByIdAndUpdate(
            messageId,
            { subject, body },
            { new: true, runValidators: true } // Return updated doc, run schema validation
        ).populate('userId', 'fullName email _id').lean(); // Re-populate after update

        if (!updatedMessage) {
            throw new AppError('Message not found or could not be updated.', 404);
        }

        console.log(`Admin updated message ${messageId}`);
        return updatedMessage;

    } catch (error) {
        console.error(`Error updating message ${messageId} by admin:`, error);
        if (error instanceof AppError) throw error;
        if (error.name === 'ValidationError') {
           throw new AppError(`Validation failed: ${error.message}`, 400);
        }
        throw new AppError('Failed to update message.', 500);
    }
};

/**
 * Admin deletes any specific message by its ID.
 */
const deleteMessageById = async (messageId) => {
    // ... (keep existing implementation)
     if (!mongoose.Types.ObjectId.isValid(messageId)) {
        throw new AppError('Invalid message ID format.', 400);
    }

    try {
        const result = await InboxMessage.findByIdAndDelete(messageId);

        if (!result) {
            throw new AppError('Message not found.', 404);
        }

        console.log(`Admin deleted message ${messageId}`);
        return { success: true, message: 'Message deleted successfully by admin.' };
    } catch (error) {
        console.error(`Error deleting message ${messageId} by admin:`, error);
        if (error instanceof AppError) throw error;
        throw new AppError('Failed to delete message.', 500);
    }
};


export default {
    createInboxMessageForUser,
    getAllMessages,
    updateMessageById,     // <-- ADD NEW
    deleteMessageById,
};