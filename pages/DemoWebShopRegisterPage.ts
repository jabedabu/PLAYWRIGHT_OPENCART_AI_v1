import { Page, Locator } from '@playwright/test';

export class DemoWebShopRegisterPage {
    private readonly page: Page;

    // Locators
    private readonly headingRegister: Locator;
    private readonly rdoMale: Locator;
    private readonly rdoFemale: Locator;
    private readonly txtFirstName: Locator;
    private readonly txtLastName: Locator;
    private readonly txtEmail: Locator;
    private readonly txtPassword: Locator;
    private readonly txtConfirmPassword: Locator;
    private readonly btnRegister: Locator;
    private readonly msgRegistrationCompleted: Locator;
    private readonly btnContinue: Locator;

    constructor(page: Page) {
        this.page = page;

        this.headingRegister = page.getByRole('heading', { name: 'Register' });
        this.rdoMale = page.getByLabel('Male', { exact: true });
        this.rdoFemale = page.getByLabel('Female');
        this.txtFirstName = page.getByLabel('First name:');
        this.txtLastName = page.getByLabel('Last name:');
        this.txtEmail = page.getByLabel('Email:');
        this.txtPassword = page.getByLabel('Password:', { exact: true });
        this.txtConfirmPassword = page.getByLabel('Confirm password:');
        this.btnRegister = page.getByRole('button', { name: 'Register' });
        this.msgRegistrationCompleted = page.getByText('Your registration completed');
        this.btnContinue = page.getByRole('button', { name: 'Continue' });
    }

    /**
     * Verifies the register page is displayed
     * @returns Promise<boolean> - true if the Register heading and form are visible
     */
    async isRegisterPageExists(): Promise<boolean> {
        try {
            return (await this.headingRegister.isVisible()) && (await this.btnRegister.isVisible());
        } catch (error) {
            console.log(`Error checking register page: ${error}`);
            return false;
        }
    }

    /**
     * Fills the registration form and submits it
     * @param userData - Customer details used for registration
     */
    async completeRegistration(userData: {
        gender: 'Male' | 'Female';
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }): Promise<void> {
        try {
            await (userData.gender === 'Male' ? this.rdoMale : this.rdoFemale).check();
            await this.txtFirstName.fill(userData.firstName);
            await this.txtLastName.fill(userData.lastName);
            await this.txtEmail.fill(userData.email);
            await this.txtPassword.fill(userData.password);
            await this.txtConfirmPassword.fill(userData.password);
            await this.btnRegister.click();
            await this.page.waitForURL(/registerresult/);
        } catch (error) {
            console.log(`Error completing registration: ${error}`);
            throw error;
        }
    }

    /**
     * Verifies the registration-completed confirmation message
     * @returns Promise<boolean> - true if the message is visible
     */
    async isRegistrationCompleted(): Promise<boolean> {
        try {
            return await this.msgRegistrationCompleted.isVisible();
        } catch (error) {
            console.log(`Error checking registration confirmation: ${error}`);
            return false;
        }
    }

    /**
     * Clicks Continue on the registration result page
     */
    async clickContinue(): Promise<void> {
        await this.btnContinue.click();
    }
}
