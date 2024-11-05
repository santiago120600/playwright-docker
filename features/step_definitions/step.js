const { Given, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

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