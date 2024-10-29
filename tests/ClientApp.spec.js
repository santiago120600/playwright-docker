const { test, expect } = require('@playwright/test');
const LoginPage = require('../pageobjects/LoginPage');
const HomePage = require('../pageobjects/HomePage');
const CartPage = require('../pageobjects/CartPage');
const RegisterPage = require('../pageobjects/RegisterPage');

let usernameGlobal = "santiago@gmail.com";
let passwordGlobal = "aB#45678";
let productNameGlobal = 'IPHONE 13 PRO';
let creditCardNumberGlobal = '4543993192922294';

test.only('Ecommerce login test', async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.login(usernameGlobal, passwordGlobal);
    const homePage = new HomePage(page);
    await homePage.addProductToCart(productNameGlobal);
    await homePage.cartBtn.click();
    const cartPage = new CartPage(page);
    await expect(cartPage.isTextVisibleCart(productNameGlobal)).toBeTruthy();
    await cartPage.checkoutBtn.click();
});

test('Create account', async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.registerLink.click();
    const registerPage = new RegisterPage(page);
    await registerPage.register("santiago", "castanon", usernameGlobal, "4426244709", passwordGlobal, "Engineer", "Female");
});
