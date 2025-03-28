// backend/src/models/Payment.js
import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const paymentSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    balanceCurrency: { type: Schema.Types.ObjectId, ref: 'Currency', required: true },
    payInCurrency: { type: Schema.Types.ObjectId, ref: 'Currency', required: true },
    amountToAdd: { type: Number, required: true },
    amountToPay: { type: Number, required: true },
    exchangeRate: { type: Number, required: true },
    wiseFee: { type: Number, required: true },
    bankTransferFee: { type: Number, required: true },
    referenceCode: { type: String, required: true, unique: true },
    paymentMethod: { type: String, default: 'bank_transfer' },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'in progress', 'canceled'], // **ADD 'in progress', 'canceled' to enum**
        default: 'pending'
    },
    bankDetails: {
        payeeName: { type: String },
        iban: { type: String },
        bicSwift: { type: String },
        bankAddress: { type: String },
    },
    createdAt: { type: Date, default: Date.now },
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;