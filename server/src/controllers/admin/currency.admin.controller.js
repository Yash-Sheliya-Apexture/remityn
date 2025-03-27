// backend/src/controllers/admin/currency.admin.controller.js
import currencyAdminService from '../../services/admin/currency.admin.service.js';

const getAllCurrenciesAdmin = async (req, res, next) => {
    try {
        const currencies = await currencyAdminService.getAllCurrenciesAdmin();
        res.json(currencies);
    } catch (error) {
        next(error);
    }
};

const getCurrencyByIdAdmin = async (req, res, next) => {
    try {
        const { currencyId } = req.params;
        const currency = await currencyAdminService.getCurrencyByIdAdmin(currencyId);
        if (!currency) {
            return res.status(404).json({ message: 'Currency not found' });
        }
        res.json(currency);
    } catch (error) {
        next(error);
    }
};

const createCurrencyAdmin = async (req, res, next) => {
    try {
        const { code, payeeName, iban, bicSwift, bankAddress, wiseFeePercentage, bankTransferFee, currencyName, flagImage } = req.body; // Expect flagImage as text input

        const newCurrency = await currencyAdminService.createCurrencyAdmin({
            code: code.toUpperCase(),
            payeeName,
            iban,
            bicSwift,
            bankAddress,
            wiseFeePercentage,
            bankTransferFee,
            flagImage, // Store the provided flagImage path directly
            currencyName,
        });
        res.status(201).json(newCurrency);
    } catch (error) {
        next(error);
    }
};

const updateCurrencyAdmin = async (req, res, next) => {
    try {
        const { currencyId } = req.params;
        const { code, payeeName, iban, bicSwift, bankAddress, wiseFeePercentage, bankTransferFee, currencyName, flagImage } = req.body; // Expect flagImage as text input

        const updatedCurrency = await currencyAdminService.updateCurrencyAdmin(currencyId, {
            code: code.toUpperCase(),
            payeeName,
            iban,
            bicSwift,
            bankAddress,
            wiseFeePercentage,
            bankTransferFee,
            flagImage, // Store the provided flagImage path directly
            currencyName,
        });
        res.json(updatedCurrency);
    } catch (error) {
        next(error);
    }
};

const deleteCurrencyAdmin = async (req, res, next) => {
    try {
        const { currencyId } = req.params;
        await currencyAdminService.deleteCurrencyAdmin(currencyId);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

export default {
    getAllCurrenciesAdmin,
    getCurrencyByIdAdmin,
    createCurrencyAdmin,
    updateCurrencyAdmin,
    deleteCurrencyAdmin,
};