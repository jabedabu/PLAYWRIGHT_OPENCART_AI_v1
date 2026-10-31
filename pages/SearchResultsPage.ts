import { Page, Locator } from '@playwright/test';
import { ProductPage } from './ProductPage';

export class SearchResultsPage {
    private readonly page: Page;

    // Locators
    private readonly productList: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.productList = page.locator('#product-list');
    }

    /**
     * Checks whether a product with the exact name is listed in the results
     * @param productName - Product name to look for
     * @returns Promise<boolean> - true if the product is visible
     */
    async isProductExists(productName: string): Promise<boolean> {
        try {
            return await this.productList.getByText(productName, { exact: true }).isVisible();
        } catch (error) {
            console.log(`Error checking product in results: ${error}`);
            return false;
        }
    }

    /**
     * Opens the details page of a product from the results
     * @param productName - Exact product name
     * @returns Promise<ProductPage> - Instance of the product details page
     */
    async selectProduct(productName: string): Promise<ProductPage> {
        await this.productList.getByText(productName, { exact: true }).click();
        await this.page.waitForURL(/product\//);
        return new ProductPage(this.page);
    }
}
