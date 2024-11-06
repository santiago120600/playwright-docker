const { Before, BeforeStep, After, AfterStep, Status } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const POManager = require('../../pageobjects/POManager');
const path = require('path');
const fs = require('fs');

let stepName;
let scenarioName;

Before(async function (scenario) {
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    await this.context.tracing.start({ screenshots: true, snapshots: true });
    this.page = await this.context.newPage();
    this.poManager = new POManager(this.page);
    scenarioName = scenario.pickle.name;
});

BeforeStep(async (scenario) => {
    stepName = scenario.pickleStep.text;
});

After(async function () {
    await this.browser.close();
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
        const videoPath = path.resolve("test-results/videos");
        const videoFilePath = path.join(videoPath, `${scenarioName}.zip`);
        await this.context.tracing.stop({ path: videoFilePath });
    }
});