import Currency from '../../models/Currency.js';

const getAllCurrenciesAdmin = async () => {
    return await Currency.find();
};

const getCurrencyByIdAdmin = async (currencyId) => {
    return await Currency.findById(currencyId);
};

const createCurrencyAdmin = async ({ code, payeeName, iban, bicSwift, bankAddress, wiseFeePercentage, bankTransferFee }) => { // Accept fee fields
    if (!code) {
        throw new Error('Currency code is required.');
    }
    const existingCurrency = await Currency.findOne({ code: code.toUpperCase() });
    if (existingCurrency) {
        throw new Error('Currency with this code already exists.');
    }
    const newCurrency = new Currency({
        code: code.toUpperCase(),
        payeeName,
        iban,
        bicSwift,
        bankAddress,
        wiseFeePercentage, // Save fee percentages
        bankTransferFee,
    });
    await newCurrency.save();
    return newCurrency;
};

const updateCurrencyAdmin = async (currencyId, { code, payeeName, iban, bicSwift, bankAddress, wiseFeePercentage, bankTransferFee }) => { // Accept fee fields
    if (!code) {
        throw new Error('Currency code is required.');
    }
    const currency = await Currency.findById(currencyId);
    if (!currency) {
        throw new Error('Currency not found.');
    }
    currency.code = code.toUpperCase();
    currency.payeeName = payeeName;
    currency.iban = iban;
    currency.bicSwift = bicSwift;
    currency.bankAddress = bankAddress;
    currency.wiseFeePercentage = wiseFeePercentage; // Update fee percentages
    currency.bankTransferFee = bankTransferFee;
    await currency.save();
    return currency;
};

const deleteCurrencyAdmin = async (currencyId) => {
    const currency = await Currency.findById(currencyId);
    if (!currency) {
        throw new Error('Currency not found.');
    }
    await Currency.findByIdAndDelete(currencyId);
};

export default {
    getAllCurrenciesAdmin,
    getCurrencyByIdAdmin,
    createCurrencyAdmin,
    updateCurrencyAdmin,
    deleteCurrencyAdmin,
};