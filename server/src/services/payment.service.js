// import Payment from '../models/Payment.js';
// import Currency from '../models/Currency.js';
// import { v4 as uuidv4 } from 'uuid'; // For generating unique reference codes

// const generateReferenceCode = () => {
//     return `REF-${uuidv4().substring(0, 8).toUpperCase()}`;
// };

// // Mock function for exchange rate (replace with real API call or database lookup)
// const getExchangeRate = async (fromCurrencyCode, toCurrencyCode) => {
//     // In a real application, fetch exchange rates from a reliable API or database
//     // For now, returning a mock rate for EUR to AUD (1 EUR = 1.717 AUD as per image)
//     if (fromCurrencyCode === 'EUR' && toCurrencyCode === 'AUD') {
//         return 1.717;
//     }
//     if (fromCurrencyCode === 'AUD' && toCurrencyCode === 'EUR') {
//         return 1 / 1.717;
//     }
//     // Add more mock rates or default/error handling as needed
//     return 1.0; // Default rate if not found
// };


// const calculateFees = async (amount, payInCurrencyCode) => { // Make async to fetch currency details
//     const currency = await Currency.findOne({ code: payInCurrencyCode.toUpperCase() });
//     if (!currency) {
//         throw new Error('Currency not found for fee calculation.'); // Handle currency not found
//     }

//     const wiseFeePercentage = currency.wiseFeePercentage || 0; // Use currency's percentage or default
//     const wiseFee = amount * wiseFeePercentage;
//     const bankTransferFee = currency.bankTransferFee || 0;      // Use currency's fixed fee or default

//     return { wiseFee, bankTransferFee };
// };

// // Replaced getWiseBankDetails with getCurrencyBankDetails
// const getCurrencyBankDetails = async (payInCurrencyCode) => {
//     const currency = await Currency.findOne({ code: payInCurrencyCode.toUpperCase() });
//     if (currency) {
//         return {
//             payeeName: currency.payeeName,
//             iban: currency.iban,
//             bicSwift: currency.bicSwift,
//             bankAddress: currency.bankAddress,
//         };
//     }
//     return null;
// };


// const calculatePaymentSummary = async (userId, balanceCurrencyCode, payInCurrencyCode, amountToAdd) => {
//     const balanceCurrency = await Currency.findOne({ code: balanceCurrencyCode.toUpperCase() });
//     const payInCurrency = await Currency.findOne({ code: payInCurrencyCode.toUpperCase() });

//     if (!balanceCurrency || !payInCurrency) {
//         throw new Error('Invalid currency codes.');
//     }

//     const exchangeRate = await getExchangeRate(payInCurrencyCode, balanceCurrencyCode);
//     const fees = await calculateFees(amountToAdd, payInCurrencyCode); // Await the fees calculation
//     const amountToPay = (amountToAdd * exchangeRate) + fees.wiseFee + fees.bankTransferFee;

//     const paymentSummary = {
//         amountToPay,
//         exchangeRate,
//         wiseFee: fees.wiseFee,
//         bankTransferFee: fees.bankTransferFee,
//         balanceCurrencyCode,
//         payInCurrencyCode,
//         amountToAdd,
//         userId,
//     };

//     return paymentSummary;
// };


// const initiatePaymentAndSave = async (paymentSummary) => {
//     try { // ADD TRY-CATCH BLOCK
//         const { userId, balanceCurrencyCode, payInCurrencyCode, amountToAdd, amountToPay, exchangeRate, wiseFee, bankTransferFee } = paymentSummary;

//         const balanceCurrency = await Currency.findOne({ code: balanceCurrencyCode.toUpperCase() });
//         const payInCurrency = await Currency.findOne({ code: payInCurrencyCode.toUpperCase() });
//         const referenceCode = generateReferenceCode();
//         const bankDetails = await getCurrencyBankDetails(payInCurrencyCode);


//         const newPayment = new Payment({
//             user: userId,
//             balanceCurrency: balanceCurrency._id,
//             payInCurrency: payInCurrency._id,
//             amountToAdd,
//             amountToPay,
//             exchangeRate,
//             wiseFee,
//             bankTransferFee,
//             referenceCode,
//             bankDetails,
//         });

//         await newPayment.save();
//         return await newPayment.populate(['balanceCurrency', 'payInCurrency']);
//     } catch (error) { // CATCH ERROR
//         console.error("Error in initiatePaymentAndSave service:", error); // LOG ERROR
//         throw error; // Re-throw the error so controller's error handler can catch it
//     }
// };


// const getPaymentDetails = async (paymentId) => {
//     return await Payment.findById(paymentId).populate(['balanceCurrency', 'payInCurrency']);
// };


// export default {
//     calculatePaymentSummary,
//     initiatePaymentAndSave,
//     getPaymentDetails,
// };


// import Payment from '../models/Payment.js';
// import Currency from '../models/Currency.js';
// import { v4 as uuidv4 } from 'uuid';

// const generateReferenceCode = () => {
//     return `REF-${uuidv4().substring(0, 8).toUpperCase()}`;
// };

// const getExchangeRate = async (fromCurrencyCode, toCurrencyCode) => {
//     if (fromCurrencyCode === 'EUR' && toCurrencyCode === 'AUD') {
//         return 1.717;
//     }
//     if (fromCurrencyCode === 'AUD' && toCurrencyCode === 'EUR') {
//         return 1 / 1.717;
//     }
//     return 1.0;
// };

// const calculateFees = async (amount, payInCurrencyCode) => {
//     const currency = await Currency.findOne({ code: payInCurrencyCode.toUpperCase() });
//     if (!currency) {
//         throw new Error('Currency not found for fee calculation.');
//     }

//     const wiseFeePercentage = currency.wiseFeePercentage || 0;
//     const wiseFee = amount * wiseFeePercentage;
//     const bankTransferFee = currency.bankTransferFee || 0;

//     return { wiseFee, bankTransferFee };
// };

// const getCurrencyBankDetails = async (payInCurrencyCode) => {
//     const currency = await Currency.findOne({ code: payInCurrencyCode.toUpperCase() });
//     if (currency) {
//         return {
//             payeeName: currency.payeeName,
//             iban: currency.iban,
//             bicSwift: currency.bicSwift,
//             bankAddress: currency.bankAddress,
//         };
//     }
//     return null;
// };

// const calculatePaymentSummary = async (userId, balanceCurrencyCode, payInCurrencyCode, amountToAdd) => {
//     const balanceCurrency = await Currency.findOne({ code: balanceCurrencyCode.toUpperCase() });
//     const payInCurrency = await Currency.findOne({ code: payInCurrencyCode.toUpperCase() });

//     if (!balanceCurrency || !payInCurrency) {
//         throw new Error('Invalid currency codes.');
//     }

//     const exchangeRate = await getExchangeRate(payInCurrencyCode, balanceCurrencyCode);
//     const fees = await calculateFees(amountToAdd, payInCurrencyCode);
//     const amountToPay = (amountToAdd * exchangeRate) + fees.wiseFee + fees.bankTransferFee;

//     const paymentSummary = {
//         amountToPay,
//         exchangeRate,
//         wiseFee: fees.wiseFee,
//         bankTransferFee: fees.bankTransferFee,
//         balanceCurrencyCode,
//         payInCurrencyCode,
//         amountToAdd,
//         userId,
//     };

//     return paymentSummary;
// };

// const initiatePaymentAndSave = async (paymentSummary) => {
//     try {
//         const { userId, balanceCurrencyCode, payInCurrencyCode, amountToAdd, amountToPay, exchangeRate, wiseFee, bankTransferFee } = paymentSummary;

//         const balanceCurrency = await Currency.findOne({ code: balanceCurrencyCode.toUpperCase() });
//         const payInCurrency = await Currency.findOne({ code: payInCurrencyCode.toUpperCase() });
//         const referenceCode = generateReferenceCode();
//         const bankDetails = await getCurrencyBankDetails(payInCurrencyCode);

//         const newPayment = new Payment({
//             user: userId,
//             balanceCurrency: balanceCurrency._id,
//             payInCurrency: payInCurrency._id,
//             amountToAdd,
//             amountToPay,
//             exchangeRate,
//             wiseFee,
//             bankTransferFee,
//             referenceCode,
//             bankDetails,
//         });

//         await newPayment.save();
//         return await newPayment.populate(['balanceCurrency', 'payInCurrency']);
//     } catch (error) {
//         console.error("Error in initiatePaymentAndSave service:", error);
//         throw error;
//     }
// };

// const getPaymentDetails = async (paymentId) => {
//     return await Payment.findById(paymentId).populate(['balanceCurrency', 'payInCurrency', 'user']); // Populate user here
// };

// const getUserBalancePayments = async (userId, balanceCurrencyId) => {
//     try {
//         const payments = await Payment.find({
//             user: userId,
//             balanceCurrency: balanceCurrencyId,
//         })
//             .populate(['balanceCurrency', 'payInCurrency'])
//             .sort({ createdAt: 'desc' });

//         return payments;
//     } catch (error) {
//         console.error("Error fetching payments for balance:", error);
//         throw error;
//     }
// };

// const cancelPayment = async (paymentId, userId) => {
//     try { // Add try-catch block for better error logging
//         const payment = await Payment.findById(paymentId).populate(['user', 'balanceCurrency', 'payInCurrency']);
//         if (!payment) {
//             throw new Error('Payment not found.');
//         }

//         console.log("Payment User ID (payment.user._id.toString()):", payment.user._id.toString()); // Log payment.user._id
//         console.log("Request User ID (userId.toString()):", userId.toString());

//         if (payment.user._id.toString() !== userId.toString()) { // Compare payment.user._id
//             throw new Error('Unauthorized cancellation');
//         }

//         if (payment.status !== 'pending' && payment.status !== 'in progress') {
//             throw new Error('Payment cannot be cancelled in its current status.');
//         }

//         payment.status = 'canceled';
//         return await payment.save();
//     } catch (error) {
//         console.error("Error in cancelPayment service:", error); // Log service errors
//         throw error; // Re-throw the error to be caught by the controller
//     }
// };

// const getUserPayments = async (userId) => {
//     return await Payment.find({ user: userId })
//                        .populate(['user', 'balanceCurrency', 'payInCurrency']) // Populate related data
//                        .sort({ createdAt: 'desc' }); // Sort by creation date, newest first
// };

// export default {
//     calculatePaymentSummary,
//     initiatePaymentAndSave,
//     getPaymentDetails,
//     getUserBalancePayments,
//     cancelPayment,
//     getUserPayments, 
// };



// import Payment from '../models/Payment.js';
// import Currency from '../models/Currency.js';
// import Account from '../models/Account.js'; // <-- ADD THIS LINE
// import { v4 as uuidv4 } from 'uuid';

// const generateReferenceCode = () => {
//     return `REF-${uuidv4().substring(0, 8).toUpperCase()}`;
// };

// const getExchangeRate = async (fromCurrencyCode, toCurrencyCode) => {
//     if (fromCurrencyCode === 'EUR' && toCurrencyCode === 'AUD') {
//         return 1.717;
//     }
//     if (fromCurrencyCode === 'AUD' && toCurrencyCode === 'EUR') {
//         return 1 / 1.717;
//     }
//     return 1.0;
// };

// const calculateFees = async (amount, payInCurrencyCode) => {
//     const currency = await Currency.findOne({ code: payInCurrencyCode.toUpperCase() });
//     if (!currency) {
//         throw new Error('Currency not found for fee calculation.');
//     }

//     const wiseFeePercentage = currency.wiseFeePercentage || 0;
//     const wiseFee = amount * wiseFeePercentage;
//     const bankTransferFee = currency.bankTransferFee || 0;

//     return { wiseFee, bankTransferFee };
// };

// const getCurrencyBankDetails = async (payInCurrencyCode) => {
//     const currency = await Currency.findOne({ code: payInCurrencyCode.toUpperCase() });
//     if (currency) {
//         return {
//             payeeName: currency.payeeName,
//             iban: currency.iban,
//             bicSwift: currency.bicSwift,
//             bankAddress: currency.bankAddress,
//         };
//     }
//     return null;
// };

// const calculatePaymentSummary = async (userId, balanceCurrencyCode, payInCurrencyCode, amountToAdd) => {
//     const balanceCurrency = await Currency.findOne({ code: balanceCurrencyCode.toUpperCase() });
//     const payInCurrency = await Currency.findOne({ code: payInCurrencyCode.toUpperCase() });

//     if (!balanceCurrency || !payInCurrency) {
//         throw new Error('Invalid currency codes.');
//     }

//     const exchangeRate = await getExchangeRate(payInCurrencyCode, balanceCurrencyCode);
//     const fees = await calculateFees(amountToAdd, payInCurrencyCode);
//     const amountToPay = (amountToAdd * exchangeRate) + fees.wiseFee + fees.bankTransferFee;

//     const paymentSummary = {
//         amountToPay,
//         exchangeRate,
//         wiseFee: fees.wiseFee,
//         bankTransferFee: fees.bankTransferFee,
//         balanceCurrencyCode,
//         payInCurrencyCode,
//         amountToAdd,
//         userId,
//     };

//     return paymentSummary;
// };

// // --- MODIFY initiatePaymentAndSave ---
// const initiatePaymentAndSave = async (paymentSummary) => {
//     try {
//         const { userId, balanceCurrencyCode, payInCurrencyCode, amountToAdd, amountToPay, exchangeRate, wiseFee, bankTransferFee } = paymentSummary;

//         const balanceCurrency = await Currency.findOne({ code: balanceCurrencyCode.toUpperCase() });
//         const payInCurrency = await Currency.findOne({ code: payInCurrencyCode.toUpperCase() });

//         if (!balanceCurrency || !payInCurrency) {
//             throw new Error(`Invalid currency code provided: Balance=${balanceCurrencyCode}, PayIn=${payInCurrencyCode}`);
//         }

//         // --- Find the specific user Account for this currency ---
//         const targetAccount = await Account.findOne({ user: userId, currency: balanceCurrency._id });
//         if (!targetAccount) {
//             // This indicates a potential issue - the user is trying to add money
//             // to a currency balance for which they don't have an explicit Account record.
//             // How you handle this depends on your application logic.
//             // Option 1: Throw error (Safer if Account MUST exist)
//              throw new Error(`User ${userId} does not have an account for currency ${balanceCurrencyCode}. Cannot initiate payment.`);
//             // Option 2: Log warning and proceed without linking (Payment won't show on Balance Detail)
//             // console.warn(`Payment Service: No account found for user ${userId} and currency ${balanceCurrencyCode}. Payment will not be linked to a specific account.`);
//         }
//         // --- End Finding Account ---


//         const referenceCode = generateReferenceCode();
//         const bankDetails = await getCurrencyBankDetails(payInCurrencyCode);

//         const newPayment = new Payment({
//             user: userId,
//             // --- Assign the found account ID ---
//             account: targetAccount ? targetAccount._id : null, // Store the ObjectId or null
//             // --- ---
//             balanceCurrency: balanceCurrency._id,
//             payInCurrency: payInCurrency._id,
//             amountToAdd,
//             amountToPay,
//             exchangeRate,
//             wiseFee,
//             bankTransferFee,
//             referenceCode,
//             bankDetails,
//             // status will default to 'pending'
//         });

//         await newPayment.save();

//         // Populate necessary fields for the response, including the account if needed
//         // Note: Populating 'account' here might not be necessary if the frontend
//         // primarily uses getUserPayments which populates it later.
//         return await newPayment.populate(['balanceCurrency', 'payInCurrency']); // Keep it simple for now

//     } catch (error) {
//         console.error("Error in initiatePaymentAndSave service:", error);
//         throw error; // Re-throw to be handled by controller
//     }
// };

// const getPaymentDetails = async (paymentId) => {
//     return await Payment.findById(paymentId).populate(['balanceCurrency', 'payInCurrency', 'user', 'account']); // <-- Populate account here too
// };

// const getUserBalancePayments = async (userId, balanceCurrencyId) => {
//     try {
//         const payments = await Payment.find({
//             user: userId,
//             balanceCurrency: balanceCurrencyId,
//         })
//             .populate(['balanceCurrency', 'payInCurrency'])
//             .sort({ createdAt: 'desc' });

//         return payments;
//     } catch (error) {
//         console.error("Error fetching payments for balance:", error);
//         throw error;
//     }
// };

// const cancelPayment = async (paymentId, userId) => {
//     try { // Add try-catch block for better error logging
//         const payment = await Payment.findById(paymentId).populate(['user', 'balanceCurrency', 'payInCurrency']);
//         if (!payment) {
//             throw new Error('Payment not found.');
//         }

//         console.log("Payment User ID (payment.user._id.toString()):", payment.user._id.toString()); // Log payment.user._id
//         console.log("Request User ID (userId.toString()):", userId.toString());

//         if (payment.user._id.toString() !== userId.toString()) { // Compare payment.user._id
//             throw new Error('Unauthorized cancellation');
//         }

//         if (payment.status !== 'pending' && payment.status !== 'in progress') {
//             throw new Error('Payment cannot be cancelled in its current status.');
//         }

//         payment.status = 'canceled';
//         return await payment.save();
//     } catch (error) {
//         console.error("Error in cancelPayment service:", error); // Log service errors
//         throw error; // Re-throw the error to be caught by the controller
//     }
// };

// const getUserPayments = async (userId) => {
//     try {
//         console.log(`Fetching payments for user: ${userId}`); // Add log
//          const payments = await Payment.find({ user: userId })
//             .populate('user', 'fullName email') // Select specific user fields if needed
//             .populate('balanceCurrency', 'code flagImage currencyName') // Populate needed currency fields
//             .populate('payInCurrency', 'code flagImage currencyName')   // Populate needed currency fields
//             .populate('account', '_id') // Populate only the ID of the account, or more if needed
//             .sort({ createdAt: 'desc' })
//             .lean(); // Use .lean() for plain JS objects for better performance and easier manipulation

//          // --- ADD TYPE FIELD ---
//          const paymentsWithType = payments.map(payment => ({
//             ...payment,
//             type: 'Add Money' // Explicitly add the type for easier frontend filtering
//          }));
//          // --- END ADD TYPE ---

//          console.log(`Found ${paymentsWithType.length} payments for user ${userId}`); // Add log
//          return paymentsWithType; // Return the modified array
//     } catch (error) {
//          console.error(`Error fetching user payments for ${userId}:`, error); // Log specific error
//          throw error; // Re-throw
//     }
// };


// // NEW Service: Update status when user confirms transfer
// const confirmUserTransfer = async (paymentId, userId) => {
//     try {
//         const payment = await Payment.findById(paymentId);

//         if (!payment) {
//             throw new Error('Payment not found.');
//         }

//         // Ensure the user owns this payment
//         if (payment.user.toString() !== userId.toString()) {
//             throw new Error('Unauthorized action');
//         }

//         // Only allow update if status is 'pending'
//         if (payment.status !== 'pending') {
//             // Maybe return the payment as is, or throw error if strict
//             // throw new Error('Payment not in pending state.');
//             console.warn(`User tried to confirm transfer for payment ${paymentId} with status ${payment.status}. No update performed.`);
//             return payment; // Return current payment if not pending
//         }

//         // Update status to 'in progress'
//         payment.status = 'in progress';
//         await payment.save();

//         // Populate necessary fields for the response if needed
//         return await payment.populate(['balanceCurrency', 'payInCurrency']);

//     } catch (error) {
//         console.error("Error in confirmUserTransfer service:", error);
//         throw error; // Re-throw to be handled by controller
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


// // backend/src/services/payment.service.js
// import Payment from '../models/Payment.js';
// import Currency from '../models/Currency.js';
// import Account from '../models/Account.js';
// import { v4 as uuidv4 } from 'uuid';
// import mongoose from 'mongoose';

// const generateReferenceCode = () => {
//     return `REF-${uuidv4().substring(0, 8).toUpperCase()}`;
// };

// // Mock exchange rate function (replace with actual implementation)
// const getExchangeRate = async (fromCurrencyCode, toCurrencyCode) => {
//     // Example: Replace with your actual rate fetching logic
//     if (fromCurrencyCode === toCurrencyCode) return 1.0; // Rate is 1 if currencies are the same
//     console.warn(`Using mock exchange rate for ${fromCurrencyCode} -> ${toCurrencyCode}`);
//     // Add more mock rates or connect to a real service
//     const rates = {
//         'EUR_USD': 1.08, 'USD_EUR': 1 / 1.08,
//         'GBP_USD': 1.25, 'USD_GBP': 1 / 1.25,
//         'EUR_GBP': 0.86, 'GBP_EUR': 1 / 0.86,
//     };
//     const key = `${fromCurrencyCode}_${toCurrencyCode}`;
//     return rates[key] || 1.0; // Default to 1 if rate not found
// };

// // Mock fee calculation (replace with actual implementation)
// const calculateFees = async (amount, payInCurrencyCode) => {
//     console.warn(`Using mock fees for ${payInCurrencyCode}`);
//     // Example: 0.5% Wise fee + 0.2 unit fixed bank fee
//     const wiseFee = amount * 0.005;
//     const bankTransferFee = 0.2;
//     return { wiseFee, bankTransferFee };
// };


// const getCurrencyBankDetails = async (payInCurrencyCode) => {
//     const currency = await Currency.findOne({ code: payInCurrencyCode.toUpperCase() }).lean();
//     if (currency) {
//         return {
//             payeeName: currency.payeeName,
//             iban: currency.iban,
//             bicSwift: currency.bicSwift,
//             bankAddress: currency.bankAddress,
//         };
//     }
//     return null;
// };

// const calculatePaymentSummary = async (userId, balanceCurrencyCode, payInCurrencyCode, amountToAdd) => {
//     const balanceCurrency = await Currency.findOne({ code: balanceCurrencyCode.toUpperCase() }).lean();
//     const payInCurrency = await Currency.findOne({ code: payInCurrencyCode.toUpperCase() }).lean();

//     if (!balanceCurrency || !payInCurrency) {
//         throw new Error('Invalid currency codes.');
//     }

//     // Get rate for converting PayIn currency TO Balance currency (e.g., how many EUR per AUD)
//     // Let's assume getExchangeRate(PayIn, Balance) gives this rate (e.g., 1 AUD = 0.6 EUR -> rate = 0.6)
//     const exchangeRate = await getExchangeRate(payInCurrencyCode, balanceCurrencyCode);
//     if (exchangeRate <= 0 || !isFinite(exchangeRate)) {
//          throw new Error('Could not determine a valid exchange rate.');
//     }

//     // Calculate fees based on the amount the user needs to *pay*.
//     // This is tricky. Let's assume fees apply *before* conversion.
//     // Amount in PayIn = (AmountToAdd / Rate) + Fees_in_PayIn
//     // Let X = amountToPay. Fees = calculateFees(X, payInCode).
//     // X = (amountToAdd / exchangeRate) + fees.wiseFee + fees.bankTransferFee
//     // This creates a circular dependency if fees are % based on X.
//     // Simpler approach: Calculate fees based on the *target* `amountToAdd` converted approx.
//     const approxAmountToPay = amountToAdd / exchangeRate; // Approx amount in PayIn currency
//     const fees = await calculateFees(approxAmountToPay, payInCurrencyCode);

//     // Final amountToPay: convert target amount, add fees
//     const amountToPay = (amountToAdd / exchangeRate) + fees.wiseFee + fees.bankTransferFee;

//     const paymentSummary = {
//         amountToPay: parseFloat(amountToPay.toFixed(2)),
//         exchangeRate: parseFloat(exchangeRate.toFixed(4)), // Store rate with more precision
//         wiseFee: parseFloat(fees.wiseFee.toFixed(2)),
//         bankTransferFee: parseFloat(fees.bankTransferFee.toFixed(2)),
//         balanceCurrencyCode,
//         payInCurrencyCode,
//         amountToAdd,
//         userId,
//     };

//     return paymentSummary;
// };

// const initiatePaymentAndSave = async (paymentSummary) => {
//     const session = await mongoose.startSession();
//     session.startTransaction();
//     try {
//         const { userId, balanceCurrencyCode, payInCurrencyCode, amountToAdd, amountToPay, exchangeRate, wiseFee, bankTransferFee } = paymentSummary;

//         if (!userId || !balanceCurrencyCode || !payInCurrencyCode || amountToAdd === undefined || amountToPay === undefined || exchangeRate === undefined || wiseFee === undefined || bankTransferFee === undefined) {
//              throw new Error("Missing required payment summary data to initiate payment.");
//         }

//         const balanceCurrency = await Currency.findOne({ code: balanceCurrencyCode.toUpperCase() }).session(session);
//         const payInCurrency = await Currency.findOne({ code: payInCurrencyCode.toUpperCase() }).session(session);

//         if (!balanceCurrency || !payInCurrency) {
//             throw new Error(`Invalid currency code provided: Balance=${balanceCurrencyCode}, PayIn=${payInCurrencyCode}`);
//         }

//         const targetAccount = await Account.findOne({ user: userId, currency: balanceCurrency._id }).session(session);
//         if (!targetAccount) {
//              throw new Error(`User ${userId} does not have an account for currency ${balanceCurrencyCode}. Cannot initiate payment.`);
//         }

//         const referenceCode = generateReferenceCode();
//         const bankDetails = await getCurrencyBankDetails(payInCurrencyCode); // Can be outside transaction

//         const newPayment = new Payment({
//             user: userId,
//             account: targetAccount._id,
//             balanceCurrency: balanceCurrency._id,
//             payInCurrency: payInCurrency._id,
//             amountToAdd,
//             amountToPay,
//             exchangeRate,
//             wiseFee,
//             bankTransferFee,
//             referenceCode,
//             bankDetails,
//             status: 'pending', // Explicitly set initial status
//             // completedAt will be null by default
//         });

//         await newPayment.save({ session });
//         await session.commitTransaction();

//         // Populate necessary fields for the response *after* commit
//         return await Payment.findById(newPayment._id)
//             .populate('user', 'fullName email') // Select specific fields
//             .populate('account', '_id currency') // Select specific fields
//             .populate('balanceCurrency') // Populate full currency object
//             .populate('payInCurrency'); // Populate full currency object

//     } catch (error) {
//         await session.abortTransaction();
//         console.error("Error in initiatePaymentAndSave service:", error);
//         // Rethrow specific errors if needed
//         if (error.message.includes('does not have an account') || error.message.includes('Invalid currency code') || error.message.includes('Missing required')) {
//             throw error;
//         }
//         throw new Error(`Failed to initiate payment: ${error.message}`); // Generic fallback
//     } finally {
//         session.endSession();
//     }
// };

// // Updated to potentially check userId for access control
// const getPaymentDetails = async (paymentId, userId = null) => {
//     if (!mongoose.Types.ObjectId.isValid(paymentId)) {
//         throw new Error('Invalid payment ID format.');
//     }
//     let query = Payment.findById(paymentId);

//     // If userId is provided, add access check (optional)
//     // if (userId) {
//     //     if (!mongoose.Types.ObjectId.isValid(userId)) {
//     //         throw new Error('Invalid user ID format for access check.');
//     //     }
//     //     query = query.where('user').equals(userId);
//     // }

//     const payment = await query
//         .populate('user', 'fullName email')
//         .populate('account', '_id currency')
//         .populate('balanceCurrency') // Populate full object
//         .populate('payInCurrency'); // Populate full object

//     if (!payment) {
//         // Adjust message based on whether userId was checked
//         const message = userId ? 'Payment not found or access denied.' : 'Payment not found.';
//         throw new Error(message);
//     }
//     return payment;
// };


// const getUserBalancePayments = async (userId, balanceCurrencyId) => {
//     if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(balanceCurrencyId)) {
//         throw new Error('Invalid user or currency ID format.');
//     }
//     try {
//         const payments = await Payment.find({
//             user: userId,
//             balanceCurrency: balanceCurrencyId,
//         })
//             .populate('balanceCurrency')
//             .populate('payInCurrency')
//             .sort({ createdAt: 'desc' })
//             .lean();

//          // Add type field
//          const paymentsWithType = payments.map(p => ({ ...p, type: 'payment' }));
//          return paymentsWithType;

//     } catch (error) {
//         console.error("Error fetching payments for balance:", error);
//         throw new Error('Failed to retrieve payment history for balance.');
//     }
// };

// // --- *** MODIFIED cancelPayment with STRICT status check *** ---
// const cancelPayment = async (paymentId, userId) => {
//     console.log(`Service: cancelPayment - Attempting to cancel payment ${paymentId} for user ${userId}`);
//     if (!mongoose.Types.ObjectId.isValid(paymentId) || !mongoose.Types.ObjectId.isValid(userId)) {
//         throw new Error('Invalid payment or user ID format.');
//     }

//     // Note: Transactions might be overkill here unless there are related operations,
//     // but included for consistency if other actions required atomicity.
//     const session = await mongoose.startSession();
//     session.startTransaction();

//     try {
//         // Fetch the payment within the transaction
//         const payment = await Payment.findById(paymentId).session(session);
//         if (!payment) {
//             throw new Error('Payment not found.'); // Will be caught and transaction aborted
//         }

//         // Verify ownership
//         if (!payment.user || payment.user.toString() !== userId.toString()) {
//             console.warn(`Service: cancelPayment - Unauthorized attempt by user ${userId} on payment ${paymentId} owned by ${payment.user?._id}`);
//             throw new Error('Unauthorized cancellation'); // Specific error
//         }

//         // --- *** ADDED STRICT STATUS CHECK *** ---
//         if (payment.status !== 'pending') {
//             console.warn(`Service: cancelPayment - Blocked cancellation for payment ${paymentId}. Current status: '${payment.status}'. Required: 'pending'.`);
//             // Throw specific error for the controller to handle
//             throw new Error(`Cannot cancel payment: Status must be pending (current: '${payment.status}').`);
//         }
//         // --- *** END STRICT STATUS CHECK *** ---

//         // Update status to 'canceled'
//         payment.status = 'canceled';
//         payment.updatedAt = new Date(); // Let timestamps:true handle this, or set explicitly
//         payment.failureReason = payment.failureReason || 'Cancelled by user'; // Add reason
//         payment.completedAt = null; // Ensure completedAt is null

//         await payment.save({ session });
//         await session.commitTransaction();
//         console.log(`Service: cancelPayment - Payment ${paymentId} successfully cancelled.`);

//         // Return the updated payment, populated
//         return await getPaymentDetails(payment._id); // Reuse getPaymentDetails for consistent population

//     } catch (error) {
//         await session.abortTransaction(); // Abort on any error
//         console.error(`Service: cancelPayment - Error cancelling payment ${paymentId}:`, error);
//         // Re-throw specific errors or a general one
//         if (error.message.includes('Payment not found') ||
//             error.message.includes('Unauthorized cancellation') ||
//             error.message.includes('Status must be pending') || // Pass specific status error
//             error.message.includes('Invalid payment or user ID format')) {
//             throw error; // Pass specific known errors
//         }
//         throw new Error(`Failed to cancel payment: ${error.message}`); // Generic fallback
//     } finally {
//          session.endSession();
//     }
// };

// const getUserPayments = async (userId) => {
//      if (!mongoose.Types.ObjectId.isValid(userId)) {
//         throw new Error('Invalid user ID format.');
//     }
//     try {
//         console.log(`Fetching payments for user: ${userId}`);
//          const payments = await Payment.find({ user: userId })
//             .populate('user', 'fullName email')
//             .populate('balanceCurrency') // Populate full objects
//             .populate('payInCurrency')
//             .populate('account', '_id currency')
//             .sort({ createdAt: 'desc' })
//             .lean(); // Use .lean()

//          // --- ADD TYPE FIELD ---
//          const paymentsWithType = payments.map(payment => ({
//             ...payment,
//             type: 'payment' // Add type for frontend
//          }));
//          // --- END ADD TYPE ---

//          console.log(`Found ${paymentsWithType.length} payments for user ${userId}`);
//          return paymentsWithType;
//     } catch (error) {
//          console.error(`Error fetching user payments for ${userId}:`, error);
//          throw new Error('Failed to retrieve payment history.'); // More generic message
//     }
// };


// // Update status when user confirms they've sent the bank transfer
// const confirmUserTransfer = async (paymentId, userId) => {
//     console.log(`Service: confirmUserTransfer - User ${userId} confirms transfer for payment ${paymentId}`);
//     if (!mongoose.Types.ObjectId.isValid(paymentId) || !mongoose.Types.ObjectId.isValid(userId)) {
//         throw new Error('Invalid payment or user ID format.');
//     }
//     const session = await mongoose.startSession();
//     session.startTransaction();
//     try {
//         const payment = await Payment.findById(paymentId).session(session);

//         if (!payment) {
//             throw new Error('Payment not found.');
//         }

//         if (payment.user.toString() !== userId.toString()) {
//             throw new Error('Unauthorized action');
//         }

//         // --- *** ADDED STRICT STATUS CHECK *** ---
//         if (payment.status !== 'pending') {
//             console.warn(`User tried to confirm transfer for payment ${paymentId} with status ${payment.status}. No update performed.`);
//             throw new Error(`Cannot confirm transfer: Payment status is not pending (current: '${payment.status}').`);
//         }
//         // --- *** END STRICT STATUS CHECK *** ---

//         // Update status to 'in progress' (backend verification pending)
//         payment.status = 'in progress';
//         // Mongoose timestamps handle updatedAt
//         payment.completedAt = null; // Ensure completedAt is null

//         await payment.save({ session });
//         await session.commitTransaction();

//         console.log(`Service: confirmUserTransfer - Payment ${paymentId} status updated to 'in progress'.`);

//         // Return populated details
//         return await getPaymentDetails(payment._id);

//     } catch (error) {
//         await session.abortTransaction();
//         console.error(`Service: confirmUserTransfer - Error confirming transfer for payment ${paymentId}:`, error);
//          // Re-throw specific errors
//         if (error.message.includes('Payment not found') ||
//             error.message.includes('Unauthorized action') ||
//             error.message.includes('status is not pending') || // Pass specific status error
//             error.message.includes('Invalid payment or user ID format')) {
//             throw error;
//         }
//         throw new Error(`Failed to confirm user transfer: ${error.message}`); // Generic fallback
//     } finally {
//          session.endSession();
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

// backend/src/services/payment.service.js
import Payment from '../models/Payment.js';
import Currency from '../models/Currency.js'; // Make sure Currency model is imported
import Account from '../models/Account.js';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';

const generateReferenceCode = () => {
    return `REF-${uuidv4().substring(0, 8).toUpperCase()}`;
};

// Mock exchange rate function (replace with actual implementation)
const getExchangeRate = async (fromCurrencyCode, toCurrencyCode) => {
    // Example: Replace with your actual rate fetching logic
    if (fromCurrencyCode === toCurrencyCode) return 1.0; // Rate is 1 if currencies are the same
    console.warn(`Using mock exchange rate for ${fromCurrencyCode} -> ${toCurrencyCode}`);
    // Add more mock rates or connect to a real service
    // Consider fetching and applying Currency.rateAdjustmentPercentage here if needed
    const rates = {
        'EUR_USD': 1.08, 'USD_EUR': 1 / 1.08,
        'GBP_USD': 1.25, 'USD_GBP': 1 / 1.25,
        'EUR_GBP': 0.86, 'GBP_EUR': 1 / 0.86,
    };
    const key = `${fromCurrencyCode}_${toCurrencyCode}`;
    return rates[key] || 1.0; // Default to 1 if rate not found
};

// --- *** UPDATED FEE CALCULATION *** ---
const calculateFees = async (amount, payInCurrencyCode) => {
    console.log(`Calculating fees for ${amount} ${payInCurrencyCode}`);
    const payInCurrency = await Currency.findOne({ code: payInCurrencyCode.toUpperCase() }).lean();

    if (!payInCurrency) {
        console.error(`Fee calculation failed: Currency details not found for ${payInCurrencyCode}`);
        // Decide how to handle: throw error or return zero fees? Throwing is safer.
        throw new Error(`Fee details not found for currency ${payInCurrencyCode}.`);
    }

    // Get fee details from the currency document, using 0 as default if undefined/null
    const wiseFeePercentage = payInCurrency.wiseFeePercentage || 0;
    const fixedBankTransferFee = payInCurrency.bankTransferFee || 0; // Renamed for clarity

    // Calculate Wise fee (percentage-based)
    // Ensure percentage is treated correctly (e.g., 0.5% -> 0.005)
    const calculatedWiseFee = amount * (wiseFeePercentage / 100);

    // Bank transfer fee is a fixed amount from the model
    const calculatedBankTransferFee = fixedBankTransferFee;

    console.log(`Calculated fees: Wise Fee (${wiseFeePercentage}%) = ${calculatedWiseFee.toFixed(4)}, Bank Fee = ${calculatedBankTransferFee.toFixed(4)}`);

    return {
        wiseFee: calculatedWiseFee,
        bankTransferFee: calculatedBankTransferFee
    };
};
// --- *** END UPDATED FEE CALCULATION *** ---


const getCurrencyBankDetails = async (payInCurrencyCode) => {
    const currency = await Currency.findOne({ code: payInCurrencyCode.toUpperCase() }).lean();
    if (currency) {
        return {
            payeeName: currency.payeeName,
            iban: currency.iban,
            bicSwift: currency.bicSwift,
            bankAddress: currency.bankAddress,
        };
    }
    // Consider throwing an error if bank details are expected but not found
    console.warn(`Bank details not found for currency ${payInCurrencyCode}`);
    return null;
};

const calculatePaymentSummary = async (userId, balanceCurrencyCode, payInCurrencyCode, amountToAdd) => {
    // Validate inputs early
    if (!userId || !balanceCurrencyCode || !payInCurrencyCode || typeof amountToAdd !== 'number' || amountToAdd <= 0) {
        throw new Error('Invalid input for calculating payment summary.');
    }

    const balanceCurrency = await Currency.findOne({ code: balanceCurrencyCode.toUpperCase() }).lean();
    const payInCurrency = await Currency.findOne({ code: payInCurrencyCode.toUpperCase() }).lean();

    if (!balanceCurrency || !payInCurrency) {
        throw new Error(`Invalid currency codes provided: Balance=${balanceCurrencyCode}, PayIn=${payInCurrencyCode}`);
    }

    const exchangeRate = await getExchangeRate(payInCurrencyCode, balanceCurrencyCode);
    if (exchangeRate <= 0 || !isFinite(exchangeRate)) {
         throw new Error(`Could not determine a valid exchange rate for ${payInCurrencyCode} to ${balanceCurrencyCode}.`);
    }

    // --- Fee Calculation Integration ---
    // Calculate fees based on the approximate amount needed in the *PayIn* currency
    // This avoids circular dependency (fees depend on amountToPay, amountToPay depends on fees)
    const approxAmountInPayInCurrency = amountToAdd / exchangeRate; // Amount needed before fees
    const fees = await calculateFees(approxAmountInPayInCurrency, payInCurrencyCode); // Use the updated function

    // --- Calculate Final Amount to Pay ---
    // Start with the target amount converted to the pay-in currency
    const targetAmountInPayIn = amountToAdd / exchangeRate;
    // Add the calculated fees (which are already in the pay-in currency)
    const amountToPay = targetAmountInPayIn + fees.wiseFee + fees.bankTransferFee;
    // --- End Calculation ---

    const paymentSummary = {
        amountToPay: parseFloat(amountToPay.toFixed(2)), // Round final amount to 2 decimal places
        exchangeRate: parseFloat(exchangeRate.toFixed(6)), // Store rate with more precision (e.g., 6)
        wiseFee: parseFloat(fees.wiseFee.toFixed(4)), // Store fees with more precision if needed
        bankTransferFee: parseFloat(fees.bankTransferFee.toFixed(4)), // Store fees with more precision if needed
        balanceCurrencyCode,
        payInCurrencyCode,
        amountToAdd: parseFloat(amountToAdd.toFixed(2)), // Ensure target amount is also formatted
        userId,
    };

    console.log("Calculated Payment Summary:", paymentSummary); // Log for debugging
    return paymentSummary;
};

const initiatePaymentAndSave = async (paymentSummary) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { userId, balanceCurrencyCode, payInCurrencyCode, amountToAdd, amountToPay, exchangeRate, wiseFee, bankTransferFee } = paymentSummary;

        // Add more robust validation for numeric fields
        if (!userId || !balanceCurrencyCode || !payInCurrencyCode ||
            typeof amountToAdd !== 'number' || amountToAdd <= 0 ||
            typeof amountToPay !== 'number' || amountToPay <= 0 ||
            typeof exchangeRate !== 'number' || exchangeRate <= 0 ||
            typeof wiseFee !== 'number' || wiseFee < 0 ||
            typeof bankTransferFee !== 'number' || bankTransferFee < 0) {
             throw new Error("Missing or invalid required payment summary data to initiate payment.");
        }

        const balanceCurrency = await Currency.findOne({ code: balanceCurrencyCode.toUpperCase() }).session(session);
        const payInCurrency = await Currency.findOne({ code: payInCurrencyCode.toUpperCase() }).session(session);

        if (!balanceCurrency || !payInCurrency) {
            await session.abortTransaction(); // Abort before throwing
            session.endSession();
            throw new Error(`Invalid currency code provided: Balance=${balanceCurrencyCode}, PayIn=${payInCurrencyCode}`);
        }

        const targetAccount = await Account.findOne({ user: userId, currency: balanceCurrency._id }).session(session);
        if (!targetAccount) {
            await session.abortTransaction(); // Abort before throwing
            session.endSession();
             throw new Error(`User ${userId} does not have an account for currency ${balanceCurrencyCode}. Cannot initiate payment.`);
        }

        const referenceCode = generateReferenceCode();
        const bankDetails = await getCurrencyBankDetails(payInCurrencyCode); // Fetch details (can be outside txn if read-only)

        // Ensure bank details exist if they are required for the payment type
        if (!bankDetails) {
             console.warn(`Initiating payment without bank details for ${payInCurrencyCode}. Ensure this is expected.`);
             // Optionally throw an error if bank details are mandatory:
             // await session.abortTransaction();
             // session.endSession();
             // throw new Error(`Missing required bank details for pay-in currency ${payInCurrencyCode}.`);
        }

        const newPayment = new Payment({
            user: userId,
            account: targetAccount._id,
            balanceCurrency: balanceCurrency._id,
            payInCurrency: payInCurrency._id,
            amountToAdd,
            amountToPay,
            exchangeRate,
            wiseFee,
            bankTransferFee,
            referenceCode,
            bankDetails: bankDetails || {}, // Store fetched details or empty object
            status: 'pending',
        });

        await newPayment.save({ session });
        await session.commitTransaction();
        console.log(`Payment initiated successfully with ID: ${newPayment._id} and Ref: ${referenceCode}`);

        // Populate necessary fields for the response *after* commit
        // Use lean() if you don't need Mongoose documents in the controller
        return await Payment.findById(newPayment._id)
            .populate('user', 'fullName email')
            .populate('account', '_id currency')
            .populate('balanceCurrency')
            .populate('payInCurrency')
            .lean(); // Use .lean() for plain JS object response


    } catch (error) {
        // Ensure transaction is aborted if not already
        if (session.inTransaction()) {
            await session.abortTransaction();
        }
        console.error("Error in initiatePaymentAndSave service:", error);
        // Rethrow specific validation/setup errors directly
        if (error.message.includes('does not have an account') ||
            error.message.includes('Invalid currency code') ||
            error.message.includes('Missing or invalid required') ||
            error.message.includes('Fee details not found')) { // Propagate fee error
            throw error;
        }
        // Generic fallback for other errors
        throw new Error(`Failed to initiate payment: ${error.message}`);
    } finally {
        if (session.active) { // Check if session is still active before ending
           session.endSession();
        }
    }
};

// --- (Keep other functions like getPaymentDetails, getUserBalancePayments, cancelPayment, getUserPayments, confirmUserTransfer as they were, unless they also need fee-related changes) ---
const getPaymentDetails = async (paymentId, userId = null) => {
    if (!mongoose.Types.ObjectId.isValid(paymentId)) {
        throw new Error('Invalid payment ID format.');
    }
    let query = Payment.findById(paymentId);

    // Optional: Add access check if userId is provided
    // if (userId) {
    //     if (!mongoose.Types.ObjectId.isValid(userId)) {
    //         throw new Error('Invalid user ID format for access check.');
    //     }
    //     query = query.where('user').equals(userId);
    // }

    const payment = await query
        .populate('user', 'fullName email')
        .populate('account', '_id currency')
        .populate('balanceCurrency') // Populate full object
        .populate('payInCurrency') // Populate full object
        .lean(); // Use lean() if you primarily need data

    if (!payment) {
        const message = userId ? 'Payment not found or access denied.' : 'Payment not found.';
        throw new Error(message);
    }
    return payment;
};


const getUserBalancePayments = async (userId, balanceCurrencyId) => {
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(balanceCurrencyId)) {
        throw new Error('Invalid user or currency ID format.');
    }
    try {
        const payments = await Payment.find({
            user: userId,
            balanceCurrency: balanceCurrencyId,
        })
            .populate('balanceCurrency')
            .populate('payInCurrency')
            .sort({ createdAt: 'desc' })
            .lean(); // Use lean()

         // Add type field
         const paymentsWithType = payments.map(p => ({ ...p, type: 'payment' }));
         return paymentsWithType;

    } catch (error) {
        console.error("Error fetching payments for balance:", error);
        throw new Error('Failed to retrieve payment history for balance.');
    }
};

const cancelPayment = async (paymentId, userId) => {
    console.log(`Service: cancelPayment - Attempting to cancel payment ${paymentId} for user ${userId}`);
    if (!mongoose.Types.ObjectId.isValid(paymentId) || !mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error('Invalid payment or user ID format.');
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const payment = await Payment.findById(paymentId).session(session);
        if (!payment) {
            throw new Error('Payment not found.');
        }

        if (!payment.user || payment.user.toString() !== userId.toString()) {
            console.warn(`Service: cancelPayment - Unauthorized attempt by user ${userId} on payment ${paymentId} owned by ${payment.user?._id}`);
            throw new Error('Unauthorized cancellation');
        }

        if (payment.status !== 'pending') {
            console.warn(`Service: cancelPayment - Blocked cancellation for payment ${paymentId}. Current status: '${payment.status}'. Required: 'pending'.`);
            throw new Error(`Cannot cancel payment: Status must be pending (current: '${payment.status}').`);
        }

        payment.status = 'canceled';
        payment.failureReason = payment.failureReason || 'Cancelled by user';
        payment.completedAt = null; // Ensure completedAt is null

        await payment.save({ session });
        await session.commitTransaction();
        console.log(`Service: cancelPayment - Payment ${paymentId} successfully cancelled.`);

        // Return the updated payment, populated (using lean() for consistency)
        return await Payment.findById(payment._id)
            .populate('user', 'fullName email')
            .populate('account', '_id currency')
            .populate('balanceCurrency')
            .populate('payInCurrency')
            .lean(); // Use lean()

    } catch (error) {
        if (session.inTransaction()) {
            await session.abortTransaction();
        }
        console.error(`Service: cancelPayment - Error cancelling payment ${paymentId}:`, error);
        if (error.message.includes('Payment not found') ||
            error.message.includes('Unauthorized cancellation') ||
            error.message.includes('Status must be pending') ||
            error.message.includes('Invalid payment or user ID format')) {
            throw error;
        }
        throw new Error(`Failed to cancel payment: ${error.message}`);
    } finally {
        if (session.active) {
            session.endSession();
        }
    }
};

const getUserPayments = async (userId) => {
     if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error('Invalid user ID format.');
    }
    try {
        console.log(`Fetching payments for user: ${userId}`);
         const payments = await Payment.find({ user: userId })
            .populate('user', 'fullName email')
            .populate('balanceCurrency')
            .populate('payInCurrency')
            .populate('account', '_id currency')
            .sort({ createdAt: 'desc' })
            .lean(); // Use .lean()

         const paymentsWithType = payments.map(payment => ({
            ...payment,
            type: 'payment'
         }));

         console.log(`Found ${paymentsWithType.length} payments for user ${userId}`);
         return paymentsWithType;
    } catch (error) {
         console.error(`Error fetching user payments for ${userId}:`, error);
         throw new Error('Failed to retrieve payment history.');
    }
};

const confirmUserTransfer = async (paymentId, userId) => {
    console.log(`Service: confirmUserTransfer - User ${userId} confirms transfer for payment ${paymentId}`);
    if (!mongoose.Types.ObjectId.isValid(paymentId) || !mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error('Invalid payment or user ID format.');
    }
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const payment = await Payment.findById(paymentId).session(session);

        if (!payment) {
            throw new Error('Payment not found.');
        }

        if (payment.user.toString() !== userId.toString()) {
            throw new Error('Unauthorized action');
        }

        if (payment.status !== 'pending') {
            console.warn(`User tried to confirm transfer for payment ${paymentId} with status ${payment.status}. No update performed.`);
            throw new Error(`Cannot confirm transfer: Payment status is not pending (current: '${payment.status}').`);
        }

        payment.status = 'in progress';
        payment.completedAt = null; // Ensure completedAt is null

        await payment.save({ session });
        await session.commitTransaction();

        console.log(`Service: confirmUserTransfer - Payment ${paymentId} status updated to 'in progress'.`);

        // Return populated details (using lean())
        return await Payment.findById(payment._id)
            .populate('user', 'fullName email')
            .populate('account', '_id currency')
            .populate('balanceCurrency')
            .populate('payInCurrency')
            .lean(); // Use lean()

    } catch (error) {
        if (session.inTransaction()) {
            await session.abortTransaction();
        }
        console.error(`Service: confirmUserTransfer - Error confirming transfer for payment ${paymentId}:`, error);
        if (error.message.includes('Payment not found') ||
            error.message.includes('Unauthorized action') ||
            error.message.includes('status is not pending') ||
            error.message.includes('Invalid payment or user ID format')) {
            throw error;
        }
        throw new Error(`Failed to confirm user transfer: ${error.message}`);
    } finally {
        if (session.active) {
           session.endSession();
        }
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