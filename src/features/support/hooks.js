const { Before, BeforeStep, After, AfterStep, Status } = require('@cucumber/cucumber');
const { chromium, request } = require('@playwright/test');
const POManager = require('../../pageobjects/POManager');
const path = require('path');
const fs = require('fs');

const CONFIG = {
    paths: {
        videos: path.resolve("allure-results/videos"),
        traces: path.resolve("allure-results/traces"),
        screenshots: path.resolve("allure-results/screenshots")
    },
    browser: {
        headless: true,
    }
};

let stepName;
let scenarioName;

Before(async function (scenario) {
    this.apiContext = await request.newContext();
    this.browser = await chromium.launch({ headless: CONFIG.browser.headless });
    this.context = await this.browser.newContext({ 
        recordVideo: { 
            dir: CONFIG.paths.videos
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
        const tracePath = CONFIG.paths.traces;
        const traceFilePath = path.join(tracePath, scenarioName.replace(/\s+/g, '_') + new Date().toISOString().replace(/[-:T.Z]/g, '') + ".zip");
        await this.context.tracing.stop({ path: traceFilePath });
        const videoPath = await this.page.video().path();
        const screenshotPath = await captureScreenshot(this.page);
        await this.context.close();
        // Attach artifacts
        const artifacts = [
            { path: screenshotPath, mimeType: 'image/png' },
            { path: traceFilePath, mimeType: 'application/zip' },
            { path: videoPath, mimeType: 'video/webm' }
        ];

        for (const artifact of artifacts) {
            if (fs.existsSync(artifact.path)) {
                const fileContent = fs.readFileSync(artifact.path);
                this.attach(fileContent, artifact.mimeType);
            }
        }
    }
});

async function captureScreenshot(page) {
    const screenshotPath = CONFIG.paths.screenshots;
    if (!fs.existsSync(screenshotPath)) {
      fs.mkdirSync(screenshotPath);
    }
    const screenshotName = stepName.replace(/[^a-z0-9]/gi, '_').toLowerCase() + new Date().toISOString().replace(/[-:T.Z]/g, '');
    const screenshotFilePath = path.join(screenshotPath, `${screenshotName}.png`);
    await page.screenshot({ path: screenshotFilePath });
    return screenshotFilePath;
  }