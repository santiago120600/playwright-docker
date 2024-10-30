class CartPage {

    constructor(page) {
        this.page = page;
        this.checkoutBtn = page.getByText('Checkout');
    }

    async isTextVisibleCart(text) {
        await this.page.locator(".cartSection").first().waitFor();
        const visible = await this.page.locator(".cartSection").getByText(text).isVisible();
        return visible;
    }

    async navigateToCheckout() {
        await this.checkoutBtn.click();
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports = CartPage;