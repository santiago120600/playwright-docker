class OrderConfirmationPage {

    constructor(page) {
        this.page = page;
        this.orderHistoryLink = page.getByText("Orders History Page");
        this.thankyoumsg = page.locator(".hero-primary").filter({hasText:"Thankyou for the order."});
    }

    async getOrdersId() {
        const orderIDs =  await this.page.locator("label.ng-star-inserted").allTextContents();
        orderIDs.forEach((element, index) => {
            orderIDs[index] = element.substring(3, element.length-3);
        });
        return orderIDs;
    }
    
    async navigateToOrderHistory(){
        await this.orderHistoryLink.click();
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports = OrderConfirmationPage;