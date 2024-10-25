
const { test, expect } = require('@playwright/test');

let usernameGlobal = "santiago@gmail.com";
let passwordGlobal = "aB#45678";

test('Ecommerce login test', async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/client/");
    const username = page.locator("#userEmail");
    await username.fill(usernameGlobal);
    const password = page.locator("#userPassword");
    await password.fill(passwordGlobal);
    const loginBtn = page.locator("#login");
    await loginBtn.click();
    // await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    const productNames = await page.locator(".card-body b").allTextContents();
    console.log(productNames);
    //await page.pause();
});

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
