const LoginPage = require('../pageobjects/LoginPage');
const HomePage = require('../pageobjects/HomePage');
const CartPage = require('../pageobjects/CartPage');
const RegisterPage = require('../pageobjects/RegisterPage');
const CheckoutPage = require('../pageobjects/CheckoutPage');
const OrderSummaryPage = require('../pageobjects/OrderSummaryPage');
const OrderHistoryPage = require('../pageobjects/OrderHistoryPage');
const OrderConfirmationPage = require('../pageobjects/OrderConfirmationPage');

class POManager {

    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.homePage = new HomePage(page);
        this.cartPage = new CartPage(page);
        this.checkoutPage = new CheckoutPage(page);
        this.registerPage = new RegisterPage(page);
        this.orderSummaryPage = new OrderSummaryPage(page);
        this.orderHistoryPage = new OrderHistoryPage(page);
        this.orderConfirmationPage = new OrderConfirmationPage(page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getHomePage() {
        return this.homePage;
    }
    
    getCartPage(){
        return this.cartPage;
    }

    getCheckoutPage(){
        return this.checkoutPage;
    }

    getOrderSummaryPage(){
        return this.orderSummaryPage;
    }

    getOrderHistoryPage(){
        return this.orderHistoryPage;
    }

    getOrderConfirmationPage(){
        return this.orderConfirmationPage;
    }

    getRegisterPage(){
        return this.registerPage;
    }
}

module.exports = POManager