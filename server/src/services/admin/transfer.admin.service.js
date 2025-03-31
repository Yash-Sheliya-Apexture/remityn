// backend/src/services/admin/transfer.admin.service.js
import Transfer from '../../models/Transfer.js';
import mongoose from 'mongoose';

const ALLOWED_STATUS_UPDATES = ['processing', 'completed', 'failed', 'canceled']; // Statuses admin can set

// Service to get all transfers for admin view
const getAllTransfersAdmin = async (filters = {}) => {
    console.log("Service: getAllTransfersAdmin - Filters:", filters);
    const query = {};
    if (filters.status && ['pending', 'processing', 'completed', 'failed', 'canceled'].includes(filters.status)) {
        query.status = filters.status;
    }
    // Add more filters later (user, date range, etc.)

    try {
        // Populate related data for admin display
        const transfers = await Transfer.find(query)
            .populate('user', 'fullName email') // Get user's name/email
            .populate({ // Get recipient details
                path: 'recipient',
                select: 'accountHolderName nickname accountNumber bankName', // Select specific fields
                 populate: { path: 'currency', select: 'code' } // And recipient currency
            })
            .populate('sendCurrency', 'code') // Send currency code
            .populate('receiveCurrency', 'code') // Receive currency code
            .sort({ createdAt: -1 }); // Show newest first
            // TODO: Add pagination ( .limit(limit).skip(skip) )

        console.log(`Service: getAllTransfersAdmin - Found ${transfers.length} transfers.`);
        return transfers;
    } catch (error) {
         console.error("Service: getAllTransfersAdmin - Error fetching transfers:", error);
         throw new Error("Failed to fetch transfers for admin.");
    }
};

// Service to get a single transfer by ID for admin view
const getTransferByIdAdmin = async (transferId) => {
    console.log(`Service: getTransferByIdAdmin - Fetching transfer with ID: ${transferId}`); // <--- LOG 1: ID received

    if (!mongoose.Types.ObjectId.isValid(transferId)) {
        console.log(`Service: getTransferByIdAdmin - Invalid transfer ID format: ${transferId}`); // <--- LOG 2: Invalid ID format
        throw new Error('Invalid transfer ID format.');
    }
    try {
        console.log(`Service: getTransferByIdAdmin - Attempting to find transfer in DB with ID: ${transferId}`); // <--- LOG 3: Before DB query
        const transfer = await Transfer.findById(transferId)
            .populate('user', 'fullName email role') // Include role maybe
            .populate({ path: 'sourceAccount', select: 'balance currency', populate: { path: 'currency', select: 'code' } })
            .populate({ path: 'recipient', populate: { path: 'currency', select: 'code' } }) // Populate full recipient + currency
            .populate('sendCurrency', 'code flagImage') // <---- ADD this line to populate sendCurrency with code and flagImage
            .populate('receiveCurrency', 'code flagImage'); // <---- ADD this line to populate receiveCurrency with code and flagImage
        console.log(`Service: getTransferByIdAdmin - DB Query Result for ID ${transferId}:`, transfer); // <--- LOG 4: After DB query

        if (!transfer) {
            console.log(`Service: getTransferByIdAdmin - Transfer ${transferId} not found in DB.`); // <--- LOG 5: Not found in DB
            throw new Error('Transfer not found.');
        }
        console.log(`Service: getTransferByIdAdmin - Transfer ${transferId} found and fetched.`); // <--- LOG 6: Successfully found
        return transfer;
    } catch (error) {
         console.error(`Service: getTransferByIdAdmin - Error fetching transfer ${transferId}:`, error);
         throw new Error("Failed to fetch transfer details for admin.");
    }
};

// Service to update the status of a transfer by admin
const updateTransferStatusAdmin = async (transferId, newStatus, failureReason = null) => {
    console.log(`Service: updateTransferStatusAdmin - Updating ${transferId} to status '${newStatus}'`);
    if (!mongoose.Types.ObjectId.isValid(transferId)) {
        throw new Error('Invalid transfer ID format.');
    }

    // 1. Validate the new status
    if (!ALLOWED_STATUS_UPDATES.includes(newStatus)) {
        console.error(`Service: updateTransferStatusAdmin - Invalid target status: ${newStatus}`);
        throw new Error(`Invalid status update value. Allowed values are: ${ALLOWED_STATUS_UPDATES.join(', ')}`);
    }

    try {
        // 2. Find the transfer
        const transfer = await Transfer.findById(transferId);
        if (!transfer) {
            console.error(`Service: updateTransferStatusAdmin - Transfer ${transferId} not found.`);
            throw new Error('Transfer not found.');
        }

        // 3. Check if update is allowed (e.g., don't update already completed/failed)
        if (['completed', 'failed', 'canceled'].includes(transfer.status)) {
            console.warn(`Service: updateTransferStatusAdmin - Attempted to update terminal status for transfer ${transferId}. Current: ${transfer.status}`);
            throw new Error(`Cannot update status for a transfer that is already ${transfer.status}.`);
        }

        // 4. (Optional but Recommended) Check if it's moving *from* pending
        const wasPending = transfer.status === 'pending';

        // 5. Update status and potentially failure reason
        transfer.status = newStatus;
        transfer.updatedAt = new Date();
        if ((newStatus === 'failed' || newStatus === 'canceled') && failureReason) {
            transfer.failureReason = failureReason;
        } else {
             transfer.failureReason = undefined; // Clear reason if status is not failed/canceled
        }


        // 6. *** Trigger External Payout Here (if applicable) ***
        // If the status is changing FROM 'pending' TO 'processing' or 'completed',
        // this is where you might initiate the actual money movement via an external API.
        if (wasPending && (newStatus === 'processing' || newStatus === 'completed')) {
            console.log(`Service: updateTransferStatusAdmin - TODO: Trigger external payout for transfer ${transferId} as status moved from pending.`);
            // try {
            //    const payoutResult = await externalPayoutService.initiate(transfer);
            //    if (!payoutResult.success) {
            //        transfer.status = 'failed'; // Revert to failed if payout initiation fails
            //        transfer.failureReason = payoutResult.message || 'External payout initiation failed.';
            //    } else {
            //         transfer.transactionId = payoutResult.externalId; // Store external ID if available
            //         // Keep status as 'processing' or 'completed' based on payoutResult
            //    }
            // } catch (payoutError) {
            //     console.error(`Service: updateTransferStatusAdmin - Error during external payout initiation for ${transferId}:`, payoutError);
            //     transfer.status = 'failed';
            //     transfer.failureReason = 'External payout system error.';
            // }
        }
        // *****************************************************

        // 7. Save the updated transfer
        await transfer.save(); // Note: This save is outside the original transaction, which is correct here.
        console.log(`Service: updateTransferStatusAdmin - Transfer ${transferId} status updated successfully to '${newStatus}'.`);

        // 8. Return the updated and populated transfer
        // Use the other service function to ensure consistent population
        return await getTransferByIdAdmin(transferId);

    } catch (error) {
         console.error(`Service: updateTransferStatusAdmin - Error updating transfer ${transferId}:`, error);
         // Re-throw specific known errors, otherwise throw generic
         if (error.message.includes('Invalid status') || error.message.includes('Transfer not found') || error.message.includes('Cannot update status')) {
             throw error;
         }
         throw new Error("Failed to update transfer status.");
    }
};


export default {
    getAllTransfersAdmin,
    getTransferByIdAdmin,
    updateTransferStatusAdmin,
};