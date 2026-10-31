import { Page, Locator } from '@playwright/test';
import { MyAccountPage } from './MyAccountPage';

export class RegistrationSuccessPage {
    private readonly page: Page;

    // Locators
    private readonly headingSuccess: Locator;
    private readonly lblConfirmation: Locator;
    private readonly btnContinue: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.headingSuccess = page.locator('#content').getByRole('heading', { name: 'Your Account Has Been Created!' });
        this.lblConfirmation = page.getByText('Congratulations! Your new account has been successfully created!');
        this.btnContinue = page.locator('#content').getByRole('link', { name: 'Continue' });
    }

    /**
     * Verifies the account-created confirmation is displayed
     * @returns Promise<boolean> - true if the heading and confirmation message are visible
     */
    async isAccountCreated(): Promise<boolean> {
        try {
            return (await this.headingSuccess.isVisible()) && (await this.lblConfirmation.isVisible());
        } catch (error) {
            console.log(`Error checking account created page: ${error}`);
            return false;
        }
    }

    /**
     * Clicks Continue on the confirmation page
     * @returns Promise<MyAccountPage> - Instance of the My Account page
     */
    async clickContinue(): Promise<MyAccountPage> {
        await this.btnContinue.click();
        return new MyAccountPage(this.page);
    }
}
