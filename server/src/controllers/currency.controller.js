import currencyService from '../services/currency.service.js';

const getAllCurrencies = async (req, res, next) => {
    try {
        const currencies = await currencyService.getAllCurrencies();
        res.json(currencies);
    } catch (error) {
        next(error);
    }
};

export default {
    getAllCurrencies,
};