import { Page, Locator } from '@playwright/test';
import { RegistrationSuccessPage } from './RegistrationSuccessPage';

export class RegisterPage {
    private readonly page: Page;

    // Locators
    private readonly txtFirstName: Locator;
    private readonly txtLastName: Locator;
    private readonly txtEmail: Locator;
    private readonly txtPassword: Locator;
    private readonly chkPrivacyPolicy: Locator;
    private readonly btnContinue: Locator;
    private readonly headingRegister: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.txtFirstName = page.getByRole('textbox', { name: 'First Name' });
        this.txtLastName = page.getByRole('textbox', { name: 'Last Name' });
        this.txtEmail = page.getByRole('textbox', { name: 'E-Mail' });
        this.txtPassword = page.getByRole('textbox', { name: 'Password' });
        this.chkPrivacyPolicy = page.locator('input[name="agree"]');
        this.btnContinue = page.getByRole('button', { name: 'Continue' });
        this.headingRegister = page.getByRole('heading', { name: 'Register Account' });
    }

    /**
     * Verifies the register page is displayed
     * @returns Promise<boolean> - true if the Register Account heading is visible
     */
    async isRegisterPageExists(): Promise<boolean> {
        try {
            return await this.headingRegister.isVisible();
        } catch (error) {
            console.log(`Error checking register page: ${error}`);
            return false;
        }
    }

    /**
     * Fills the registration form, accepts the privacy policy and submits it
     * @param userData - First name, last name, email and password of the new customer
     * @returns Promise<RegistrationSuccessPage> - Instance of the account-created page
     */
    async completeRegistration(userData: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }): Promise<RegistrationSuccessPage> {
        try {
            await this.txtFirstName.fill(userData.firstName);
            await this.txtLastName.fill(userData.lastName);
            await this.txtEmail.fill(userData.email);
            await this.txtPassword.fill(userData.password);
            await this.chkPrivacyPolicy.check();
            await this.btnContinue.click();
            await this.page.waitForURL(/account\/success/);
            return new RegistrationSuccessPage(this.page);
        } catch (error) {
            console.log(`Error completing registration: ${error}`);
            throw error;
        }
    }
}
