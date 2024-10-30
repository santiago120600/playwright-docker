class CheckoutPage {

    constructor(page) {
        this.page = page;
        this.creditCardNumber = this.selectByLabel(page, 'Credit Card Number');
        this.cvvBox = this.selectByLabel(page, "CVV Code");
        this.nameOnCardBox = this.selectByLabel(page, "Name on Card");
        this.applyCouponBox = this.selectByLabel(page, "Apply Coupon");
        this.applyCouponBtn = page.locator("button:has-text('Apply Coupon')");
        this.placeOrderBtn = page.locator("a:has-text('Place Order')");
    }

    async fillCreditCardInfo(creditCardNumber, monthExpiry, yearExpiry, cvv, nameOnCard) {
        await this.creditCardNumber.clear();
        await this.creditCardNumber.fill(creditCardNumber);
        await this.selectDate(monthExpiry, yearExpiry);
        await this.cvvBox.fill(cvv);
        await this.nameOnCardBox.fill(nameOnCard);
    }
    
    async addCoupon(coupon) {
        await this.applyCouponBox.fill(coupon);
        await this.applyCouponBtn.click();
    }
    
    isCouponVisible(){
        return this.page.locator("p:has-text('* Coupon Applied')").isVisible();
    }
    
    async fillShippingInfo(country){
        await this.selectCountry(country);
    }

    async isProductInfoMatching() {
        const productName = await this.page.locator(".item__title").textContent();
        const itemQuantity = await this.page.locator(".item__quantity").textContent();
        return [productName, itemQuantity];
    }

    async getEmailTxt() {
        return this.page.locator('.user__name input').first().textContent();
    }

    async navigateToConfirmation() {
        await this.placeOrderBtn.click();
        await this.page.waitForLoadState('networkidle');
    }

    async selectCountry(country) {
        await this.page.getByPlaceholder("Select Country").pressSequentially(country);
        await this.page.locator("section.ta-results").getByText(country, { exact: true }).click();
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