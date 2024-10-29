class CartPage {
    constructor(page) {
        this.page = page;
        this.checkoutBtn = page.getByText('Checkout');
    }
    
    async isTextVisibleCart(text){
        return this.page.locator(".cartSection").getByText(text).isVisible();
    }
}
module.exports = CartPage;