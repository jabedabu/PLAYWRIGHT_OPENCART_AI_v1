/**
 * Test Case: End-to-end shopping flow (register, re-login, search, add to cart, verify cart)
 *
 * Tags: @master @regression @web
 *
 * Steps:
 * 1) Open the application and navigate to the register page
 * 2) Register a new customer with unique data
 * 3) Log out
 * 4) Log in with the new credentials
 * 5) Search for a known product
 * 6) Open the product details page and add it to the cart
 * 7) Open the shopping cart and verify product, quantity, price and total
 */

// using custom fixtures
import { test, expect } from '../../fixtures/pageFixtures';
import { RandomDataUtil } from '../../utils/dataGenerator';
import { Helper } from '../../utils/helper';

test('End-to-end shopping flow test @master @regression @web', async ({
    homePage,
    loginPage,
    registerPage,
    registrationSuccessPage,
    myAccountPage,
    logoutPage,
    searchResultsPage,
    productPage,
    cartPage,
}) => {
    const { productName, productQuantity, totalPrice } = Helper.getProductDetails();
    const unique = Date.now();
    const userData = {
        firstName: RandomDataUtil.getFirstName(),
        lastName: RandomDataUtil.getLastName(),
        email: `${RandomDataUtil.getUsername()}.${unique}@example.com`.toLowerCase(),
        password: RandomDataUtil.getPassword(),
    };

    await test.step('1) Open the application and navigate to the register page', async () => {
        await homePage.clickMyAccount();
        await homePage.clickRegister();
        expect(await registerPage.isRegisterPageExists()).toBeTruthy();
    });

    await test.step('2) Register a new customer and verify the registration', async () => {
        await registerPage.completeRegistration(userData);
        expect(await registrationSuccessPage.isAccountCreated()).toBeTruthy();
        await registrationSuccessPage.clickContinue();
        expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy();
    });

    await test.step('3) Log out', async () => {
        await myAccountPage.clickLogout();
        expect(await logoutPage.isLogoutPageExists()).toBeTruthy();
        await logoutPage.clickContinue();
    });

    await test.step('4) Log in with the newly created credentials and verify authentication', async () => {
        await homePage.clickMyAccount();
        await homePage.clickLogin();
        await loginPage.login(userData.email, userData.password);
        expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy();
    });

    await test.step('5) Search for a known product', async () => {
        await homePage.searchProduct(productName);
        expect(await searchResultsPage.isProductExists(productName)).toBeTruthy();
    });

    await test.step('6) Open the product details page and add the product to the cart', async () => {
        await searchResultsPage.selectProduct(productName);
        expect(await productPage.getProductName()).toBe(productName);
        await productPage.clickAddToCart();
        expect(await productPage.isAddedToCartMessageDisplayed(productName)).toBeTruthy();
    });

    await test.step('7) Open the shopping cart and verify product, quantity, price and total', async () => {
        await homePage.clickShoppingCart();
        expect(await cartPage.isProductInCart(productName)).toBeTruthy();
        expect(await cartPage.getQuantity(productName)).toBe(productQuantity);
        expect(await cartPage.getUnitPrice(productName)).toBe(totalPrice);
        expect(await cartPage.getCartTotal()).toBe(totalPrice);
    });

    console.log('✅ End-to-end shopping flow completed successfully!');
});
