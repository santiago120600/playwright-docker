class OrderHistoryPage {

    constructor(page) {
        this.page = page;
        this.tableRows = page.locator("tbody tr");
    }

    async navigateToOrderSummaryPage(orderId){
        const rows = await this.tableRows.all();
        const rowsTxt = await this.tableRows.locator("th").allTextContents();
        for (let i = 0; i < rowsTxt.length; i++) {
            if(rowsTxt[i]==orderId)
            {
                await rows[i].getByRole("button", {name:"View"}).click();
                break;
            }
        }
        await this.page.waitForLoadState('networkidle');
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