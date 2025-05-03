// // backend/src/controllers/transfer.controller.js
// import transferService from '../services/transfer.service.js';
// import mongoose from 'mongoose';
// const calculateSendSummary = async (req, res, next) => {
//     try {
//         const userId = req.user._id;
//         const { sourceAccountId, recipientId, amount, isSendingAmount } = req.body;

//         if (!sourceAccountId || !recipientId || amount === undefined || isSendingAmount === undefined) {
//             return res.status(400).json({ message: 'Missing required fields: sourceAccountId, recipientId, amount, isSendingAmount.' });
//         }

//         const summary = await transferService.calculateSendSummary(
//             userId,
//             sourceAccountId,
//             recipientId,
//             amount,
//             Boolean(isSendingAmount)
//         );
//         res.status(200).json(summary);
//     } catch (error) {
//         // Keep existing error handling for calculate summary
//         if (error.message === 'Insufficient balance.') {
//              return res.status(400).json({ message: error.message, code: 'INSUFFICIENT_BALANCE' });
//         }
//          if (error.message.startsWith('Cannot determine exchange rate') || error.message.startsWith('Could not retrieve current exchange rates')) {
//              return res.status(503).json({ message: 'Service unavailable: Could not determine exchange rate. Please try again later.' });
//          }
//          if (error.message.includes('not found') || error.message.includes('access denied') || error.message.includes('Invalid ID format') ) {
//             // Handle specific data access/validation errors from service
//             return res.status(404).json({ message: error.message }); // Use 404 for not found/access issues
//          }
//         next(error); // Pass other errors to generic handler
//     }
// };

// const executeTransfer = async (req, res, next) => {
//     try {
//         const userId = req.user._id;
//         // Get transfer details from request body, add user ID
//         const transferDetails = { ...req.body, userId };

//          // --- MODIFIED VALIDATION ---
//          // Define required fields *excluding* fees and estimatedArrival
//          const requiredFields = [
//              'sourceAccountId', 'recipientId', 'sendAmount', 'receiveAmount',
//              'exchangeRate', 'sendCurrencyCode', 'receiveCurrencyCode'
//             ];
//          // Check if all required fields are present (allowing 0 for amounts)
//          for (const field of requiredFields) {
//              if (transferDetails[field] === undefined || transferDetails[field] === null || (typeof transferDetails[field] === 'string' && !transferDetails[field].trim())) {
//                 // Handle edge case: allow sendAmount/receiveAmount to be 0 if necessary, though usually they should be > 0 for a transfer
//                 if((field === 'sendAmount' || field === 'receiveAmount') && transferDetails[field] === 0) {
//                     continue; // Allow 0 amount if your business logic permits (unlikely for transfer)
//                 }
//                  console.error(`Controller executeTransfer validation failed: Missing field '${field}'`);
//                  return res.status(400).json({ message: `Missing required field in transfer details: ${field}` });
//              }
//          }
//          // --- END MODIFIED VALIDATION ---

//         // Call the service to execute the transfer
//         const transfer = await transferService.executeTransfer(transferDetails);
//         // Respond with the created transfer record
//         res.status(201).json(transfer);

//     } catch (error) {
//          // Handle specific errors from the service
//          if (error.message === 'Insufficient balance.') {
//              return res.status(400).json({ message: error.message, code: 'INSUFFICIENT_BALANCE' });
//          }
//          if (error.message.includes('not found') || error.message.includes('access denied') || error.message.includes('mismatch')) {
//             return res.status(400).json({ message: error.message }); // Use 400 for data/validation issues during execution
//          }
//         // Pass other errors to the generic error handler
//         next(error);
//     }
// };

// const getTransferDetails = async (req, res, next) => {
//      try {
//         const userId = req.user._id;
//         const { transferId } = req.params;
//         const transfer = await transferService.getTransferDetails(transferId, userId);
//          res.status(200).json(transfer);
//     } catch (error) {
//         if (error.message.startsWith('Transfer not found') || error.message.includes('Invalid transfer ID')) {
//              return res.status(404).json({ message: error.message });
//          }
//         next(error);
//     }
// };

// const getUserTransfers = async (req, res, next) => {
//      try {
//         const userId = req.user._id;
//         const transfers = await transferService.getUserTransfers(userId);
//          res.status(200).json(transfers);
//     } catch (error) {
//         next(error);
//     }
// };

// // --- START FIX ---
// const cancelTransfer = async (req, res, next) => {
//     try {
//         const userId = req.user._id;
//         const { transferId } = req.params;

//         // Basic validation
//         if (!transferId || !mongoose.Types.ObjectId.isValid(transferId)) {
//             return res.status(400).json({ message: 'Invalid or missing Transfer ID.' });
//         }

//         const result = await transferService.cancelTransfer(transferId, userId);

//         // Respond with success message and potentially the updated transfer
//         res.status(200).json({ message: 'Transfer cancelled successfully.', transfer: result });

//     } catch (error) {
//         // Handle specific errors from the service
//         if (error.message.includes('not found') || error.message.includes('access denied')) {
//             return res.status(404).json({ message: error.message });
//         }
//         if (error.message.includes('Cannot cancel transfer')) {
//             // Use 400 Bad Request or 409 Conflict if the state prevents cancellation
//             return res.status(400).json({ message: error.message });
//         }
//          if (error.message.includes('Invalid transfer ID format')) {
//              return res.status(400).json({ message: error.message });
//          }
//          if (error.message.includes('Failed to cancel transfer')) {
//             // Internal error during cancellation logic (e.g., refund failed)
//             return res.status(500).json({ message: error.message });
//          }
//         // Pass other errors to the generic error handler
//         next(error);
//     }
// };
// // --- END FIX ---


// export default {
//     calculateSendSummary,
//     executeTransfer,
//     getTransferDetails,
//     getUserTransfers,
//     cancelTransfer,
// };


// backend/src/controllers/transfer.controller.js
import transferService from '../services/transfer.service.js';
import mongoose from 'mongoose';

// calculateSendSummary (no change needed here for ID passing)
const calculateSendSummary = async (req, res, next) => {
    try {
        const userId = req.user._id; // From authMiddleware
        const { sourceAccountId, recipientId, amount, isSendingAmount } = req.body;

        if (!sourceAccountId || !recipientId || amount === undefined || isSendingAmount === undefined) {
            return res.status(400).json({ message: 'Missing required fields: sourceAccountId, recipientId, amount, isSendingAmount.' });
        }
        if (isNaN(amount) || Number(amount) <= 0) {
             return res.status(400).json({ message: 'Invalid amount specified. Must be a positive number.' });
        }

        const summary = await transferService.calculateSendSummary(
            userId,
            sourceAccountId,
            recipientId,
            Number(amount),
            Boolean(isSendingAmount)
        );
        res.status(200).json(summary);
    } catch (error) {
        if (error.message === 'Insufficient balance.') {
             return res.status(400).json({ message: error.message, code: 'INSUFFICIENT_BALANCE' });
        }
         if (error.message.startsWith('Cannot determine exchange rate') || error.message.startsWith('Could not retrieve current exchange rates') || error.message.startsWith('Live exchange rate is currently unavailable') || error.message.includes('Could not load currency details')) {
             return res.status(503).json({ message: 'Service unavailable: Could not determine rates or currency details. Please try again later.' });
         }
         if (error.message.includes('not found') || error.message.includes('access denied') || error.message.includes('Invalid ID format') ) {
            return res.status(404).json({ message: error.message });
         }
         if (error.message.includes('Invalid amount')) {
             return res.status(400).json({ message: error.message });
         }
        next(error);
    }
};

// executeTransfer (no change needed here for ID passing)
const executeTransfer = async (req, res, next) => {
    try {
        const userId = req.user._id; // From authMiddleware
        const transferDetails = { ...req.body, userId };

        const transfer = await transferService.executeTransfer(transferDetails);
        res.status(201).json(transfer);

    } catch (error) {
         if (error.message === 'Insufficient balance.') {
             return res.status(400).json({ message: error.message, code: 'INSUFFICIENT_BALANCE' });
         }
         if (error.message.includes('not found') || error.message.includes('access denied') || error.message.includes('mismatch') || error.message.includes('Invalid amount') || error.message.includes('Missing essential')) {
            return res.status(400).json({ message: error.message });
         }
        next(error);
    }
};

// --- *** MODIFIED getTransferDetails Controller *** ---
const getTransferDetails = async (req, res, next) => {
     try {
        const userId = req.user._id; // Get userId from authenticated user
        const { transferId } = req.params;

        // --- Pass userId to the service ---
        const transfer = await transferService.getTransferDetails(transferId, userId);

        // Service now throws specific errors (e.g., 'Transfer not found or access denied.')
        res.status(200).json(transfer);

    } catch (error) {
        // Handle errors thrown by the service
        if (error.message.includes('Transfer not found') || error.message.includes('access denied')) {
             return res.status(404).json({ message: error.message }); // 404 is appropriate
         }
         if (error.message.includes('Invalid transfer ID format') || error.message.includes('User authentication information is missing')) {
              return res.status(400).json({ message: error.message }); // Bad Request
         }
        // Pass other unexpected errors
        next(error);
    }
};
// --- *** END MODIFIED getTransferDetails Controller *** ---

// getUserTransfers (no change needed here for ID passing)
const getUserTransfers = async (req, res, next) => {
     try {
        const userId = req.user._id; // From authMiddleware
        const transfers = await transferService.getUserTransfers(userId);
         res.status(200).json(transfers);
    } catch (error) {
         // Handle potential errors from service like DB issues
         if (error.message.includes('Failed to retrieve transfer history')) {
             return res.status(500).json({ message: error.message });
         }
         if (error.message.includes('Invalid user ID format')) {
            return res.status(400).json({ message: error.message });
         }
        next(error);
    }
};

// cancelTransfer (no change needed here for ID passing)
const cancelTransfer = async (req, res, next) => {
    try {
        const userId = req.user._id; // From authMiddleware
        const { transferId } = req.params;

        if (!transferId || !mongoose.Types.ObjectId.isValid(transferId)) {
            return res.status(400).json({ message: 'Invalid or missing Transfer ID.' });
        }

        const result = await transferService.cancelTransfer(transferId, userId);

        res.status(200).json({ message: 'Transfer cancelled successfully.', transfer: result });

    } catch (error) {
        if (error.message.includes('not found') || error.message.includes('access denied')) {
            return res.status(404).json({ message: error.message });
        }
        if (error.message.includes('Status must be pending')) {
            return res.status(400).json({ message: error.message });
        }
        if (error.message.includes('Invalid transfer or user ID format')) {
             return res.status(400).json({ message: error.message });
         }
        if (error.message.includes('Failed to cancel transfer') || error.message.includes('Source account data inconsistency')) {
            return res.status(500).json({ message: 'An unexpected error occurred while cancelling the transfer.' });
         }
        next(error);
    }
};


export default {
    calculateSendSummary,
    executeTransfer,
    getTransferDetails,
    getUserTransfers,
    cancelTransfer,
};