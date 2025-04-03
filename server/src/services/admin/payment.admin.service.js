// backend/src/services/admin/payment.admin.service.js
import Payment from '../../models/Payment.js';
import Account from '../../models/Account.js'; // **Ensure this import is present and correct**

const getAllPaymentsAdmin = async () => {
    return await Payment.find().populate(['user', 'balanceCurrency', 'payInCurrency']);
};

const getPaymentByIdAdmin = async (paymentId) => {
    return await Payment.findById(paymentId).populate(['user', 'balanceCurrency', 'payInCurrency']);
};

const updatePaymentStatusAdmin = async (paymentId, status) => {
    console.log(`Service: updatePaymentStatusAdmin - paymentId: ${paymentId}, status: ${status}`);

    const payment = await Payment.findById(String(paymentId)).populate(['user', 'balanceCurrency', 'payInCurrency']);
    if (!payment) {
        console.log(`Service: updatePaymentStatusAdmin - Payment not found for id: ${paymentId}`);
        throw new Error('Payment not found.');
    }
    payment.status = status;

    if (status === 'completed') {
        console.log(`Service: updatePaymentStatusAdmin - Status is 'completed', proceeding to update balance`);
        const account = await Account.findOne({ user: payment.user._id, currency: payment.balanceCurrency._id });
        if (!account) {
            console.log(`Service: updatePaymentStatusAdmin - Account not found for user: ${payment.user._id}, currency: ${payment.balanceCurrency._id}`);
            throw new Error('Account not found for user and currency.');
        }
        console.log(`Service: updatePaymentStatusAdmin - Account found, current balance: ${account.balance}, amountToAdd: ${payment.amountToAdd}`);
        account.balance += payment.amountToAdd;
        await account.save();
        console.log(`Service: updatePaymentStatusAdmin - Account balance updated, new balance: ${account.balance}`);
    } else {
        console.log(`Service: updatePaymentStatusAdmin - Status is not 'completed', balance NOT updated`);
    }

    await payment.save();
    const populatedPayment = await payment.populate(['user', 'balanceCurrency', 'payInCurrency']);
    console.log(`Service: updatePaymentStatusAdmin - Payment status updated, returning populated payment`);
    return populatedPayment;
};

export default {
    getAllPaymentsAdmin,
    getPaymentByIdAdmin,
    updatePaymentStatusAdmin,
};