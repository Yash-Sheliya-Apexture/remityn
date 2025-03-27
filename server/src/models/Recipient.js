// backend/src/models/Recipient.js
import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const recipientSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // User who added the recipient
    currency: { type: Schema.Types.ObjectId, ref: 'Currency', required: true }, // Currency of the account (INR in this case initially)
    accountHolderName: { type: String, required: true },
    accountNumber: { type: String, required: true },
    ifscCode: { type: String, required: true },
    email: { type: String }, // Optional email
    bankName: { type: String }, // Optional bank name (can be derived from IFSC or added manually)
    address: { type: String }, // Optional address
    nickname: { type: String }, // Optional nickname
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Recipient = mongoose.model('Recipient', recipientSchema);

export default Recipient;