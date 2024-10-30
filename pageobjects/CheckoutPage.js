class CheckoutPage {

    constructor(page) {
        this.page = page;
        this.applyCouponBtn = page.locator("button:has-text('Apply Coupon')");
        this.placeOrderBtn = page.locator("a:has-text('Place Order')");
        this.selectCountryBox = page.getByPlaceholder("Select Country");
        this.loadSpinner = page.locator(".ngx-spinner-overlay");
        this.emailBox = page.locator('.user__name input').first();
    }

    async fillCreditCardInfo(creditCardNumber, monthExpiry, yearExpiry, cvv, nameOnCard) {
        const creditCardNumberBox = this.selectByLabel('Credit Card Number');
        const cvvBox = this.selectByLabel("CVV Code");
        const nameOnCardBox = this.selectByLabel("Name on Card");
        await creditCardNumberBox.clear();
        await creditCardNumberBox.fill(creditCardNumber);
        await this.selectDate(monthExpiry, yearExpiry);
        await cvvBox.fill(cvv);
        await nameOnCardBox.fill(nameOnCard);
    }
    
    async addCoupon(coupon) {
        const applyCouponBox = this.selectByLabel("Apply Coupon");
        await applyCouponBox.fill(coupon);
        await this.applyCouponBtn.click();
    }
    
    isCouponVisible(){
        const coupon = this.page.locator("p:has-text('* Coupon Applied')");
        return coupon.isVisible();
    }
    
    async fillShippingInfo(country){
        await this.selectCountry(country);
    }

    async isProductInfoMatching() {
        const productName = await this.page.locator(".item__title").textContent();
        const itemQuantity = await this.page.locator(".item__quantity").textContent();
        return [productName, itemQuantity];
    }

    async navigateToConfirmation() {
        await this.placeOrderBtn.click();
        await this.page.waitForLoadState('networkidle');
    }

    async selectCountry(country) {
        // await this.selectCountryBox.screenshot({ path: 'screenshotCountry.png' });
        await this.selectCountryBox.pressSequentially(country);
        await this.page.screenshot({path:'screenshotafterpressing.png'});
        const searchResults = this.page.locator("section.ta-results").getByText(country, { exact: true });
        // searchResults.screenshot({ path: 'screenshot.png' });
        await searchResults.click();
    }

    async selectDate(month, year) {
        const [monthBox, yearBox] = await this.page.locator("//div[contains(text(),'Expiry Date')]/following-sibling::select").all();
        await monthBox.selectOption(month);
        await yearBox.selectOption(year);
    }

    selectByLabel(label) {
        return this.page.locator(`//div[contains(text(),'${label}')]/following-sibling::input`);
    }

}
module.exports = CheckoutPage;