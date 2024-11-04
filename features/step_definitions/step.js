const { Given, Then, Before, After, setDefaultTimeout, AfterStep, Status } = require('@cucumber/cucumber');
const { expect, chromium } = require('@playwright/test');
const POManager = require('../../pageobjects/POManager');

setDefaultTimeout(60 * 1000);
let page, browser;

Before(async function () {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
    this.poManager = new POManager(page);
});

After(async function () {
    await browser.close();
});

AfterStep(async function ({ result }) {
    if (result.status === Status.FAILED) {
        await page.screenshot({ path: 'screenshot.png' });
    }
});

Given('user navigates to register screen', async function () {
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.registerLink.click();
});

Given('user enters First Name: {string} ,Last Name: {string}, Email: {string}, Phone: {string}, Password: {string}, Occupation: {string}, Gender: {string}', async function (firstName, lastName, email, phone, password, occupation, gender) {
    this.registerPage = this.poManager.getRegisterPage();
    await this.registerPage.register(firstName, lastName, email, phone, password, occupation, gender);
});

Then('success message is displayed', async function () {
    await expect(this.registerPage.successMsg).toBeVisible();
    await expect(this.registerPage.successMsg).toHaveText("Account Created Successfully");
});