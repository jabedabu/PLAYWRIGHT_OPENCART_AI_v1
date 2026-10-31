import { Page, Locator } from '@playwright/test';

export class ProductPage {
    private readonly page: Page;

    // Locators
    private readonly headingProduct: Locator;
    private readonly txtQuantity: Locator;
    private readonly btnAddToCart: Locator;
    private readonly lblAlert: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.headingProduct = page.locator('#content').getByRole('heading', { level: 1 });
        this.txtQuantity = page.locator('#input-quantity');
        this.btnAddToCart = page.getByRole('button', { name: 'Add to Cart' });
        this.lblAlert = page.locator('#alert .alert');
    }

    /**
     * Gets the product name shown on the details page
     * @returns Promise<string> - Product name
     */
    async getProductName(): Promise<string> {
        return (await this.headingProduct.innerText()).trim();
    }

    /**
     * Sets the quantity to add
     * @param quantity - Quantity value
     */
    async setQuantity(quantity: string): Promise<void> {
        await this.txtQuantity.fill(quantity);
    }

    /**
     * Clicks Add to Cart and waits for the confirmation alert
     */
    async clickAddToCart(): Promise<void> {
        await this.btnAddToCart.click();
        await this.lblAlert.waitFor({ state: 'visible' });
    }

    /**
     * Checks the add-to-cart success message
     * @param productName - Product expected in the message
     * @returns Promise<boolean> - true if the success message names the product
     */
    async isAddedToCartMessageDisplayed(productName: string): Promise<boolean> {
        try {
            const message = await this.lblAlert.innerText();
            return message.includes(`Success: You have added ${productName} to your shopping cart!`);
        } catch (error) {
            console.log(`Error reading add to cart message: ${error}`);
            return false;
        }
    }
}
