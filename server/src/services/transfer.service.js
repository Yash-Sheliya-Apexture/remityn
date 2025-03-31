// backend/src/services/transfer.service.js
import Transfer from '../models/Transfer.js';
import Account from '../models/Account.js';
import Currency from '../models/Currency.js';
import Recipient from '../models/Recipient.js';
import exchangeRateService from './exchangeRate.service.js';
import mongoose from 'mongoose';

// --- REMOVED Fee Calculation Logic ---
// --- REMOVED Estimate Arrival Time Logic ---

// --- Calculate Send Summary (REVISED - NO FEES) ---
const calculateSendSummary = async (userId, sourceAccountId, recipientId, amount, isSendingAmount) => {
    try {
        console.log('Service: calculateSendSummary (No Fees) - Start', { userId, sourceAccountId, recipientId, amount, isSendingAmount });

        if (!mongoose.Types.ObjectId.isValid(sourceAccountId) || !mongoose.Types.ObjectId.isValid(recipientId)) {
            throw new Error('Invalid account or recipient ID format.');
        }
        const sourceAccount = await Account.findById(sourceAccountId).populate('currency user');
        const recipient = await Recipient.findById(recipientId).populate('currency user');
        if (!sourceAccount || !sourceAccount.user?._id || !sourceAccount.user._id.equals(userId)) {
            throw new Error('Source account not found or access denied.');
        }
        if (!recipient || !recipient.user?._id || !recipient.user._id.equals(userId)) {
            throw new Error('Recipient not found or access denied.');
        }
        if (amount === undefined || amount === null || isNaN(amount) || amount <= 0) {
            throw new Error('Invalid amount specified.');
        }

        const sendCurrencyCode = sourceAccount.currency.code;
        const receiveCurrencyCode = recipient.currency.code;
        console.log(`Service: calculateSendSummary (No Fees) - Currencies: Send=${sendCurrencyCode}, Receive=${receiveCurrencyCode}`);

        const latestRatesDocument = await exchangeRateService.getLatestExchangeRates();
        if (!latestRatesDocument || !latestRatesDocument.rates || typeof latestRatesDocument.rates.rates !== 'object') {
            console.error('Service: calculateSendSummary (No Fees) - Failed to fetch valid exchange rates data.');
            throw new Error('Could not retrieve current exchange rates. Data structure issue.');
        }
        const actualRatesMap = latestRatesDocument.rates.rates;
        const actualBaseCurrency = latestRatesDocument.rates.base || 'USD';
        console.log(`Service: calculateSendSummary (No Fees) - Using actual base currency: ${actualBaseCurrency}`);
        const rateBaseToSend = sendCurrencyCode === actualBaseCurrency ? 1 : (actualRatesMap[sendCurrencyCode] ? parseFloat(actualRatesMap[sendCurrencyCode]) : null);
        const rateBaseToReceive = receiveCurrencyCode === actualBaseCurrency ? 1 : (actualRatesMap[receiveCurrencyCode] ? parseFloat(actualRatesMap[receiveCurrencyCode]) : null);
        if (rateBaseToSend === null || isNaN(rateBaseToSend) || rateBaseToReceive === null || isNaN(rateBaseToReceive) || rateBaseToSend === 0) {
            console.error(`Service: calculateSendSummary (No Fees) - Missing rate relative to ${actualBaseCurrency}.`);
            throw new Error(`Cannot determine exchange rate between ${sendCurrencyCode} and ${receiveCurrencyCode}. Rates might be unavailable.`);
        }
        const exchangeRate = rateBaseToReceive / rateBaseToSend;
        console.log(`Service: calculateSendSummary (No Fees) - Calculated Rate (${sendCurrencyCode}/${receiveCurrencyCode}): ${exchangeRate}`);

        let sendAmountCalc, receiveAmountCalc;
        if (isSendingAmount) {
            sendAmountCalc = parseFloat(amount);
            receiveAmountCalc = sendAmountCalc * exchangeRate;
        } else {
            receiveAmountCalc = parseFloat(amount);
            sendAmountCalc = receiveAmountCalc / exchangeRate;
        }

        if (sourceAccount.balance < sendAmountCalc) {
            console.warn(`Service: calculateSendSummary (No Fees) - Insufficient balance. Required: ${sendAmountCalc.toFixed(2)}, Available: ${sourceAccount.balance.toFixed(2)}`);
            throw new Error('Insufficient balance.');
        }

        const summary = {
            userId: userId.toString(),
            sourceAccountId: sourceAccountId.toString(),
            recipientId: recipientId.toString(),
            sendAmount: parseFloat(sendAmountCalc.toFixed(2)),
            receiveAmount: parseFloat(receiveAmountCalc.toFixed(2)),
            sendCurrencyCode,
            receiveCurrencyCode,
            exchangeRate: parseFloat(exchangeRate.toFixed(6)),
            availableBalance: parseFloat(sourceAccount.balance.toFixed(2)),
        };
        console.log('Service: calculateSendSummary (No Fees) - Success', summary);
        return summary;

    } catch (error) {
        console.error("ERROR in calculateSendSummary service (No Fees):", error);
        throw error;
    }
};

// --- Execute Transfer (REVISED - Start as PENDING, remove setTimeout) ---
const executeTransfer = async (transferDetails) => {
    console.log('Service: executeTransfer (Pending) - Start', transferDetails);
    const {
        userId, sourceAccountId, recipientId, sendAmount, receiveAmount,
        exchangeRate, reason, reference, sendCurrencyCode, receiveCurrencyCode
    } = transferDetails;

     if (!userId || !sourceAccountId || !recipientId || !sendAmount || !receiveAmount || !exchangeRate || !sendCurrencyCode || !receiveCurrencyCode) {
         console.error("Service: executeTransfer (Pending) - Missing essential transfer details.");
         throw new Error("Missing essential transfer information.");
     }

    const session = await mongoose.startSession();
    session.startTransaction();
    console.log('Service: executeTransfer (Pending) - Transaction started.');

    try {
        const sourceAccount = await Account.findOne({ _id: sourceAccountId, user: userId }).session(session).populate('currency');
        const recipient = await Recipient.findOne({ _id: recipientId, user: userId }).session(session).populate('currency');
        if (!sourceAccount) throw new Error('Source account not found or access denied.');
        if (!recipient) throw new Error('Recipient not found or access denied.');
        if (sourceAccount.currency.code !== sendCurrencyCode) throw new Error('Source currency mismatch during execution.');
        if (recipient.currency.code !== receiveCurrencyCode) throw new Error('Recipient currency mismatch during execution.');
        if (sourceAccount.balance < sendAmount) throw new Error('Insufficient balance.');

        const originalBalance = sourceAccount.balance;
        sourceAccount.balance -= sendAmount;
        await sourceAccount.save({ session });
        console.log(`Service: executeTransfer (Pending) - Debited ${sendAmount} ${sendCurrencyCode}. Balance ${originalBalance} -> ${sourceAccount.balance}`);

        const newTransfer = new Transfer({
            user: userId,
            sourceAccount: sourceAccountId,
            recipient: recipientId,
            sendAmount,
            receiveAmount,
            sendCurrency: sourceAccount.currency._id,
            receiveCurrency: recipient.currency._id,
            exchangeRate,
            fees: 0, // Set fees to 0
            reason,
            reference: reference || null,
            status: 'pending', // Start as pending
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        await newTransfer.save({ session });
        console.log(`Service: executeTransfer (Pending) - Created Transfer record ${newTransfer._id} with status 'pending'`);

        await session.commitTransaction();
        console.log('Service: executeTransfer (Pending) - Transaction committed.');

         const populatedTransfer = await Transfer.findById(newTransfer._id)
            .populate('user', 'fullName email')
            .populate({ path: 'sourceAccount', select: 'balance currency', populate: { path: 'currency', select: 'code flagImage' } })
            .populate({ path: 'recipient', select: 'accountHolderName nickname currency accountNumber bankName', populate: { path: 'currency', select: 'code flagImage' } });
        console.log('Service: executeTransfer (Pending) - Success, returning populated transfer.');
        return populatedTransfer;

    } catch (error) {
        console.error('Service: executeTransfer (Pending) - Error during transaction, aborting.', error);
        await session.abortTransaction();
        console.log('Service: executeTransfer (Pending) - Transaction aborted.');
        throw error;
    } finally {
        session.endSession();
        console.log('Service: executeTransfer (Pending) - Session ended.');
    }
};

// --- getTransferDetails (Keep as is) ---
const getTransferDetails = async (transferId, userId) => {
    console.log(`Service: getTransferDetails - Fetching transfer ${transferId} for user ${userId}`);
     if (!mongoose.Types.ObjectId.isValid(transferId)) {
        throw new Error('Invalid transfer ID format.');
     }
     // Find the transfer and populate all necessary fields
     const transfer = await Transfer.findOne({ _id: transferId, user: userId })
        .populate('user', 'fullName email') // Populate user details
        .populate({
            path: 'sourceAccount', // Populate source account...
            select: 'currency',    // ...select its currency field...
            populate: {            // ...and populate that currency field
                path: 'currency',
                select: 'code flagImage'
            }
        })
        .populate({
            path: 'recipient',     // Populate recipient...
            select: 'accountHolderName nickname currency accountNumber bankName', // ...select needed fields...
            populate: {            // ...and populate its nested currency field
                path: 'currency',
                select: 'code flagImage'
            }
        })
        .populate('sendCurrency', 'code flagImage') // <-- ADD THIS LINE: Populate top-level sendCurrency
        .populate('receiveCurrency', 'code flagImage'); // <-- ADD THIS LINE: Populate top-level receiveCurrency

    if (!transfer) {
        console.log(`Service: getTransferDetails - Transfer ${transferId} not found or access denied for user ${userId}`);
        throw new Error('Transfer not found or access denied.');
    }
    console.log(`Service: getTransferDetails - Transfer ${transferId} found and populated.`);
    return transfer; // Return the fully populated transfer object
};

// --- getUserTransfers (Keep as is) ---
const getUserTransfers = async (userId) => {
    console.log(`Service: getUserTransfers - Fetching transfers for user ${userId}`);
    try {
        const transfers = await Transfer.find({ user: userId })
            .populate('recipient', 'accountHolderName nickname') // Keep recipient details concise
            .populate('sendCurrency', 'code flagImage') // Populate send currency
            .populate('receiveCurrency', 'code flagImage') // Populate receive currency
            // --- MODIFIED SELECT ---
            // Include sourceAccount ID, exclude user, updatedAt, fees
            .select('recipient sendCurrency receiveCurrency sendAmount receiveAmount status createdAt sourceAccount reason reference')
            // --- END MODIFIED SELECT ---
            .sort({ createdAt: -1 });
        console.log(`Service: getUserTransfers - Found ${transfers.length} transfers for user ${userId}`);
        return transfers;
    } catch (error) {
        console.error(`Service: getUserTransfers - Error fetching transfers for user ${userId}:`, error);
        throw new Error('Failed to retrieve transfer history.');
    }
};


// --- Export Service Methods ---
export default {
    calculateSendSummary,
    executeTransfer,
    getTransferDetails,
    getUserTransfers,
};