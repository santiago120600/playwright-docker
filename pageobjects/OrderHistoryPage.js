class OrderHistoryPage {

    constructor(page) {
        this.page = page;
    }

    async isOrderIDDisplayed(orderID) {
        const orderIds = await this.page.locator("tbody th").allTextContents();
        for (let index = 0; index < orderIds.length; index++) {
            if (orderIds[index]===orderID) {
                return true;
            }
        }
        return false;
    }
}
module.exports = OrderHistoryPage;