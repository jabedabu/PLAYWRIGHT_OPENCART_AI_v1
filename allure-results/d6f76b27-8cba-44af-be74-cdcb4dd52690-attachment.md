# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: web\end-to-end-shopping-flow.spec.ts >> End-to-end shopping flow test @master @regression @web
- Location: tests\web\end-to-end-shopping-flow.spec.ts:21:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('#top').getByRole('link', { name: 'My Account' }).first()
    - waiting for navigation to finish...
    - navigated to "https://demo.opencart.com/"

```

# Test source

```ts
  1  | import { Page, Locator } from '@playwright/test';
  2  | import { LoginPage } from './LoginPage';
  3  | import { RegisterPage } from './RegisterPage';
  4  | import { SearchResultsPage } from './SearchResultsPage';
  5  | import { CartPage } from './CartPage';
  6  | 
  7  | export class HomePage {
  8  |     private readonly page: Page;
  9  | 
  10 |     // Locators
  11 |     private readonly lnkMyAccount: Locator;
  12 |     private readonly lnkRegister: Locator;
  13 |     private readonly lnkLogin: Locator;
  14 |     private readonly lnkShoppingCart: Locator;
  15 |     private readonly txtSearch: Locator;
  16 |     private readonly btnSearch: Locator;
  17 | 
  18 |     constructor(page: Page) {
  19 |         this.page = page;
  20 | 
  21 |         // Initialize locators with CSS selectors
  22 |         this.lnkMyAccount = page.locator('#top').getByRole('link', { name: 'My Account' }).first();
  23 |         this.lnkRegister = page.locator('#top').getByRole('link', { name: 'Register' });
  24 |         this.lnkLogin = page.locator('#top').getByRole('link', { name: 'Login' });
  25 |         this.lnkShoppingCart = page.locator('#top').getByRole('link', { name: 'Shopping Cart' });
  26 |         this.txtSearch = page.getByRole('textbox', { name: 'Search' });
  27 |         this.btnSearch = page.locator('#search button');
  28 |     }
  29 | 
  30 |     /**
  31 |      * Opens the My Account dropdown in the top menu
  32 |      */
  33 |     async clickMyAccount(): Promise<void> {
> 34 |         await this.lnkMyAccount.click();
     |                                 ^ Error: locator.click: Target page, context or browser has been closed
  35 |     }
  36 | 
  37 |     /**
  38 |      * Clicks the Register option of the My Account dropdown
  39 |      * @returns Promise<RegisterPage> - Instance of the register page
  40 |      */
  41 |     async clickRegister(): Promise<RegisterPage> {
  42 |         await this.lnkRegister.click();
  43 |         return new RegisterPage(this.page);
  44 |     }
  45 | 
  46 |     /**
  47 |      * Clicks the Login option of the My Account dropdown
  48 |      * @returns Promise<LoginPage> - Instance of the login page
  49 |      */
  50 |     async clickLogin(): Promise<LoginPage> {
  51 |         await this.lnkLogin.click();
  52 |         return new LoginPage(this.page);
  53 |     }
  54 | 
  55 |     /**
  56 |      * Searches for a product using the header search box
  57 |      * @param productName - Product name to search for
  58 |      * @returns Promise<SearchResultsPage> - Instance of the search results page
  59 |      */
  60 |     async searchProduct(productName: string): Promise<SearchResultsPage> {
  61 |         try {
  62 |             await this.txtSearch.fill(productName);
  63 |             await this.btnSearch.click();
  64 |             await this.page.waitForURL(/product\/search/);
  65 |             return new SearchResultsPage(this.page);
  66 |         } catch (error) {
  67 |             console.log(`Error searching for product: ${error}`);
  68 |             throw error;
  69 |         }
  70 |     }
  71 | 
  72 |     /**
  73 |      * Opens the shopping cart from the top menu
  74 |      * @returns Promise<CartPage> - Instance of the cart page
  75 |      */
  76 |     async clickShoppingCart(): Promise<CartPage> {
  77 |         await this.lnkShoppingCart.click();
  78 |         await this.page.waitForURL(/checkout\/cart/);
  79 |         return new CartPage(this.page);
  80 |     }
  81 | }
  82 | 
```