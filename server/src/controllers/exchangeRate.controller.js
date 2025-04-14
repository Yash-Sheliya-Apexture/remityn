// // backend/src/controllers/exchangeRate.controller.js
// import exchangeRateService from '../services/exchangeRate.service.js';

// const getExchangeRates = async (req, res, next) => {
//     console.log('Controller: getExchangeRates - Start'); // Log at the start of the controller
//     try {
//         const exchangeRatesData = await exchangeRateService.getLatestExchangeRates();
//         console.log('Controller: getExchangeRates - Data from service:', exchangeRatesData); // Log data from service

//         if (!exchangeRatesData) {
//             console.log('Controller: getExchangeRates - No data found in service, sending 404'); // Log if no data
//             return res.status(404).json({ message: 'Exchange rates data not found. Please try again later.' });
//         }

//         console.log('Controller: getExchangeRates - Sending rates to frontend:', exchangeRatesData.rates); // Log rates being sent
//         res.json({ rates: exchangeRatesData.rates }); // Send the rates object within an object
//     } catch (error) {
//         console.error('Controller: getExchangeRates - Error:', error); // Log any errors
//         next(error);
//     } finally {
//         console.log('Controller: getExchangeRates - End'); // Log at the end of the controller
//     }
// };

// export default {
//     getExchangeRates,
// };

// backend/src/controllers/exchangeRate.controller.js
import exchangeRateService from '../services/exchangeRate.service.js';

const getExchangeRates = async (req, res, next) => {
    console.log('Controller: getExchangeRates - Start'); // Log at the start of the controller
    try {
        const exchangeRatesData = await exchangeRateService.getLatestExchangeRates();
        console.log('Controller: getExchangeRates - Data from service:', exchangeRatesData); // Log data from service

        if (!exchangeRatesData || !exchangeRatesData.rates) { // Check if exchangeRatesData or exchangeRatesData.rates is null/undefined
            console.log('Controller: getExchangeRates - No data found in service or rates are missing, sending 404'); // Log if no data or rates missing
            return res.status(404).json({ message: 'Exchange rates data not found. Please try again later.' });
        }

        console.log('Controller: getExchangeRates - Sending rates to frontend:', exchangeRatesData.rates); // Log rates being sent
        res.json({ rates: exchangeRatesData.rates }); // Send the rates object within an object
    } catch (error) {
        console.error('Controller: getExchangeRates - Error:', error); // Log any errors
        next(error);
    } finally {
        console.log('Controller: getExchangeRates - End'); // Log at the end of the controller
    }
};



export default {
    getExchangeRates,
};