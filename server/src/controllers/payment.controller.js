// import paymentService from '../services/payment.service.js';

// const calculatePaymentSummary = async (req, res, next) => { // Controller for summary calculation
//     try {
//         const userId = req.user._id; // From auth middleware
//         const { balanceCurrencyCode, payInCurrencyCode, amountToAdd } = req.body;

//         if (!balanceCurrencyCode || !payInCurrencyCode || !amountToAdd) {
//             return res.status(400).json({ message: 'Missing required fields.' });
//         }

//         const paymentSummary = await paymentService.calculatePaymentSummary(userId, balanceCurrencyCode, payInCurrencyCode, amountToAdd); // Call renamed service
//         res.status(200).json(paymentSummary); // Respond with summary
//     } catch (error) {
//         next(error); // Pass error to error handling middleware
//     }
// };


// const initiatePaymentAndSave = async (req, res, next) => { // New controller for saving payment
//     try {
//         // We expect to receive the payment summary data from the frontend now
//         const paymentSummary = req.body; // Frontend will send the summary data

//         if (!paymentSummary || !paymentSummary.balanceCurrencyCode || !paymentSummary.payInCurrencyCode || !paymentSummary.amountToAdd) {
//             return res.status(400).json({ message: 'Missing required payment summary data.' });
//         }

//         const payment = await paymentService.initiatePaymentAndSave(paymentSummary); // Call new service function to save
//         res.status(201).json(payment); // Respond with created payment details
//     } catch (error) {
//         next(error); // Pass error to error handling middleware
//     }
// };


// const getPaymentDetails = async (req, res, next) => {
//     try {
//         const paymentId = req.params.paymentId;
//         const payment = await paymentService.getPaymentDetails(paymentId);
//         if (!payment) {
//             return res.status(404).json({ message: 'Payment not found.' });
//         }
//         res.json(payment);
//     } catch (error) {
//         next(error); // Pass error to error handling middleware
//     }
// };


// export default {
//     calculatePaymentSummary, // Export new controller
//     initiatePaymentAndSave, // Export new controller for saving
//     getPaymentDetails,
// };


// // backend/src/controllers/payment.controller.js
// import paymentService from '../services/payment.service.js';

// const calculatePaymentSummary = async (req, res, next) => { // Controller for summary calculation
//     try {
//         const userId = req.user._id; // From auth middleware
//         const { balanceCurrencyCode, payInCurrencyCode, amountToAdd } = req.body;

//         if (!balanceCurrencyCode || !payInCurrencyCode || !amountToAdd) {
//             return res.status(400).json({ message: 'Missing required fields.' });
//         }

//         const paymentSummary = await paymentService.calculatePaymentSummary(userId, balanceCurrencyCode, payInCurrencyCode, amountToAdd); // Call renamed service
//         res.status(200).json(paymentSummary); // Respond with summary
//     } catch (error) {
//         next(error); // Pass error to error handling middleware
//     }
// };
// const getUserPayments = async (req, res, next) => {
//     try {
//         const userId = req.user._id; // User ID from authMiddleware
//         const payments = await paymentService.getUserPayments(userId); // Call service function
//         res.json(payments);
//     } catch (error) {
//         next(error);
//     }
// };


// const initiatePaymentAndSave = async (req, res, next) => { // New controller for saving payment
//     try {
//         // We expect to receive the payment summary data from the frontend now
//         const paymentSummary = req.body; // Frontend will send the summary data

//         if (!paymentSummary || !paymentSummary.balanceCurrencyCode || !paymentSummary.payInCurrencyCode || !paymentSummary.amountToAdd) {
//             return res.status(400).json({ message: 'Missing required payment summary data.' });
//         }

//         const payment = await paymentService.initiatePaymentAndSave(paymentSummary); // Call new service function to save
//         res.status(201).json(payment); // Respond with created payment details
//     } catch (error) {
//         next(error); // Pass error to error handling middleware
//     }
// };


// const getPaymentDetails = async (req, res, next) => {
//     try {
//         const paymentId = req.params.paymentId;
//         const payment = await paymentService.getPaymentDetails(paymentId);
//         if (!payment) {
//             return res.status(404).json({ message: 'Payment not found.' });
//         }
//         res.json(payment);
//     } catch (error) {
//         next(error); // Pass error to error handling middleware
//     }
// };


// const getUserBalancePayments = async (req, res, next) => {
//     try {
//         const userId = req.user._id;
//         const { balanceCurrencyId } = req.params; // balanceCurrencyId instead of balanceId to be specific
//         const payments = await paymentService.getUserBalancePayments(userId, balanceCurrencyId);
//         res.json(payments);
//     } catch (error) {
//         next(error);
//     }
// };


// const cancelPayment = async (req, res, next) => {
//     try {
//         const paymentId = req.params.paymentId;
//         const canceledPayment = await paymentService.cancelPayment(paymentId, req.user._id);
//         if (!canceledPayment) {
//             return res.status(404).json({ message: 'Payment not found or cannot be canceled.' });
//         }
//         res.json({ message: 'Payment canceled successfully', payment: canceledPayment });
//     } catch (error) {
//         if (error.message === 'Unauthorized cancellation') {
//             return res.status(403).json({ message: 'Unauthorized to cancel this payment.' });
//         }
//         next(error);
//     }
// };

// // NEW Controller: Handle user confirming transfer
// const confirmUserTransfer = async (req, res, next) => {
//     try {
//         const paymentId = req.params.paymentId;
//         const userId = req.user._id; // From authMiddleware

//         const updatedPayment = await paymentService.confirmUserTransfer(paymentId, userId);

//         if (!updatedPayment) {
//             // Specific errors handled in service, this is fallback
//             return res.status(404).json({ message: 'Payment not found or cannot be updated.' });
//         }

//         res.status(200).json({ message: 'Payment status updated to in progress.', payment: updatedPayment });
//     } catch (error) {
//         if (error.message === 'Unauthorized action' || error.message === 'Payment not found.' || error.message === 'Payment not in pending state.') {
//              return res.status(400).json({ message: error.message }); // Use 400 for client errors
//         }
//         next(error); // Pass other errors to general handler
//     }
// };

// export default {
//     calculatePaymentSummary,
//     initiatePaymentAndSave,
//     getPaymentDetails,
//     getUserBalancePayments,
//     cancelPayment,
//     getUserPayments,
//     confirmUserTransfer,
// };


// backend/src/controllers/payment.controller.js
import paymentService from '../services/payment.service.js';
import mongoose from 'mongoose'; // Import mongoose

const calculatePaymentSummary = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { balanceCurrencyCode, payInCurrencyCode, amountToAdd } = req.body;

        if (!balanceCurrencyCode || !payInCurrencyCode || amountToAdd === undefined || amountToAdd === null) {
            return res.status(400).json({ message: 'Missing required fields: balanceCurrencyCode, payInCurrencyCode, amountToAdd.' });
        }
        if (isNaN(amountToAdd) || Number(amountToAdd) <= 0) {
            return res.status(400).json({ message: 'Invalid amountToAdd. Must be a positive number.' });
        }

        const paymentSummary = await paymentService.calculatePaymentSummary(userId, balanceCurrencyCode, payInCurrencyCode, Number(amountToAdd));
        res.status(200).json(paymentSummary);
    } catch (error) {
        if (error.message.includes('Invalid currency codes')) {
            return res.status(400).json({ message: error.message });
        }
        next(error);
    }
};

const getUserPayments = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const payments = await paymentService.getUserPayments(userId);
        res.json(payments);
    } catch (error) {
         if (error.message.includes('Invalid user ID format')) {
            return res.status(400).json({ message: error.message });
        }
        next(error);
    }
};


const initiatePaymentAndSave = async (req, res, next) => {
    try {
        const paymentSummary = req.body;
        paymentSummary.userId = req.user._id;

        if (!paymentSummary || !paymentSummary.balanceCurrencyCode || !paymentSummary.payInCurrencyCode || paymentSummary.amountToAdd === undefined || paymentSummary.amountToPay === undefined) {
            return res.status(400).json({ message: 'Missing required payment summary data.' });
        }

        const payment = await paymentService.initiatePaymentAndSave(paymentSummary);
        res.status(201).json(payment); // Return the fully populated payment object
    } catch (error) {
         if (error.message.includes('Missing required payment summary data') ||
             error.message.includes('Invalid currency code provided') ||
             error.message.includes('does not have an account')) {
            return res.status(400).json({ message: error.message });
        }
        next(error);
    }
};


const getPaymentDetails = async (req, res, next) => {
    try {
        const paymentId = req.params.paymentId;
        // Add user ID check if users should only see their own payments
        // const userId = req.user._id;
        // const payment = await paymentService.getPaymentDetails(paymentId, userId); // Modify service if needed
        const payment = await paymentService.getPaymentDetails(paymentId); // Assuming service handles access if necessary
        res.json(payment); // Service throws if not found/invalid
    } catch (error) {
        if (error.message.includes('Payment not found') || error.message.includes('Invalid payment ID format')) {
             return res.status(404).json({ message: error.message });
         }
        // Add handling for unauthorized access if service implements it
        // if (error.message === 'Unauthorized access') {
        //     return res.status(403).json({ message: 'Forbidden' });
        // }
        next(error);
    }
};


const getUserBalancePayments = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { balanceCurrencyId } = req.params;
        const payments = await paymentService.getUserBalancePayments(userId, balanceCurrencyId);
        res.json(payments);
    } catch (error) {
        if (error.message.includes('Invalid user or currency ID format')) {
            return res.status(400).json({ message: error.message });
        }
        next(error);
    }
};

// --- *** MODIFIED cancelPayment Controller *** ---
const cancelPayment = async (req, res, next) => {
    try {
        const paymentId = req.params.paymentId;
        const userId = req.user._id;

        if (!mongoose.Types.ObjectId.isValid(paymentId)) {
             return res.status(400).json({ message: 'Invalid payment ID format.' });
        }

        const canceledPayment = await paymentService.cancelPayment(paymentId, userId);
        // Service now handles errors including status checks

        res.json({ message: 'Payment canceled successfully', payment: canceledPayment }); // Return updated payment

    } catch (error) {
        // Handle specific errors thrown by the service more granularly
        if (error.message === 'Payment not found.') {
            return res.status(404).json({ message: error.message });
        }
        if (error.message === 'Unauthorized cancellation') {
            return res.status(403).json({ message: 'Forbidden: You are not authorized to cancel this payment.' });
        }
        // *** HANDLE SPECIFIC STATUS CHECK ERROR ***
        if (error.message.includes('Status must be pending')) {
             console.log(`Controller: Blocked cancellation for payment ${req.params.paymentId} due to non-pending status.`);
             // 400 Bad Request is appropriate because the request is invalid given the resource's current state
             return res.status(400).json({ message: error.message });
        }
        // *** END HANDLING SPECIFIC STATUS CHECK ERROR ***
        if (error.message.includes('Invalid payment or user ID format')) {
             return res.status(400).json({ message: error.message });
        }
        if (error.message.includes('Failed to cancel payment')) {
            // Consider this an internal server error if the service indicates a failure beyond validation
            return res.status(500).json({ message: 'An unexpected error occurred while cancelling the payment.' });
        }

        next(error); // Pass other unhandled errors
    }
};

// --- Modified confirmUserTransfer Controller ---
const confirmUserTransfer = async (req, res, next) => {
    try {
        const paymentId = req.params.paymentId;
        const userId = req.user._id;

        if (!mongoose.Types.ObjectId.isValid(paymentId)) {
             return res.status(400).json({ message: 'Invalid payment ID format.' });
        }

        const updatedPayment = await paymentService.confirmUserTransfer(paymentId, userId);
        // Service throws specific errors

        res.status(200).json({ message: 'Payment status updated to in progress.', payment: updatedPayment }); // Return updated payment
    } catch (error) {
        if (error.message === 'Payment not found.') {
            return res.status(404).json({ message: error.message });
        }
         if (error.message === 'Unauthorized action') {
            return res.status(403).json({ message: 'Forbidden: You are not authorized.' });
        }
        // *** HANDLE SPECIFIC STATUS CHECK ERROR ***
        if (error.message.includes('status is not pending')) {
             // 400 Bad Request is appropriate here as well
             return res.status(400).json({ message: error.message });
        }
        // *** END HANDLING SPECIFIC STATUS CHECK ERROR ***
        if (error.message.includes('Invalid payment or user ID format')) {
             return res.status(400).json({ message: error.message });
        }
        if (error.message.includes('Failed to confirm user transfer')) {
            return res.status(500).json({ message: 'An unexpected error occurred while confirming the transfer.' });
        }

        next(error);
    }
};

export default {
    calculatePaymentSummary,
    initiatePaymentAndSave,
    getPaymentDetails,
    getUserBalancePayments,
    cancelPayment,
    getUserPayments,
    confirmUserTransfer,
};