/**
 * Test Case: Demo Web Shop user registration
 *
 * Tags: @master @regression @web
 *
 * Steps:
 * 1) Open the application and navigate to Register
 * 2) Register a new customer with unique data
 * 3) Verify the registration confirmation
 * 4) Verify the new account is available in the header navigation
 */

// using custom fixtures
import { test, expect } from '../../fixtures/pageFixtures';
import { RandomDataUtil } from '../../utils/dataGenerator';

test('User registration test @master @regression @web', async ({
    demoWebShopHomePage,
    demoWebShopRegisterPage,
}) => {
    const userData = {
        gender: 'Male' as const,
        firstName: RandomDataUtil.getFirstName(),
        lastName: RandomDataUtil.getLastName(),
        email: `${RandomDataUtil.getUsername()}.${Date.now()}@example.com`.toLowerCase(),
        password: RandomDataUtil.getPassword(),
    };

    await test.step('1) Open the application and navigate to Register', async () => {
        await demoWebShopHomePage.clickRegister();
        expect(await demoWebShopRegisterPage.isRegisterPageExists()).toBeTruthy();
    });

    await test.step('2) Register a new customer', async () => {
        await demoWebShopRegisterPage.completeRegistration(userData);
    });

    await test.step('3) Verify the registration confirmation', async () => {
        expect(await demoWebShopRegisterPage.isRegistrationCompleted()).toBeTruthy();
        await demoWebShopRegisterPage.clickContinue();
    });

    await test.step('4) Verify the new account is available in the header navigation', async () => {
        expect(await demoWebShopHomePage.isAccountLinkDisplayed(userData.email)).toBeTruthy();
    });

    console.log('✅ User registration completed successfully!');
});
