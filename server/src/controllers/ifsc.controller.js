// backend/src/controllers/ifsc.controller.js
import ifscService from '../services/ifsc.service.js';

const getBankDetailsByIFSC = async (req, res, next) => {
    const { ifscCode } = req.params;
    if (!ifscCode) {
        return res.status(400).json({ message: 'IFSC code is required.' });
    }

    try {
        const bankDetails = await ifscService.getBankDetailsByIFSC(ifscCode.toUpperCase()); // Convert IFSC to uppercase
        res.json(bankDetails);
    } catch (error) {
        next(error); // Pass error to error handling middleware
    }
};

export default {
    getBankDetailsByIFSC,
};