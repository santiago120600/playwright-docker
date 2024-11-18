class HomePage {

    constructor(page) {
        this.page = page;
        this.cartBtn = page.getByRole('button').getByText('Cart', {exact:true});
    }
    
    async navigateToCart(){
        await this.cartBtn.click();
        await this.page.waitForLoadState('networkidle');
    }

    async addProductToCart(productName){
        const products =  await this.page.locator(".card-body").all();
        for(let i = 0; i < products.length;i++)
        {
            if(await products[i].locator("b").textContent()===productName){
                await products[i].getByText('Add To Cart').click();
                break;
            }     
        }
    }
}
module.exports = HomePage;