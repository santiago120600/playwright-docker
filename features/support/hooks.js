const { Before, After, AfterStep, Status } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const POManager = require('../../pageobjects/POManager');
const path = require('path');
const fs = require('fs');

Before(async function () {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
});

After(async function () {
    await browser.close();
});

AfterStep(async function ({ result, pickleStep }) {
    if (result.status === Status.FAILED) {
        const screenshotPath = path.resolve("test-results/screenshots");
        if (!fs.existsSync(screenshotPath)) {
            fs.mkdirSync(screenshotPath);
        }
        const screenshotName = pickleStep.text.replace(/[^a-z0-9]/gi, '_').toLowerCase() + new Date().toISOString().replace(/[-:T.Z]/g, '');
        const screenshotFilePath = path.join(screenshotPath, `${screenshotName}.png`);
        await this.page.screenshot({ path: screenshotFilePath });
    }
});