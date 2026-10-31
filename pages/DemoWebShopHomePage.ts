import { Page, Locator } from '@playwright/test';
import { DemoWebShopRegisterPage } from './DemoWebShopRegisterPage';

export class DemoWebShopHomePage {
    private readonly page: Page;

    // Locators
    private readonly lnkRegister: Locator;
    private readonly lnkLogout: Locator;

    constructor(page: Page) {
        this.page = page;

        this.lnkRegister = page.getByRole('link', { name: 'Register' });
        this.lnkLogout = page.getByRole('link', { name: 'Log out' });
    }

    /**
     * Clicks the Register link in the header
     * @returns Promise<DemoWebShopRegisterPage> - Instance of the register page
     */
    async clickRegister(): Promise<DemoWebShopRegisterPage> {
        await this.lnkRegister.click();
        return new DemoWebShopRegisterPage(this.page);
    }

    /**
     * Verifies the account link with the customer's email and the Log out link are shown in the header
     * @param email - Email address of the registered customer
     * @returns Promise<boolean> - true if both header links are visible
     */
    async isAccountLinkDisplayed(email: string): Promise<boolean> {
        try {
            const lnkAccount = this.page.locator('.header-links').getByRole('link', { name: email, exact: true });
            return (await lnkAccount.isVisible()) && (await this.lnkLogout.isVisible());
        } catch (error) {
            console.log(`Error checking account link: ${error}`);
            return false;
        }
    }
}
