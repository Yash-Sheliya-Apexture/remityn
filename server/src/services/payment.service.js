import Payment from '../models/Payment.js';
import Currency from '../models/Currency.js';
import { v4 as uuidv4 } from 'uuid'; // For generating unique reference codes

const generateReferenceCode = () => {
    return `REF-${uuidv4().substring(0, 8).toUpperCase()}`;
};

// Mock function for exchange rate (replace with real API call or database lookup)
const getExchangeRate = async (fromCurrencyCode, toCurrencyCode) => {
    // In a real application, fetch exchange rates from a reliable API or database
    // For now, returning a mock rate for EUR to AUD (1 EUR = 1.717 AUD as per image)
    if (fromCurrencyCode === 'EUR' && toCurrencyCode === 'AUD') {
        return 1.717;
    }
    if (fromCurrencyCode === 'AUD' && toCurrencyCode === 'EUR') {
        return 1 / 1.717;
    }
    // Add more mock rates or default/error handling as needed
    return 1.0; // Default rate if not found
};


const calculateFees = async (amount, payInCurrencyCode) => { // Make async to fetch currency details
    const currency = await Currency.findOne({ code: payInCurrencyCode.toUpperCase() });
    if (!currency) {
        throw new Error('Currency not found for fee calculation.'); // Handle currency not found
    }

    const wiseFeePercentage = currency.wiseFeePercentage || 0; // Use currency's percentage or default
    const wiseFee = amount * wiseFeePercentage;
    const bankTransferFee = currency.bankTransferFee || 0;      // Use currency's fixed fee or default

    return { wiseFee, bankTransferFee };
};

// Replaced getWiseBankDetails with getCurrencyBankDetails
const getCurrencyBankDetails = async (payInCurrencyCode) => {
    const currency = await Currency.findOne({ code: payInCurrencyCode.toUpperCase() });
    if (currency) {
        return {
            payeeName: currency.payeeName,
            iban: currency.iban,
            bicSwift: currency.bicSwift,
            bankAddress: currency.bankAddress,
        };
    }
    return null;
};


const calculatePaymentSummary = async (userId, balanceCurrencyCode, payInCurrencyCode, amountToAdd) => {
    const balanceCurrency = await Currency.findOne({ code: balanceCurrencyCode.toUpperCase() });
    const payInCurrency = await Currency.findOne({ code: payInCurrencyCode.toUpperCase() });

    if (!balanceCurrency || !payInCurrency) {
        throw new Error('Invalid currency codes.');
    }

    const exchangeRate = await getExchangeRate(payInCurrencyCode, balanceCurrencyCode);
    const fees = await calculateFees(amountToAdd, payInCurrencyCode); // Await the fees calculation
    const amountToPay = (amountToAdd * exchangeRate) + fees.wiseFee + fees.bankTransferFee;

    const paymentSummary = {
        amountToPay,
        exchangeRate,
        wiseFee: fees.wiseFee,
        bankTransferFee: fees.bankTransferFee,
        balanceCurrencyCode,
        payInCurrencyCode,
        amountToAdd,
        userId,
    };

    return paymentSummary;
};


const initiatePaymentAndSave = async (paymentSummary) => {
    try { // ADD TRY-CATCH BLOCK
        const { userId, balanceCurrencyCode, payInCurrencyCode, amountToAdd, amountToPay, exchangeRate, wiseFee, bankTransferFee } = paymentSummary;

        const balanceCurrency = await Currency.findOne({ code: balanceCurrencyCode.toUpperCase() });
        const payInCurrency = await Currency.findOne({ code: payInCurrencyCode.toUpperCase() });
        const referenceCode = generateReferenceCode();
        const bankDetails = await getCurrencyBankDetails(payInCurrencyCode);


        const newPayment = new Payment({
            user: userId,
            balanceCurrency: balanceCurrency._id,
            payInCurrency: payInCurrency._id,
            amountToAdd,
            amountToPay,
            exchangeRate,
            wiseFee,
            bankTransferFee,
            referenceCode,
            bankDetails,
        });

        await newPayment.save();
        return await newPayment.populate(['balanceCurrency', 'payInCurrency']);
    } catch (error) { // CATCH ERROR
        console.error("Error in initiatePaymentAndSave service:", error); // LOG ERROR
        throw error; // Re-throw the error so controller's error handler can catch it
    }
};


const getPaymentDetails = async (paymentId) => {
    return await Payment.findById(paymentId).populate(['balanceCurrency', 'payInCurrency']);
};


export default {
    calculatePaymentSummary,
    initiatePaymentAndSave,
    getPaymentDetails,
};