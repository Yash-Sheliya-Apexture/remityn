// backend/src/services/currency.service.js
import Currency from '../models/Currency.js';

const getAllCurrencies = async () => {
    return await Currency.find();
};

export default {
    getAllCurrencies,
};