
const { test, expect } = require('@playwright/test');

let usernameGlobal = "santiago@gmail.com";
let passwordGlobal = "aB#45678";
let productNameGlobal = 'IPHONE 13 PRO';
let creditCardNumberGlobal = '4543993192922294';

test.only('Ecommerce login test', async ({page})=>{
    await page.goto("/client");
    const username = page.locator("#userEmail");
    await username.fill(usernameGlobal);
    const password = page.locator("#userPassword");
    await password.fill(passwordGlobal);
    const loginBtn = page.locator("#login");
    await loginBtn.click();
    await page.locator(".card-body b").first().waitFor();
    await addProductToCart(page, productNameGlobal);
    const cartBtn = page.getByRole('button').getByText('Cart', {exact:true});
    await cartBtn.click();
    const productName = page.locator(".cartSection");
    await expect(productName.getByText(productNameGlobal)).toBeVisible();
    const checkoutBtn = page.getByText('Checkout');
    await checkoutBtn.click();
    await expect(page.locator(".item__title")).toHaveText(productNameGlobal);
    await expect(page.locator(".item__quantity")).toHaveText("Quantity: 1");
    const creditCardNumber = await selectByLabel(page, 'Credit Card Number');
    await creditCardNumber.clear();
    await creditCardNumber.fill(creditCardNumberGlobal);
    await selectDate(page, '09','28');
    const cvvBox = selectByLabel(page, "CVV Code");
    await cvvBox.fill("123");
    const nameOnCardBox = selectByLabel(page, "Name on Card");
    await nameOnCardBox.fill("Santiago castanon");
    const applyCouponBox = selectByLabel(page, "Apply Coupon");
    await applyCouponBox.fill("rahulshettyacademy");
    await selectCountry(page, "Mexico");
    await expect(page.locator('input[type="text"]').nth(4)).toHaveValue(usernameGlobal);
    const applyCouponBtn = page.locator("button:has-text('Apply Coupon')");
    await applyCouponBtn.click();
    await expect(page.locator("p:has-text('* Coupon Applied')")).toBeVisible();
    const placeOrderBtn = page.locator("a:has-text('Place Order')");
    await placeOrderBtn.click();
    await expect(page.locator(".hero-primary")).toHaveText("Thankyou for the order.");
    const ordersID = await getOrdersId(page);
    const orderHistoryLink = page.getByText("Orders History Page");
    await orderHistoryLink.click();
    await expect(isOrderIDDisplayed(page, ordersID[0])).toBeTruthy();
});

async function isOrderIDDisplayed(page, orderID) {
    const orderIds = await page.locator("tbody th").allTextContents();
    for (let index = 0; index < orderIds.length; index++) {
        if (orderIds[index]===orderID) {
            return true;
        }
    }
    return false;
}

async function getOrdersId(page) {
    const orderIDs =  await page.locator("label.ng-star-inserted").allTextContents();
    orderIDs.forEach((element, index) => {
        orderIDs[index] = element.substring(3, element.length-3);
    });
    return orderIDs;
}

async function selectCountry(page, country) {
    await page.getByPlaceholder("Select Country").pressSequentially(country);
    await page.locator("section.ta-results").getByText(country,{exact:true}).click();
}

async function selectDate(page, month, year){
    const [monthBox, yearBox] = await page.locator("//div[contains(text(),'Expiry Date')]/following-sibling::select").all();    
    await monthBox.selectOption(month);
    await yearBox.selectOption(year);
}

function selectByLabel(page, label){
    return page.locator(`//div[contains(text(),'${label}')]/following-sibling::input`);    
}

async function addProductToCart(page, productName){
    const products =  await page.locator(".card-body").all();
    for(let i = 0; i < await products.length;i++)
    {
        if(await products[i].locator("b").textContent()==productName){
            await products[i].getByText('Add To Cart').click();
            break;
        }     
    }
}

test('Create account', async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/client/");
    const registerLink = page.locator("//a[text()='Register here']");
    await registerLink.click();
    const firstName = page.locator("#firstName");
    const lastName = page.locator("#lastName");
    const email = page.locator("#userEmail");
    const phone = page.locator("#userMobile");
    const password = page.locator("#userPassword");
    const confirmPassword = page.locator("#confirmPassword");
    const dropdown = page.locator("select");
    await dropdown.selectOption("//select","Engineer");
    const radioBtn = page.locator("input[type='radio']").first();
    console.log(radioBtn.isChecked());
    const checkbox = page.locator("input[type='checkbox']");
    const registerBtn = page.locator("#login");

    await firstName.fill("santiago");
    await lastName.fill("castanon");
    await email.fill(usernameGlobal);
    await phone.fill("4426244708");
    await password.fill(passwordGlobal);
    await confirmPassword.fill(passwordGlobal);
    await radioBtn.click();
    await checkbox.click();
    await registerBtn.click();
    expect(await checkbox.isChecked()).toBeTruthy();
});
