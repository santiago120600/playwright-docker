const { When, Given, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const APIUtils = require('../../utils/APIUtils');


setDefaultTimeout(30000);

Given('user login to Ecommerce application with {string} and {string}', async function (username, password) {
    const apiUtils = new APIUtils(this.apiContext);
    token = await apiUtils.getToken(username,password);
    // Inject token into browser context
    await this.context.addInitScript(token => {
        window.localStorage.setItem('token', token);
    }, token);
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
});

When('Add {string} to cart', async function (productName) {
    this.homePage = this.poManager.getHomePage();
    await this.homePage.addProductToCart(productName);
});

When('user navigates to cart page', async function () {
    await this.homePage.navigateToCart();
});

Then('Verify product name matches with {string}', async function (productName) {
    this.cartPage = this.poManager.getCartPage();
    const isProductNameVisible = await this.cartPage.isTextVisibleCart(productName);
    await expect(isProductNameVisible).toBeTruthy();
});

When('user navigates to Checkout page', async function () {
    await this.cartPage.navigateToCheckout();
});

Then('verify product name matches with {string}', async function (productName) {
    this.checkoutPage = this.poManager.getCheckoutPage();
    const productInfo = await this.checkoutPage.isProductInfoMatching();
    await expect(productInfo[0].trim()).toBe(productName.trim());
    await expect(productInfo[1].trim()).toBe("Quantity: 1".trim());
});

Then('Fill Credit card number: {string}, Expiry date: {string} {string}, cvv code: {string}, name on card: {string}', async function (creditCardNumber, monthExpiry, yearExpiry, cvv, nameOnCard) {
    await this.checkoutPage.fillCreditCardInfo(creditCardNumber, monthExpiry, yearExpiry, cvv, nameOnCard);
});

Then('verify email matches with {string}, select country {string}', async function (email, country) {
    await this.checkoutPage.fillShippingInfo(country);
    await expect(this.checkoutPage.emailBox).toHaveValue(email);
});

Then('apply coupon {string}', async function (coupon) {
    await this.checkoutPage.addCoupon(coupon);
    await expect(this.checkoutPage.loadSpinner).not.toBeAttached();
    await this.checkoutPage.loadSpinner.waitFor({ state: 'hidden' });
    const isCouponVisible = await this.checkoutPage.isCouponVisible();
    await expect(isCouponVisible).toBeTruthy();
});

When('user navigates to order confirmation page', async function () {
    await this.checkoutPage.navigateToConfirmation();
});

Then('verify thankyou for the order text is displayed', async function () {
    this.orderConfirmationPage = this.poManager.getOrderConfirmationPage();
    await expect(this.orderConfirmationPage.thankyoumsg).toBeVisible();
});

Then('capture order id', async function () {
    this.orderId = await this.orderConfirmationPage.getOrdersId();
});

When('click Orders History Page link', async function () {
    await this.orderConfirmationPage.navigateToOrderHistory();
});

Then('verify order id is displayed', async function () {
    this.orderhistoryPage = this.poManager.getOrderHistoryPage();
    expect(await this.orderhistoryPage.isOrderIDDisplayed(this.orderId)).toBeTruthy();
});

Then('click View button', async function () {
    this.orderhistoryPage.navigateToOrderSummaryPage(this.orderId);
});

Then('verify order id, country: {string}, email: {string}, product name: {string} are correct', async function (country, email, productName) {
    this.orderSummaryPage = this.poManager.getOrderSummaryPage();
    await expect(this.orderSummaryPage.orderSummayTxt).toHaveText("order summary");
    await expect(this.orderSummaryPage.orderId).toHaveText(this.orderId);
    await expect(this.orderSummaryPage.billingCountry).toContainText(country);
    await expect(this.orderSummaryPage.deliveryCountry).toContainText(country);
    await expect(this.orderSummaryPage.deliveryEmail).toHaveText(email);
    await expect(this.orderSummaryPage.billingEmail).toHaveText(email);
    await expect(this.orderSummaryPage.productName).toHaveText(productName);
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