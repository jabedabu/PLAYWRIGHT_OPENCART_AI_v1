import { test as base } from '@playwright/test';
import dotenv from 'dotenv';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { RegistrationSuccessPage } from '../pages/RegistrationSuccessPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { LogoutPage } from '../pages/LogoutPage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

import { DemoWebShopHomePage } from '../pages/DemoWebShopHomePage';
import { DemoWebShopRegisterPage } from '../pages/DemoWebShopRegisterPage';

dotenv.config();

const APP_URL = process.env.WEB_APP_URL || 'https://demo.opencart.com/';
const DEMOWEBSHOP_URL = process.env.DEMOWEBSHOP_URL || 'https://demowebshop.tricentis.com/';

type PageFixtures = {
    homePage: HomePage;
    loginPage: LoginPage;
    registerPage: RegisterPage;
    registrationSuccessPage: RegistrationSuccessPage;
    myAccountPage: MyAccountPage;
    logoutPage: LogoutPage;
    searchResultsPage: SearchResultsPage;
    productPage: ProductPage;
    cartPage: CartPage;
    demoWebShopHomePage: DemoWebShopHomePage;
    demoWebShopRegisterPage: DemoWebShopRegisterPage;
};

export const test = base.extend<PageFixtures>({
    homePage: async ({ page }, use) => {
        await page.goto(APP_URL);
        await use(new HomePage(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    registerPage: async ({ page }, use) => {
        await use(new RegisterPage(page));
    },
    registrationSuccessPage: async ({ page }, use) => {
        await use(new RegistrationSuccessPage(page));
    },
    myAccountPage: async ({ page }, use) => {
        await use(new MyAccountPage(page));
    },
    logoutPage: async ({ page }, use) => {
        await use(new LogoutPage(page));
    },
    searchResultsPage: async ({ page }, use) => {
        await use(new SearchResultsPage(page));
    },
    productPage: async ({ page }, use) => {
        await use(new ProductPage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    demoWebShopHomePage: async ({ page }, use) => {
        await page.goto(DEMOWEBSHOP_URL);
        await use(new DemoWebShopHomePage(page));
    },
    demoWebShopRegisterPage: async ({ page }, use) => {
        await use(new DemoWebShopRegisterPage(page));
    },
});

test.afterEach(async ({ page }) => {
    if (!page.isClosed()) {
        await page.close();
    }
    const context = page.context();
    await context.close().catch(() => {});
});

export { expect } from '@playwright/test';
