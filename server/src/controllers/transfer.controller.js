// backend/src/controllers/transfer.controller.js
import transferService from '../services/transfer.service.js';

const calculateSendSummary = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { sourceAccountId, recipientId, amount, isSendingAmount } = req.body;

        if (!sourceAccountId || !recipientId || amount === undefined || isSendingAmount === undefined) {
            return res.status(400).json({ message: 'Missing required fields: sourceAccountId, recipientId, amount, isSendingAmount.' });
        }

        const summary = await transferService.calculateSendSummary(
            userId,
            sourceAccountId,
            recipientId,
            amount,
            Boolean(isSendingAmount)
        );
        res.status(200).json(summary);
    } catch (error) {
        // Keep existing error handling for calculate summary
        if (error.message === 'Insufficient balance.') {
             return res.status(400).json({ message: error.message, code: 'INSUFFICIENT_BALANCE' });
        }
         if (error.message.startsWith('Cannot determine exchange rate') || error.message.startsWith('Could not retrieve current exchange rates')) {
             return res.status(503).json({ message: 'Service unavailable: Could not determine exchange rate. Please try again later.' });
         }
         if (error.message.includes('not found') || error.message.includes('access denied') || error.message.includes('Invalid ID format') ) {
            // Handle specific data access/validation errors from service
            return res.status(404).json({ message: error.message }); // Use 404 for not found/access issues
         }
        next(error); // Pass other errors to generic handler
    }
};

const executeTransfer = async (req, res, next) => {
    try {
        const userId = req.user._id;
        // Get transfer details from request body, add user ID
        const transferDetails = { ...req.body, userId };

         // --- MODIFIED VALIDATION ---
         // Define required fields *excluding* fees and estimatedArrival
         const requiredFields = [
             'sourceAccountId', 'recipientId', 'sendAmount', 'receiveAmount',
             'exchangeRate', 'sendCurrencyCode', 'receiveCurrencyCode'
            ];
         // Check if all required fields are present (allowing 0 for amounts)
         for (const field of requiredFields) {
             if (transferDetails[field] === undefined || transferDetails[field] === null || (typeof transferDetails[field] === 'string' && !transferDetails[field].trim())) {
                // Handle edge case: allow sendAmount/receiveAmount to be 0 if necessary, though usually they should be > 0 for a transfer
                if((field === 'sendAmount' || field === 'receiveAmount') && transferDetails[field] === 0) {
                    continue; // Allow 0 amount if your business logic permits (unlikely for transfer)
                }
                 console.error(`Controller executeTransfer validation failed: Missing field '${field}'`);
                 return res.status(400).json({ message: `Missing required field in transfer details: ${field}` });
             }
         }
         // --- END MODIFIED VALIDATION ---

        // Call the service to execute the transfer
        const transfer = await transferService.executeTransfer(transferDetails);
        // Respond with the created transfer record
        res.status(201).json(transfer);

    } catch (error) {
         // Handle specific errors from the service
         if (error.message === 'Insufficient balance.') {
             return res.status(400).json({ message: error.message, code: 'INSUFFICIENT_BALANCE' });
         }
         if (error.message.includes('not found') || error.message.includes('access denied') || error.message.includes('mismatch')) {
            return res.status(400).json({ message: error.message }); // Use 400 for data/validation issues during execution
         }
        // Pass other errors to the generic error handler
        next(error);
    }
};

const getTransferDetails = async (req, res, next) => {
     try {
        const userId = req.user._id;
        const { transferId } = req.params;
        const transfer = await transferService.getTransferDetails(transferId, userId);
         res.status(200).json(transfer);
    } catch (error) {
        if (error.message.startsWith('Transfer not found') || error.message.includes('Invalid transfer ID')) {
             return res.status(404).json({ message: error.message });
         }
        next(error);
    }
};

const getUserTransfers = async (req, res, next) => {
     try {
        const userId = req.user._id;
        const transfers = await transferService.getUserTransfers(userId);
         res.status(200).json(transfers);
    } catch (error) {
        next(error);
    }
};


export default {
    calculateSendSummary,
    executeTransfer,
    getTransferDetails,
    getUserTransfers,
};