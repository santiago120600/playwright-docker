const { Before, BeforeStep, After, AfterStep, Status } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const POManager = require('../../pageobjects/POManager');
const path = require('path');
const fs = require('fs');

let stepName;
let scenarioName;

Before(async function (scenario) {
    this.browser = await chromium.launch({ headless: true });
    this.context = await this.browser.newContext({ 
        recordVideo: { 
            dir: path.resolve("allure-results/videos")
        } 
    });
    await this.context.tracing.start({ screenshots: true, snapshots: true });
    this.page = await this.context.newPage();
    this.poManager = new POManager(this.page);
    scenarioName = scenario.pickle.name;
});

BeforeStep(async (scenario) => {
    stepName = scenario.pickleStep.text;
});

After(async function () {
    if (this.page) {
        const video = this.page.video();
        await this.page.close();
        await this.context.close(); // Finalizes the video
        if (video) {
            const videoPath = await video.path();
            if (fs.existsSync(videoPath)) {
                await video.delete();
            }
        }
    }
    await this.browser.close();
});

AfterStep(async function ({ result }) {
    if (result.status === Status.FAILED) {
        const tracePath = path.resolve("allure-results/traces");
        const traceFilePath = path.join(tracePath, scenarioName.replace(/\s+/g, '_') + new Date().toISOString().replace(/[-:T.Z]/g, '') + ".zip");
        await this.context.tracing.stop({ path: traceFilePath });
        const videoPath = await this.page.video().path();
        const screenshotPath = await captureScreenshot(this.page);
        if(fs.existsSync(screenshotPath)) {
            this.attach(fs.readFileSync(screenshotPath), 'image/png');
        }
        await this.context.close();
        if (fs.existsSync(traceFilePath)) {
            this.attach(fs.readFileSync(traceFilePath), 'application/zip');
        }
        if (fs.existsSync(videoPath)) {
            this.attach(fs.readFileSync(videoPath), 'video/webm');
        }
    }
});

async function captureScreenshot(page) {
    const screenshotPath = path.resolve("allure-results/screenshots");
    if (!fs.existsSync(screenshotPath)) {
      fs.mkdirSync(screenshotPath);
    }
    const screenshotName = stepName.replace(/[^a-z0-9]/gi, '_').toLowerCase() + new Date().toISOString().replace(/[-:T.Z]/g, '');
    const screenshotFilePath = path.join(screenshotPath, `${screenshotName}.png`);
    await page.screenshot({ path: screenshotFilePath });
    return screenshotFilePath;
  }