class OrderConfirmationPage {

    constructor(page) {
        this.page = page;
        // this.ordersID =  this.getOrdersId(page);
        // this.orderHistoryLink = page.getByText("Orders History Page");
    }

    async getOrdersId() {
        const orderIDs =  await this.page.locator("label.ng-star-inserted").allTextContents();
        orderIDs.forEach((element, index) => {
            orderIDs[index] = element.substring(3, element.length-3);
        });
        return orderIDs;
    }
}
module.exports = OrderConfirmationPage;