class RegisterPage {

    constructor(page) {
        this.page = page;
        this.firstName = page.locator("#firstName");
        this.lastName = page.locator("#lastName");
        this.email = page.locator("#userEmail");
        this.phone = page.locator("#userMobile");
        this.password = page.locator("#userPassword");
        this.confirmPassword = page.locator("#confirmPassword");
        this.occupation = page.locator("select");
        this.radioBtn = page.locator("input[type='radio']");
        this.checkbox = page.locator("input[type='checkbox']");
        this.registerBtn = page.locator("#login");
    }

    async register(firstName, lastName, email, phone, password, occupation, gender){
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.email.fill(email);
        await this.phone.fill(phone);
        await this.occupation.selectOption(occupation);
        await this.selectGender(gender);
        await this.password.fill(password);
        await this.confirmPassword.fill(password);
        await this.checkbox.click();
        await this.registerBtn.click();
    }
    
    async selectGender(gender){
        if(gender === "Male"){
            await this.radioBtn.first().click();
        }else{
            await this.radioBtn.nth(1).click();
        }
    }
}
module.exports = RegisterPage;