import { Page, Locator } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;

    // Locators
    private readonly txtEmail: Locator;
    private readonly txtPassword: Locator;
    private readonly btnLogin: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.txtEmail = page.getByRole('textbox', { name: 'E-Mail Address' });
        this.txtPassword = page.getByRole('textbox', { name: 'Password' });
        this.btnLogin = page.locator('#content form').getByRole('button', { name: 'Login' });
    }

    /**
     * Logs in with the given credentials
     * @param email - Customer email
     * @param password - Customer password
     */
    async login(email: string, password: string): Promise<void> {
        try {
            await this.txtEmail.fill(email);
            await this.txtPassword.fill(password);
            await this.btnLogin.click();
        } catch (error) {
            console.log(`Error during login: ${error}`);
            throw error;
        }
    }
}
