import paymentAdminService from '../../services/admin/payment.admin.service.js';

const getAllPaymentsAdmin = async (req, res, next) => {
    try {
        const payments = await paymentAdminService.getAllPaymentsAdmin();
        res.json(payments);
    } catch (error) {
        next(error);
    }
};

const getPaymentByIdAdmin = async (req, res, next) => {
    try {
        const { paymentId } = req.params;
        const payment = await paymentAdminService.getPaymentByIdAdmin(paymentId);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.json(payment);
    } catch (error) {
        next(error);
    }
};

const updatePaymentStatusAdmin = async (req, res, next) => {
    try {
        const { paymentId } = req.params;
        const { status } = req.body; // Expecting 'status' in the request body

        if (!status || !['pending', 'completed', 'canceled', 'in progress'].includes(status)) {
            return res.status(400).json({ message: 'Invalid payment status' });
        }

        const updatedPayment = await paymentAdminService.updatePaymentStatusAdmin(paymentId, status);
        if (!updatedPayment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.json(updatedPayment);
    } catch (error) {
        next(error);
    }
};

export default {
    getAllPaymentsAdmin,
    getPaymentByIdAdmin,
    updatePaymentStatusAdmin,
};