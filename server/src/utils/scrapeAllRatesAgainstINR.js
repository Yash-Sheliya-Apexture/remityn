// // backend/src/utils/scrapeAllRatesAgainstINR.js
// // Import the specific browser you want to use (e.g., chromium, firefox, webkit)
// import { chromium } from 'playwright'; // We'll use chromium

// // --- Configuration ---
// const GOOGLE_FINANCE_BASE_URL = 'https://www.google.com/finance/quote/'; // Append CURRENCY_CODE-INR

// // Selector (STILL NEEDS TO BE VERIFIED FOR CONSISTENCY ACROSS PAGES!)
// // Find a selector that works for the main rate on pages like USD-INR, EUR-INR, GBP-INR, etc.
// // Inspect the element on multiple pages to confirm.
// const RATE_SELECTOR = 'div[data-last-price]'; // This is a common pattern, but VERIFY IT IS CORRECT AND CONSISTENT!
// // Example alternative (likely unstable):
// // const RATE_SELECTOR = '.YMlKec.fxKbKc'; // This class is very likely to change and might not be consistent across all pairs!


// // --- Scraper Function ---
// /**
//  * Scrapes exchange rates for a list of target currencies against INR from Google Finance using Playwright.
//  * @param {string[]} targetCurrencyCodes - Array of currency codes (e.g., ['USD', 'EUR', 'GBP'])
//  * @returns {Promise<{[currencyCode: string]: number} | null>} An object mapping currency code to rate (e.g., { USD: 84.70, EUR: 94.05 }), or null if major failure occurs.
//  */
// async function scrapeAllRatesAgainstINR(targetCurrencyCodes) {
//     if (!targetCurrencyCodes || targetCurrencyCodes.length === 0) {
//         console.log('Scraper: No target currency codes provided.');
//         return {}; // Return empty object if no currencies to scrape
//     }

//     let browser;
//     let context; // Playwright uses contexts
//     const scrapedRates = {};
//     const failedScrapes = [];

//     console.log('Scraper: Starting Playwright browser (Chromium)...');
//     try {
//         browser = await chromium.launch({
//             headless: true, // Use true for production
//             args: [
//                 '--no-sandbox',
//                 '--disable-setuid-sandbox',
//                 '--disable-dev-shm-usage',
//                 '--disable-accelerated-2d-canvas',
//                 '--no-first-run',
//                 '--no-zygote',
//                 '--disable-gpu'
//             ]
//         });
//         // Create a new browser context for isolation
//         context = await browser.newContext({
//              userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' // Set user agent
//              // Add other context options if needed (like permissions, ignoreHTTPSErrors)
//         });

//         const page = await context.newPage(); // Create a new page within the context


//         // --- Iterate and Scrape Each Currency ---
//         for (const code of targetCurrencyCodes) {
//             const url = `${GOOGLE_FINANCE_BASE_URL}${code}-INR`;
//             console.log(`Scraper: Navigating to ${url}`);

//             try {
//                 // Use goto with 'domcontentloaded', increased timeout
//                 await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 }); // Increased timeout

//                 console.log(`Scraper: Waiting for rate selector: ${RATE_SELECTOR}`);
//                 // Wait for the rate element to be visible
//                 // Playwright's waitForSelector is powerful, 'state: "visible"' is good.
//                 await page.waitForSelector(RATE_SELECTOR, { state: 'visible', timeout: 15000 }); // Increased timeout

//                 console.log(`Scraper: Selector found for ${code}-INR. Extracting data...`);

//                 // Extract the rate using page.evaluate()
//                 // This is similar to Puppeteer's page.$eval
//                 const rateText = await page.evaluate((selector) => {
//                     const el = document.querySelector(selector);
//                     if (el) {
//                         // Try data-last-price attribute first, then text content
//                         return el.getAttribute('data-last-price') || el.textContent.trim();
//                     }
//                     return null; // Return null if element not found within evaluate
//                 }, RATE_SELECTOR); // Pass the selector to the evaluate function

//                 if (rateText === null) {
//                      console.warn(`Scraper: Selector ${RATE_SELECTOR} not found on page for ${code}-INR after waiting.`);
//                      failedScrapes.push(code);
//                      continue; // Skip to the next currency
//                 }

//                 const rate = parseFloat(rateText);

//                 if (isNaN(rate)) {
//                     console.warn(`Scraper: Extracted value "${rateText}" for ${code}-INR is not a number. Skipping.`);
//                     failedScrapes.push(code);
//                 } else {
//                     // Store the rate, using the target currency code as the key
//                     scrapedRates[code] = rate;
//                     console.log(`Scraper: Scraped ${code}/INR rate: ${rate}`);
//                 }

//             } catch (error) {
//                 console.error(`Scraper: Error scraping ${code}/INR from ${url}:`, error.message);
//                 failedScrapes.push(code);
//                 // Continue to the next currency even if one fails
//             }
//         }

//         console.log('Scraper: Scraping iteration completed.');
//         if (failedScrapes.length > 0) {
//             console.warn('Scraper: Failed to scrape rates for:', failedScrapes.join(', '));
//         }

//         // Check if any rates were successfully scraped
//         if (Object.keys(scrapedRates).length === 0 && targetCurrencyCodes.length > 0) {
//             console.error('Scraper: No rates were successfully scraped for any currency.');
//             // Return null or throw an error if no data at all is considered a critical failure
//             return null;
//         }

//         console.log('Scraper: Returning scraped rates object:', scrapedRates);
//         return scrapedRates; // Return the object of successfully scraped rates

//     } catch (browserError) {
//         console.error('Scraper: Major error during browser setup or navigation:', browserError);
//         // Return null or throw an error if the browser itself fails
//         return null;
//     } finally {
//         if (context) { // Close context first
//              await context.close();
//         }
//         if (browser) { // Then close the browser
//             await browser.close();
//             console.log('Scraper: Playwright browser closed.');
//         }
//     }
// }

// export default scrapeAllRatesAgainstINR;


// // backend/src/utils/scrapeAllRatesAgainstINR.js
// // Import the specific browser you want to use (e.g., chromium, firefox, webkit)
// import { chromium } from 'playwright'; // We'll use chromium

// // --- Configuration ---
// const GOOGLE_FINANCE_BASE_URL = 'https://www.google.com/finance/quote/'; // Append CURRENCY_CODE-INR

// // Selector (STILL NEEDS TO BE VERIFIED FOR CONSISTENCY ACROSS PAGES!)
// // Find a selector that works for the main rate on pages like USD-INR, EUR-INR, GBP-INR, etc.
// // Inspect the element on multiple pages to confirm.
// const RATE_SELECTOR = 'div[data-last-price]'; // This is a common pattern, but VERIFY IT IS CORRECT AND CONSISTENT!
// // Example alternative (likely unstable):
// // const RATE_SELECTOR = '.YMlKec.fxKbKc'; // This class is very likely to change and might not be consistent across all pairs!


// // --- Scraper Function ---
// /**
//  * Scrapes exchange rates for a list of target currencies against INR from Google Finance using Playwright.
//  * @param {string[]} targetCurrencyCodes - Array of currency codes (e.g., ['USD', 'EUR', 'GBP'])
//  * @returns {Promise<{[currencyCode: string]: number} | null>} An object mapping currency code to rate (e.g., { USD: 84.70, EUR: 94.05 }), or null if major failure occurs.
//  */
// async function scrapeAllRatesAgainstINR(targetCurrencyCodes) {
//     if (!targetCurrencyCodes || targetCurrencyCodes.length === 0) {
//         console.log('Scraper: No target currency codes provided.');
//         return {}; // Return empty object if no currencies to scrape
//     }

//     let browser;
//     let context; // Playwright uses contexts
//     const scrapedRates = {};
//     const failedScrapes = [];

//     console.log('Scraper: Starting Playwright browser (Chromium)...');
//     try {
//         browser = await chromium.launch({
//             headless: true, // Use true for production
//             args: [
//                 '--no-sandbox',
//                 '--disable-setuid-sandbox',
//                 '--disable-dev-shm-usage',
//                 '--disable-accelerated-2d-canvas',
//                 '--no-first-run',
//                 '--no-zygote',
//                 '--disable-gpu'
//             ]
//         });
//         // Create a new browser context for isolation
//         context = await browser.newContext({
//              userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' // Set user agent
//              // Add other context options if needed (like permissions, ignoreHTTPSErrors)
//         });


//         // --- Iterate and Scrape Each Currency ---
//         for (const code of targetCurrencyCodes) {
//             const url = `${GOOGLE_FINANCE_BASE_URL}${code}-INR`;
//             console.log(`Scraper: Navigating to ${url}`);

//             let page; // Declare page here, will be created for each currency
//             try {
//                 page = await context.newPage(); // <--- Create a NEW page for each currency
                
//                 // Use goto with 'domcontentloaded', increased timeout
//                 await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 }); // Increased timeout

//                 console.log(`Scraper: Waiting for rate selector: ${RATE_SELECTOR}`);
//                 // Wait for the rate element to be visible
//                 await page.waitForSelector(RATE_SELECTOR, { state: 'visible', timeout: 15000 }); // Increased timeout

//                 console.log(`Scraper: Selector found for ${code}-INR. Extracting data...`);

//                 // Extract the rate using page.evaluate()
//                 const rateText = await page.evaluate((selector) => {
//                     const el = document.querySelector(selector);
//                     if (el) {
//                         // Try data-last-price attribute first, then text content
//                         return el.getAttribute('data-last-price') || el.textContent.trim();
//                     }
//                     return null; // Return null if element not found within evaluate
//                 }, RATE_SELECTOR); // Pass the selector to the evaluate function

//                 if (rateText === null) {
//                      console.warn(`Scraper: Selector ${RATE_SELECTOR} not found on page for ${code}-INR after waiting.`);
//                      failedScrapes.push(code);
//                      continue; // Skip to the next currency
//                 }

//                 const rate = parseFloat(rateText);

//                 if (isNaN(rate)) {
//                     console.warn(`Scraper: Extracted value "${rateText}" for ${code}-INR is not a number. Skipping.`);
//                     failedScrapes.push(code);
//                 } else {
//                     // Store the rate, using the target currency code as the key
//                     scrapedRates[code] = rate;
//                     console.log(`Scraper: Scraped ${code}/INR rate: ${rate}`);
//                 }

//             } catch (error) {
//                 console.error(`Scraper: Error scraping ${code}/INR from ${url}:`, error.message);
//                 failedScrapes.push(code);
//                 // Continue to the next currency even if one fails
//             } finally { // <--- IMPORTANT: Ensure each page is closed after use
//                 if (page) {
//                     try {
//                         await page.close();
//                     } catch (closeError) {
//                         console.warn(`Scraper: Error closing page for ${code}:`, closeError.message);
//                     }
//                 }
//             }
//         }

//         console.log('Scraper: Scraping iteration completed.');
//         if (failedScrapes.length > 0) {
//             console.warn('Scraper: Failed to scrape rates for:', failedScrapes.join(', '));
//         }

//         // Check if any rates were successfully scraped
//         if (Object.keys(scrapedRates).length === 0 && targetCurrencyCodes.length > 0) {
//             console.error('Scraper: No rates were successfully scraped for any currency.');
//             // Return null or throw an error if no data at all is considered a critical failure
//             return null;
//         }

//         console.log('Scraper: Returning scraped rates object:', scrapedRates);
//         return scrapedRates; // Return the object of successfully scraped rates

//     } catch (browserError) {
//         console.error('Scraper: Major error during browser setup or navigation:', browserError);
//         // Return null or throw an error if the browser itself fails
//         return null;
//     } finally {
//         if (context) { // Close context first
//              await context.close();
//         }
//         if (browser) { // Then close the browser
//             await browser.close();
//             console.log('Scraper: Playwright browser closed.');
//         }
//     }
// }

// export default scrapeAllRatesAgainstINR;



// // backend/src/utils/scrapeAllRatesAgainstINR.js
// import { chromium } from 'playwright';

// const GOOGLE_FINANCE_BASE_URL = 'https://www.google.com/finance/quote/';
// const RATE_SELECTOR = 'div[data-last-price]';

// async function scrapeAllRatesAgainstINR(targetCurrencyCodes) {
//     if (!targetCurrencyCodes || targetCurrencyCodes.length === 0) {
//         console.log('Scraper: No target currency codes provided.');
//         return {};
//     }

//     let browser;
//     let context;
//     const scrapedRates = {};
//     const failedScrapes = [];

//     console.log('Scraper: Starting Playwright browser (Chromium)...');
//     try {
//         browser = await chromium.launch({
//             headless: true,
//             // --- CRITICAL LAUNCH ARGUMENTS FOR LINUX SERVER/EC2 ---
//             args: [
//                 '--no-sandbox',                // Required for running as root/in a containerized env
//                 '--disable-setuid-sandbox',    // Disables the setuid sandbox (often needed)
//                 '--disable-dev-shm-usage',     // Prevents issues with small /dev/shm size
//                 '--disable-accelerated-2d-canvas',
//                 '--no-first-run',
//                 '--no-zygote',
//                 '--single-process',            // Use a single process (helps in low-memory envs)
//                 '--disable-gpu'                // Disable GPU hardware acceleration
//             ]
//         });

//         context = await browser.newContext({
//              userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
//              // Ignore HTTPS errors which can sometimes occur on servers
//              ignoreHTTPSErrors: true
//         });

//         for (const code of targetCurrencyCodes) {
//             // Check if browser is still connected before processing next currency
//             if (!browser.isConnected()) {
//                 console.error(`Scraper: Browser disconnected before scraping ${code}. Aborting loop.`);
//                 // Add all remaining codes to failedScrapes
//                 const currentIndex = targetCurrencyCodes.indexOf(code);
//                 failedScrapes.push(...targetCurrencyCodes.slice(currentIndex));
//                 break; // Exit the loop
//             }

//             const url = `${GOOGLE_FINANCE_BASE_URL}${code}-INR`;
//             console.log(`Scraper: Navigating to ${url}`);

//             let page;
//             try {
//                 page = await context.newPage();
//                 // Increased timeout and changed wait condition for more reliability
//                 await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
//                 await page.waitForSelector(RATE_SELECTOR, { state: 'visible', timeout: 20000 });

//                 const rateText = await page.evaluate((selector) => {
//                     const el = document.querySelector(selector);
//                     return el ? (el.getAttribute('data-last-price') || el.textContent.trim()) : null;
//                 }, RATE_SELECTOR);

//                 if (rateText === null) {
//                      console.warn(`Scraper: Selector ${RATE_SELECTOR} not found for ${code}-INR.`);
//                      failedScrapes.push(code);
//                      continue;
//                 }
                
//                 // Handle numbers with commas
//                 const rate = parseFloat(rateText.replace(/,/g, ''));

//                 if (isNaN(rate)) {
//                     console.warn(`Scraper: Extracted value "${rateText}" for ${code}-INR is not a number.`);
//                     failedScrapes.push(code);
//                 } else {
//                     scrapedRates[code] = rate;
//                     console.log(`Scraper: Scraped ${code}/INR rate: ${rate}`);
//                 }
//             } catch (error) {
//                 console.error(`Scraper: Error scraping ${code}/INR from ${url}:`, error.message);
//                 failedScrapes.push(code);
//             } finally {
//                 if (page && !page.isClosed()) {
//                     await page.close();
//                 }
//             }
//         }

//     } catch (browserError) {
//         console.error('Scraper: Major error during browser setup or main loop:', browserError);
//         return null;
//     } finally {
//         // --- DEFENSIVE CLEANUP ---
//         // This ensures that we attempt to close everything, even if one part has already crashed.
//         if (browser && browser.isConnected()) {
//             console.log('Scraper: Closing Playwright browser.');
//             await browser.close();
//         } else {
//             console.log('Scraper: Browser was not connected or already closed.');
//         }
//     }
    
//     if (Object.keys(scrapedRates).length === 0 && targetCurrencyCodes.length > 0) {
//         console.error('Scraper: Critical failure - no rates were successfully scraped.');
//         return null;
//     }

//     if (failedScrapes.length > 0) {
//         console.warn('Scraper: Failed to scrape rates for:', failedScrapes.join(', '));
//     }

//     console.log('Scraper: Returning scraped rates object:', scrapedRates);
//     return scrapedRates;
// }

// export default scrapeAllRatesAgainstINR;


// // backend/src/utils/scrapeAllRatesAgainstINR.js
// import { chromium } from 'playwright';

// const GOOGLE_FINANCE_BASE_URL = 'https://www.google.com/finance/quote/';
// const RATE_SELECTOR = 'div[data-last-price]';
// // **KEY CHANGE**: Set a limit for how many pages to scrape at once.
// // 2 or 3 is a safe and effective number for most servers and to avoid IP blocks.
// const CONCURRENCY_LIMIT = 2;

// /**
//  * Scrapes the rate for a single currency pair against INR.
//  * This function is designed to be run in parallel.
//  * @param {string} code - The currency code (e.g., 'USD').
//  * @param {import('playwright').BrowserContext} context - The Playwright browser context to use.
//  * @returns {Promise<{code: string, rate: number}|{code: string, error: string}>}
//  */
// async function scrapeSingleRate(code, context) {
//     const url = `${GOOGLE_FINANCE_BASE_URL}${code}-INR`;
//     let page;
//     try {
//         page = await context.newPage();
//         await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

//         const rateLocator = page.locator(RATE_SELECTOR).first();
//         await rateLocator.waitFor({ state: 'visible', timeout: 45000 });

//         const rateText = await rateLocator.getAttribute('data-last-price');
//         if (!rateText) throw new Error(`Attribute 'data-last-price' not found`);

//         const rate = parseFloat(rateText.replace(/,/g, ''));
//         if (isNaN(rate)) throw new Error(`Parsed value "${rateText}" is not a number`);

//         // Log success only for clarity, not for every run.
//         // console.log(`Scraper: SUCCESS for ${code}/INR -> ${rate}`);
//         return { code, rate };

//     } catch (error) {
//         console.error(`Scraper: FAILED for ${code}/INR: ${error.message}`);
//         return { code, error: error.message };
//     } finally {
//         if (page && !page.isClosed()) {
//             await page.close();
//         }
//     }
// }

// /**
//  * Main scraper function that launches a browser and runs currency scrapes in controlled parallel batches.
//  * @param {string[]} targetCurrencyCodes - Array of currency codes to scrape.
//  * @returns {Promise<Object|null>} - An object of scraped rates or null on critical failure.
//  */
// async function scrapeAllRatesAgainstINR(targetCurrencyCodes) {
//     if (!targetCurrencyCodes || targetCurrencyCodes.length === 0) {
//         console.log('Scraper: No target currency codes provided.');
//         return {};
//     }

//     let browser;
//     const allResults = [];

//     console.log(`Scraper: Starting batched scrape for ${targetCurrencyCodes.length} currencies (Concurrency: ${CONCURRENCY_LIMIT})...`);
//     try {
//         browser = await chromium.launch({
//             headless: true,
//             args: [
//                 '--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage',
//                 '--disable-accelerated-2d-canvas', '--no-first-run', '--no-zygote',
//                 '--disable-gpu', '--disable-extensions'
//             ]
//         });

//         const context = await browser.newContext({
//              userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
//              ignoreHTTPSErrors: true
//         });

//         // **KEY CHANGE**: Process the currencies in batches.
//         for (let i = 0; i < targetCurrencyCodes.length; i += CONCURRENCY_LIMIT) {
//             const batch = targetCurrencyCodes.slice(i, i + CONCURRENCY_LIMIT);
//             console.log(`Scraper: Processing batch ${i / CONCURRENCY_LIMIT + 1}: [${batch.join(', ')}]`);

//             const batchPromises = batch.map(code => scrapeSingleRate(code, context));
//             const batchResult = await Promise.allSettled(batchPromises);
//             allResults.push(...batchResult);

//             // Optional: Add a small delay between batches to be even more "polite"
//             if (i + CONCURRENCY_LIMIT < targetCurrencyCodes.length) {
//                 await new Promise(resolve => setTimeout(resolve, 1000)); // 1-second delay
//             }
//         }

//     } catch (browserError) {
//         console.error('Scraper: Major error during browser setup or batch execution:', browserError);
//         return null;
//     } finally {
//         if (browser && browser.isConnected()) {
//             console.log('Scraper: Closing Playwright browser.');
//             await browser.close();
//         }
//     }

//     // Process the results collected from all batches
//     const scrapedRates = {};
//     const failedScrapes = [];
//     allResults.forEach(result => {
//         if (result.status === 'fulfilled' && result.value) {
//             const { code, rate, error } = result.value;
//             if (error) {
//                 failedScrapes.push(code);
//             } else {
//                 scrapedRates[code] = rate;
//             }
//         } else if (result.status === 'rejected') {
//             // This case should be rare since scrapeSingleRate catches its own errors
//             console.error(`Scraper: A promise was unexpectedly rejected:`, result.reason);
//         }
//     });

//     if (Object.keys(scrapedRates).length === 0 && targetCurrencyCodes.length > 0) {
//         console.error('Scraper: Critical failure - no rates were successfully scraped.');
//         return null;
//     }

//     if (failedScrapes.length > 0) {
//         console.warn('Scraper: Failed to scrape rates for:', failedScrapes.join(', '));
//     }

//     console.log(`Scraper: Finished batched scrape. Success: ${Object.keys(scrapedRates).length}, Failed: ${failedScrapes.length}`);
//     return scrapedRates;
// }

// export default scrapeAllRatesAgainstINR;


import { chromium } from 'playwright';

const GOOGLE_FINANCE_BASE_URL = 'https://www.google.com/finance/quote/';
const RATE_SELECTOR = 'div[data-last-price]';
const CONCURRENCY_LIMIT = 2;
// **IMPROVEMENT 1: Added retry logic for individual scrapes**
const MAX_RETRIES = 2; // Each currency will be tried up to 3 times (1 initial + 2 retries)

/**
 * Scrapes the rate for a single currency pair against INR with retry logic.
 * @param {string} code - The currency code (e.g., 'USD').
 * @param {import('playwright').BrowserContext} context - The Playwright browser context.
 * @returns {Promise<{code: string, rate: number}|{code: string, error: string}>}
 */
async function scrapeSingleRate(code, context) {
    const url = `${GOOGLE_FINANCE_BASE_URL}${code}-INR`;
    let page;

    // **IMPROVEMENT 1 (continued): Retry loop**
    for (let attempt = 1; attempt <= MAX_RETRIES + 1; attempt++) {
        try {
            page = await context.newPage();

            // **IMPROVEMENT 2: Use 'networkidle' for more reliable waiting on dynamic pages**
            // and increased overall timeout for the navigation.
            await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });

            // **IMPROVEMENT 3: Handle cookie/consent pop-ups that can block the view.**
            // This looks for common button texts and clicks them if found. It has a short timeout
            // so it doesn't slow things down if the pop-up isn't there.
            const consentButton = page.locator(
                'button:has-text("Reject all"), button:has-text("Accept all"), button:has-text("I agree")'
            ).first();
            try {
                await consentButton.click({ timeout: 5000 });
                console.log(`Scraper: Handled consent pop-up for ${code}/INR.`);
            } catch (e) {
                // This is expected if no pop-up appears. Do nothing.
            }

            const rateLocator = page.locator(RATE_SELECTOR).first();
            // **IMPROVEMENT 4: Increased timeout for finding the element to match the page load timeout.**
            await rateLocator.waitFor({ state: 'visible', timeout: 60000 });

            const rateText = await rateLocator.getAttribute('data-last-price');
            if (!rateText) throw new Error(`Attribute 'data-last-price' not found`);

            const rate = parseFloat(rateText.replace(/,/g, ''));
            if (isNaN(rate)) throw new Error(`Parsed value "${rateText}" is not a number`);

            // Success! Close the page and return the result.
            await page.close();
            return { code, rate };

        } catch (error) {
            console.error(`Scraper: FAILED for ${code}/INR (Attempt ${attempt}/${MAX_RETRIES + 1}): ${error.message.split('\n')[0]}`);
            if (page && !page.isClosed()) {
                await page.close();
            }

            if (attempt > MAX_RETRIES) {
                // If this was the last attempt, return the error
                return { code, error: error.message };
            }
            // Wait for a short period before retrying
            await new Promise(resolve => setTimeout(resolve, 2000 * attempt)); // wait 2s, 4s
        }
    }
}


/**
 * Main scraper function that launches a browser and runs currency scrapes in controlled parallel batches.
 * @param {string[]} targetCurrencyCodes - Array of currency codes to scrape.
 * @returns {Promise<Object|null>} - An object of scraped rates or null on critical failure.
 */
async function scrapeAllRatesAgainstINR(targetCurrencyCodes) {
    if (!targetCurrencyCodes || targetCurrencyCodes.length === 0) {
        console.log('Scraper: No target currency codes provided.');
        return {};
    }

    let browser;
    const allResults = [];

    console.log(`Scraper: Starting batched scrape for ${targetCurrencyCodes.length} currencies (Concurrency: ${CONCURRENCY_LIMIT})...`);
    try {
        browser = await chromium.launch({
            headless: true,
            args: [
                '--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas', '--no-first-run', '--no-zygote',
                '--disable-gpu', '--disable-extensions'
            ]
        });

        // Set a realistic user-agent and viewport to better mimic a real browser
        const context = await browser.newContext({
             userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
             ignoreHTTPSErrors: true,
             viewport: { width: 1280, height: 800 }
        });

        for (let i = 0; i < targetCurrencyCodes.length; i += CONCURRENCY_LIMIT) {
            const batch = targetCurrencyCodes.slice(i, i + CONCURRENCY_LIMIT);
            console.log(`Scraper: Processing batch ${i / CONCURRENCY_LIMIT + 1}: [${batch.join(', ')}]`);

            const batchPromises = batch.map(code => scrapeSingleRate(code, context));
            const batchResult = await Promise.all(batchPromises); // Using Promise.all as scrapeSingleRate now always resolves
            allResults.push(...batchResult);

            if (i + CONCURRENCY_LIMIT < targetCurrencyCodes.length) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }

    } catch (browserError) {
        console.error('Scraper: Major error during browser setup or batch execution:', browserError);
        return null;
    } finally {
        if (browser && browser.isConnected()) {
            console.log('Scraper: Closing Playwright browser.');
            await browser.close();
        }
    }

    // Process the results
    const scrapedRates = {};
    const failedScrapes = [];
    allResults.forEach(result => {
        if (result) {
            const { code, rate, error } = result;
            if (error) {
                failedScrapes.push(code);
            } else {
                scrapedRates[code] = rate;
            }
        }
    });

    if (Object.keys(scrapedRates).length === 0 && targetCurrencyCodes.length > 0) {
        console.error('Scraper: Critical failure - no rates were successfully scraped after all retries.');
        return null;
    }

    if (failedScrapes.length > 0) {
        console.warn('Scraper: Permanently failed to scrape rates for:', failedScrapes.join(', '));
    }

    console.log(`Scraper: Finished batched scrape. Success: ${Object.keys(scrapedRates).length}, Failed: ${failedScrapes.length}`);
    return scrapedRates;
}

export default scrapeAllRatesAgainstINR;

// // backend/src/utils/scrapeAllRatesAgainstINR.js
// import { chromium } from 'playwright';

// const GOOGLE_FINANCE_BASE_URL = 'https://www.google.com/finance/quote/';
// // This selector is CRITICAL. It MUST be present and contain the rate on ALL currency pages (USD-INR, EUR-INR, etc.)
// // If it varies, you'll need a more complex selector strategy.
// const RATE_SELECTOR = 'div[data-last-price]';

// async function scrapeAllRatesAgainstINR(targetCurrencyCodes) {
//     if (!targetCurrencyCodes || targetCurrencyCodes.length === 0) {
//         console.log('Scraper: No target currency codes provided.');
//         return {};
//     }

//     let browser;
//     let context;
//     const scrapedRates = {};
//     const failedScrapes = [];

//     console.log(`Scraper: Starting Playwright browser to scrape ${targetCurrencyCodes.length} currencies...`);
//     try {
//         browser = await chromium.launch({
//             headless: true, // Set to false for visual debugging when a currency fails
//             args: [
//                 '--no-sandbox',
//                 '--disable-setuid-sandbox',
//                 '--disable-dev-shm-usage',
//                 '--disable-accelerated-2d-canvas',
//                 '--no-first-run',
//                 '--no-zygote',
//                 '--disable-gpu'
//             ]
//         });
//         context = await browser.newContext({
//              userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36', // Slightly updated UA
//              // Consider setting a viewport if headless behavior differs
//              // viewport: { width: 1280, height: 800 }
//         });
//         const page = await context.newPage();

//         for (const code of targetCurrencyCodes) {
//             const url = `${GOOGLE_FINANCE_BASE_URL}${code}-INR`;
//             console.log(`Scraper: Navigating to ${url} for ${code}`);

//             try {
//                 // Try 'networkidle' as it's often more reliable for JS-heavy pages, but can be slower.
//                 // Increased timeout for navigation.
//                 await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });

//                 console.log(`Scraper: Waiting for rate selector: "${RATE_SELECTOR}" for ${code}-INR`);
//                 // Increased timeout for selector.
//                 await page.waitForSelector(RATE_SELECTOR, { state: 'visible', timeout: 30000 });

//                 console.log(`Scraper: Selector found for ${code}-INR. Extracting data...`);
//                 const rateText = await page.evaluate((selector) => {
//                     const el = document.querySelector(selector);
//                     if (el) {
//                         // Prefer data-last-price, fallback to textContent
//                         return el.getAttribute('data-last-price') || el.textContent?.trim(); // Added optional chaining
//                     }
//                     console.warn(`Scraper (evaluate): Element with selector "${selector}" not found in DOM after waitForSelector.`);
//                     return null; // Element not found by querySelector inside evaluate
//                 }, RATE_SELECTOR);

//                 if (rateText === null || rateText.trim() === "") { // Check for empty string too
//                      console.warn(`Scraper: Extracted rateText is null or empty for ${code}-INR. Selector: "${RATE_SELECTOR}"`);
//                      failedScrapes.push(code);
//                      // --- START DEBUGGING FOR SPECIFIC FAILURE ---
//                      if (code === 'USD') { // Or any currency that consistently fails
//                          console.log(`Scraper: DEBUG - Taking screenshot and getting content for ${code} due to null/empty rateText.`);
//                          await page.screenshot({ path: `debug_${code}_rateText_null.png`, fullPage: true });
//                          console.log(`Scraper: DEBUG - Screenshot saved: debug_${code}_rateText_null.png`);
//                          const pageContent = await page.content();
//                          console.log(`Scraper: DEBUG - Page content for ${code} (first 2000 chars): \n`, pageContent.substring(0, 2000));
//                      }
//                      // --- END DEBUGGING ---
//                      continue; // Move to next currency
//                 }

//                 const rate = parseFloat(rateText);

//                 if (isNaN(rate)) {
//                     console.warn(`Scraper: Extracted value "${rateText}" for ${code}-INR is not a number. Skipping.`);
//                     failedScrapes.push(code);
//                     // --- START DEBUGGING FOR SPECIFIC FAILURE ---
//                      if (code === 'USD') {
//                          console.log(`Scraper: DEBUG - Taking screenshot and getting content for ${code} due to NaN parse. Original text: "${rateText}"`);
//                          await page.screenshot({ path: `debug_${code}_nan_parse.png`, fullPage: true });
//                          console.log(`Scraper: DEBUG - Screenshot saved: debug_${code}_nan_parse.png`);
//                          const pageContent = await page.content();
//                          console.log(`Scraper: DEBUG - Page content for ${code} (first 2000 chars): \n`, pageContent.substring(0, 2000));
//                      }
//                      // --- END DEBUGGING ---
//                 } else {
//                     scrapedRates[code] = rate;
//                     console.log(`Scraper: Scraped ${code}/INR rate: ${rate}`);
//                 }

//             } catch (error) {
//                 console.error(`Scraper: Error scraping ${code}/INR from ${url}. Message: ${error.message}`);
//                 if (error.stack) console.error("Scraper: Stack trace:", error.stack); // Log stack for more details
//                 failedScrapes.push(code);

//                 // --- START DEBUGGING FOR SPECIFIC FAILURE (IN CATCH BLOCK) ---
//                 if (code === 'USD') { // Or any currency that consistently fails
//                      console.log(`Scraper: DEBUG - Taking screenshot and getting content for ${code} due to error in try block.`);
//                      try {
//                         await page.screenshot({ path: `debug_${code}_error_catch.png`, fullPage: true });
//                         console.log(`Scraper: DEBUG - Screenshot saved: debug_${code}_error_catch.png`);
//                         const pageContent = await page.content();
//                         console.log(`Scraper: DEBUG - Page content for ${code} (first 2000 chars): \n`, pageContent.substring(0, 2000));
//                      } catch (debugPageError) {
//                          console.error(`Scraper: DEBUG - Error while trying to get debug info for ${code}:`, debugPageError.message);
//                      }
//                  }
//                  // --- END DEBUGGING ---
//             }
//         }

//         console.log('Scraper: Scraping iteration completed.');
//         if (failedScrapes.length > 0) {
//             console.warn('Scraper: Failed to scrape rates for:', failedScrapes.join(', '));
//         }
//         if (Object.keys(scrapedRates).length === 0 && targetCurrencyCodes.length > 0) {
//             console.error('Scraper: No rates were successfully scraped for any currency.');
//             return null; // Or consider throwing an error if this is critical
//         }
//         console.log('Scraper: Returning scraped rates object:', scrapedRates);
//         return scrapedRates;

//     } catch (browserError) {
//         console.error('Scraper: Major error during browser setup or initial navigation:', browserError.message);
//         if (browserError.stack) console.error("Scraper: Browser error stack:", browserError.stack);
//         return null; // Or throw
//     } finally {
//         if (context) {
//             try { await context.close(); } catch (e) { console.error("Scraper: Error closing context", e.message); }
//         }
//         if (browser) {
//             try { await browser.close(); } catch (e) { console.error("Scraper: Error closing browser", e.message); }
//         }
//         console.log('Scraper: Playwright browser closed.');
//     }
// }

// export default scrapeAllRatesAgainstINR;