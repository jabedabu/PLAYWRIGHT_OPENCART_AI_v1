import { Page, Locator } from '@playwright/test';

export class CartPage {
    private readonly page: Page;

    // Locators
    private readonly cartRows: Locator;
    private readonly rowTotal: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.cartRows = page.locator('#shopping-cart tbody tr');
        this.rowTotal = page.locator('#checkout-total').getByRole('row', { name: /^Total/ });
    }

    /**
     * Gets the cart row of a product
     * @param productName - Product name in the cart
     * @returns Locator - Row locator
     */
    private getRow(productName: string): Locator {
        return this.cartRows.filter({ has: this.page.getByRole('link', { name: productName, exact: true }) }).last();
    }

    /**
     * Checks whether a product is listed in the cart
     * @param productName - Product name
     * @returns Promise<boolean> - true if the product row is visible
     */
    async isProductInCart(productName: string): Promise<boolean> {
        try {
            return await this.getRow(productName).isVisible();
        } catch (error) {
            console.log(`Error checking product in cart: ${error}`);
            return false;
        }
    }

    /**
     * Gets the quantity of a product in the cart
     * @param productName - Product name
     * @returns Promise<string> - Quantity value
     */
    async getQuantity(productName: string): Promise<string> {
        return await this.getRow(productName).locator('input[name="quantity"]').inputValue();
    }

    /**
     * Gets the unit price of a product in the cart
     * @param productName - Product name
     * @returns Promise<string> - Unit price, e.g. $602.00
     */
    async getUnitPrice(productName: string): Promise<string> {
        return (await this.getRow(productName).locator('td').nth(4).innerText()).trim();
    }

    /**
     * Gets the cart total
     * @returns Promise<string> - Total, e.g. $602.00
     */
    async getCartTotal(): Promise<string> {
        return (await this.rowTotal.locator('td').last().innerText()).trim();
    }
}
