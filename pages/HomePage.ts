import { Page, Locator } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';
import { SearchResultsPage } from './SearchResultsPage';
import { CartPage } from './CartPage';

export class HomePage {
    private readonly page: Page;

    // Locators
    private readonly lnkMyAccount: Locator;
    private readonly lnkRegister: Locator;
    private readonly lnkLogin: Locator;
    private readonly lnkShoppingCart: Locator;
    private readonly txtSearch: Locator;
    private readonly btnSearch: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.lnkMyAccount = page.locator('#top').getByRole('link', { name: 'My Account' }).first();
        this.lnkRegister = page.locator('#top').getByRole('link', { name: 'Register' });
        this.lnkLogin = page.locator('#top').getByRole('link', { name: 'Login' });
        this.lnkShoppingCart = page.locator('#top').getByRole('link', { name: 'Shopping Cart' });
        this.txtSearch = page.getByRole('textbox', { name: 'Search' });
        this.btnSearch = page.locator('#search button');
    }

    /**
     * Opens the My Account dropdown in the top menu
     */
    async clickMyAccount(): Promise<void> {
        await this.lnkMyAccount.click();
    }

    /**
     * Clicks the Register option of the My Account dropdown
     * @returns Promise<RegisterPage> - Instance of the register page
     */
    async clickRegister(): Promise<RegisterPage> {
        await this.lnkRegister.click();
        return new RegisterPage(this.page);
    }

    /**
     * Clicks the Login option of the My Account dropdown
     * @returns Promise<LoginPage> - Instance of the login page
     */
    async clickLogin(): Promise<LoginPage> {
        await this.lnkLogin.click();
        return new LoginPage(this.page);
    }

    /**
     * Searches for a product using the header search box
     * @param productName - Product name to search for
     * @returns Promise<SearchResultsPage> - Instance of the search results page
     */
    async searchProduct(productName: string): Promise<SearchResultsPage> {
        try {
            await this.txtSearch.fill(productName);
            await this.btnSearch.click();
            await this.page.waitForURL(/product\/search/);
            return new SearchResultsPage(this.page);
        } catch (error) {
            console.log(`Error searching for product: ${error}`);
            throw error;
        }
    }

    /**
     * Opens the shopping cart from the top menu
     * @returns Promise<CartPage> - Instance of the cart page
     */
    async clickShoppingCart(): Promise<CartPage> {
        await this.lnkShoppingCart.click();
        await this.page.waitForURL(/checkout\/cart/);
        return new CartPage(this.page);
    }
}
