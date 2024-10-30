const { test, expect } = require('@playwright/test');
const POManager = require('../pageobjects/POManager');

let usernameGlobal = "santiago@gmail.com";
let passwordGlobal = "aB#45678";
let productNameGlobal = 'IPHONE 13 PRO';
let creditCardNumberGlobal = '4543993192922294';
let firstNameGlobal = "Santiago";
let lastNameGlobal = "Castanon";
let phoneGlobal = "4426244709";
let occupationGlobal = "Engineer";
let genderGlobal = "Male";
let nameOnCardGlobal = "santiago castanon";
let cvv = "333";
let monthExpiry = "11";
let yearExpiry = "28";

test.only('Ecommerce login test', async ({page})=>{
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.login(usernameGlobal, passwordGlobal);
    const homePage = poManager.getHomePage();
    await homePage.addProductToCart(productNameGlobal);
    await homePage.navigateToCart();
    const cartPage = poManager.getCartPage();
    const isProductNameVisible = await cartPage.isTextVisibleCart(productNameGlobal);
    await expect(isProductNameVisible).toBeTruthy();
    await cartPage.navigateToCheckout();
    const checkoutPage = poManager.getCheckoutPage();
    const productInfo = await checkoutPage.isProductInfoMatching();
    await expect(productInfo[0].trim()).toBe(productNameGlobal.trim());
    await expect(productInfo[1].trim()).toBe("Quantity: 1".trim());
    await checkoutPage.fillCreditCardInfo(creditCardNumberGlobal, monthExpiry, yearExpiry,cvv,nameOnCardGlobal);
    await checkoutPage.addCoupon("rahulshettyacademy");
    await expect(checkoutPage.loadSpinner).not.toBeAttached();
    const isCouponVisible = await checkoutPage.isCouponVisible();
    await expect(isCouponVisible).toBeTruthy();
    await checkoutPage.fillShippingInfo("Mexico");
    await expect(checkoutPage.emailBox).toHaveValue(usernameGlobal);
    await checkoutPage.navigateToConfirmation();
});

test('Create account', async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.registerLink.click();
    const registerPage = new RegisterPage(page);
    await registerPage.register(firstNameGlobal, lastNameGlobal, usernameGlobal, phoneGlobal, passwordGlobal, occupationGlobal, genderGlobal);
});
