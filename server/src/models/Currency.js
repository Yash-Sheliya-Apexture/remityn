import mongoose from 'mongoose';

const currencySchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true, uppercase: true },
    payeeName: { type: String },
    iban: { type: String },
    bicSwift: { type: String },
    bankAddress: { type: String },
    wiseFeePercentage: { type: Number, default: 0 }, // Default Wise fee percentage (0%)
    bankTransferFee: { type: Number, default: 0 },      // Default Bank transfer fee
    // You can add more fields or customize as needed
});

const Currency = mongoose.model('Currency', currencySchema);

export default Currency;