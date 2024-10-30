class OrderSummaryPage {

    constructor(page) {
        this.page = page;
        this.orderSummayTxt = page.locator(".email-title");
        this.orderId = page.locator("//small[text()='Order Id']/following-sibling::div");
        this.billingCountry = page.locator("//div[@class='address']/p[contains(text(),'Country')]").nth(0);
        this.deliveryCountry = page.locator("//div[@class='address']/p[contains(text(),'Country')]").nth(1);
        this.deliveryEmail = page.locator("//div[text()=' Delivery Address ']/following-sibling::p").nth(0);
        this.billingEmail = page.locator("//div[text()=' Billing Address ']/following-sibling::p").nth(0);
        this.productName = page.locator(".title");
    }
}
module.exports = OrderSummaryPage;