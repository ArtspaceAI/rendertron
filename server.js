const puppeteer = require('puppeteer');

async function runScript(url, inputPrompt) {
    // Launch a headless browser
    const browser = await puppeteer.launch({ headless: false });

    // Open a new page
    const page = await browser.newPage();

    // Navigate to the specified URL
    await page.goto(url);

    // Wait for the element to be visible for up to 10 seconds
    await page.waitForSelector("#prompt-form > label > textarea", { visible: true, timeout: 20000 });

    // Type the specified input prompt into the text area
    await page.type("#prompt-form > label > textarea", inputPrompt);

    // Click the submit button
    await page.click('#submit');

    // Wait for the page to load
    await page.waitForTimeout(35000);

    // Copy text from multiple elements with given selectors
    const elementsToCopy = [];
    for (let i = 87; i <= 100; i++) {
        const elementSelector = `#component-${i} > div.wrapper.svelte-nab2ao > div > div > div.message-row.bubble.bot-row.svelte-1pjfiar > div.message.bot.svelte-1pjfiar.message-bubble-border > button > span`;

        const elementText = await page.evaluate((selector) => {
            const element = document.querySelector(selector);
            return element ? element.textContent.trim() : null;
        }, elementSelector);
        elementsToCopy.push(elementText);
    }

    // Output the copied text
    console.log('Copied Text:', elementsToCopy);

    // Close the browser
    await browser.close();
}

// Example usage
const url = 'https://gpt.h2o.ai/';
const inputPrompt = 'write an article about global warming';
runScript(url, inputPrompt);
