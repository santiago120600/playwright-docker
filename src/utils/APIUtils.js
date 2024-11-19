const { expect } = require('@playwright/test');

class APIUtils
{
    
    constructor(apiContext){
        this.apiContext = apiContext;
    }

    async getToken(username, password){
        const loginPayload = { userEmail: username, userPassword: password };
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", { data: loginPayload });
        await expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();
        return loginResponseJson.token;
    }
}

module.exports = APIUtils;