import { Page, Locator } from '@playwright/test';
import { LogoutPage } from './LogoutPage';

export class MyAccountPage {
    private readonly page: Page;

    // Locators
    private readonly headingMyAccount: Locator;
    private readonly lnkMyAccountMenu: Locator;
    private readonly lnkLogout: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.headingMyAccount = page.locator('#content').getByRole('heading', { name: 'My Account' });
        this.lnkMyAccountMenu = page.locator('#top').getByRole('link', { name: 'My Account' }).first();
        this.lnkLogout = page.locator('#top').getByRole('link', { name: 'Logout' });
    }

    /**
     * Verifies the My Account page is displayed (waits for the login/redirect to finish)
     * @returns Promise<boolean> - true if the My Account heading is visible
     */
    async isMyAccountPageExists(): Promise<boolean> {
        try {
            await this.headingMyAccount.waitFor({ state: 'visible', timeout: 10000 });
            return true;
        } catch (error) {
            console.log(`Error checking My Account page: ${error}`);
            return false;
        }
    }

    /**
     * Logs out using the My Account dropdown in the top menu
     * @returns Promise<LogoutPage> - Instance of the logout confirmation page
     */
    async clickLogout(): Promise<LogoutPage> {
        await this.lnkMyAccountMenu.click();
        await this.lnkLogout.click();
        await this.page.waitForURL(/account\/logout/);
        return new LogoutPage(this.page);
    }
}
