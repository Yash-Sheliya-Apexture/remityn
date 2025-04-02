// // backend/src/services/currency.service.js
// import Currency from '../models/Currency.js';

// const getAllCurrencies = async () => {
//     return await Currency.find();
// };

// export default {
//     getAllCurrencies,
// };

// backend/src/services/currency.service.js
import Currency from '../models/Currency.js';

// Include 'rateAdjustmentPercentage' instead of 'customRateToBase'
const getAllCurrencies = async (includeRates = false) => {
    const selection = 'code currencyName flagImage' + (includeRates ? ' rateAdjustmentPercentage' : '');
    return await Currency.find().select(selection).sort({ code: 1 });
};

export default {
    getAllCurrencies,
};