class OrderHistoryPage {

    constructor(page) {
        this.page = page;
    }

    async isOrderIDDisplayed(orderID) {
        await this.page.locator("table.ng-star-inserted").waitFor();
        const orderIds = await this.page.locator("tbody th").allTextContents();
        for (let index = 0; index < orderIds.length; index++) {
            for (let i = 0; i < orderID.length; i++) {
                if (orderIds[index]===orderID[i]) {
                    return true;
                }
            }
        }
        return false;
    }
}
module.exports = OrderHistoryPage;