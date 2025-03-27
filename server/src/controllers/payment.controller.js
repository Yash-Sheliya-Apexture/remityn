import paymentService from '../services/payment.service.js';

const calculatePaymentSummary = async (req, res, next) => { // Controller for summary calculation
    try {
        const userId = req.user._id; // From auth middleware
        const { balanceCurrencyCode, payInCurrencyCode, amountToAdd } = req.body;

        if (!balanceCurrencyCode || !payInCurrencyCode || !amountToAdd) {
            return res.status(400).json({ message: 'Missing required fields.' });
        }

        const paymentSummary = await paymentService.calculatePaymentSummary(userId, balanceCurrencyCode, payInCurrencyCode, amountToAdd); // Call renamed service
        res.status(200).json(paymentSummary); // Respond with summary
    } catch (error) {
        next(error); // Pass error to error handling middleware
    }
};


const initiatePaymentAndSave = async (req, res, next) => { // New controller for saving payment
    try {
        // We expect to receive the payment summary data from the frontend now
        const paymentSummary = req.body; // Frontend will send the summary data

        if (!paymentSummary || !paymentSummary.balanceCurrencyCode || !paymentSummary.payInCurrencyCode || !paymentSummary.amountToAdd) {
            return res.status(400).json({ message: 'Missing required payment summary data.' });
        }

        const payment = await paymentService.initiatePaymentAndSave(paymentSummary); // Call new service function to save
        res.status(201).json(payment); // Respond with created payment details
    } catch (error) {
        next(error); // Pass error to error handling middleware
    }
};


const getPaymentDetails = async (req, res, next) => {
    try {
        const paymentId = req.params.paymentId;
        const payment = await paymentService.getPaymentDetails(paymentId);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found.' });
        }
        res.json(payment);
    } catch (error) {
        next(error); // Pass error to error handling middleware
    }
};


export default {
    calculatePaymentSummary, // Export new controller
    initiatePaymentAndSave, // Export new controller for saving
    getPaymentDetails,
};