
OpenCart Frontend Store – Web Test Scenarios

Application URL: https://demo.opencart.com/

Implement these scenarios following the framework conventions defined in playwright-mcp-context.md.

1. User Registration Flow

Validate successful customer registration in the OpenCart frontend.

Open the application.
Navigate to My Account → Register.
Verify that the registration page is displayed.
Generate a unique customer email.
Enter valid values for:
First Name
Last Name
Email Address
Telephone
Password
Password Confirmation
Accept the Privacy Policy.
Submit the registration form.
Verify that registration succeeds.
Verify the account-created confirmation, such as "Your Account Has Been Created!".
Verify that the newly created account is available through the expected account navigation.
Expected Result
The registration completes successfully and the confirmation message is displayed.


2. Valid Login Flow

Validate successful customer login.

Open the application.
Navigate to My Account → Login.
Verify that the login page is displayed.
Enter valid customer credentials from the project's configured test data.
Submit the login form.
Verify successful authentication.
Verify that the user is redirected to the My Account section.
Verify that the account dashboard or appropriate authenticated account navigation is visible.
Expected Result
Valid credentials are accepted and the customer reaches the authenticated My Account area.


3. Invalid Login Flow

Verify login failure with invalid customer credentials.

Open the application.
Navigate to My Account → Login.
Enter an invalid email and/or password.
Submit the form.
Verify that authentication fails.
Verify the appropriate warning/error message.
Verify that the customer is not authenticated.
Expected warning for the supplied application scenario:

Warning: No match for E-Mail Address and/or Password.

Expected Result
The invalid login is rejected and the expected warning is displayed.


4. Logout Flow

Validate customer logout.

Open the application.
Log in using valid customer credentials.
Verify that authentication succeeds.
Navigate to the account logout option.
Click Logout.
Verify that the logout confirmation page is displayed.
Click Continue.
Verify the expected redirect, such as the homepage.
Verify that authenticated account options are no longer available.
Expected Result
The customer is logged out successfully and can no longer access authenticated account options.

5. Product Search Flow
Validate product search.

Open the application.
Locate the main product search field.
Enter a valid known product name.
Submit the search.
Verify that the search results page is displayed.
Verify that the expected product appears in the results.
Verify that the displayed product name matches the search criteria.
Expected Result
The search returns the expected product and the product name is displayed correctly.


6. Add Product to Cart

Validate adding a product to the shopping cart.

Open the application.
Search for a valid known product.
Open the product details page.
Verify that the product details are displayed.
Set the required quantity when the product supports quantity selection.
Click Add to Cart.
Verify the product-added success/confirmation message.
Open the shopping cart.
Verify that the selected product is present.
Verify the displayed quantity matches the requested quantity.
Expected Result
The selected product is successfully added to the cart with the expected quantity.


7. End-to-End Shopping Flow

Covers the complete customer shopping journey.

Open the application.
Register a new customer using dynamically generated unique data.
Verify successful registration.
Log out.
Log in again using the newly created credentials.
Verify successful authentication.
Search for a known product.
Open the product details page.
Add the product to the cart.
Open the shopping cart.
Verify the correct product.
Verify the quantity.
Verify the product price.
Verify the applicable cart total.
Verify that the complete journey finishes without errors.
Expected Result
Registration, re-login, product search, cart addition, and cart validation all succeed in one continuous customer journey.


8. Login Flow (Data Driven using External File)

Validate OpenCart customer login using test data loaded from an external file, with one independent test generated per data row.

Test Data
Load rows from an external data file — one of:

testdata/opencart_logindata.csv
testdata/opencart_logindata.xlsx
testdata/opencart_logindata.json
Each row contains:

testName or TestName — scenario name
email — login email
password — login password
expected — success or failure
Do not hard-code test data in the spec.

Test Flow
For each data row:

Open the OpenCart login page: http://localhost/opencart/upload/.
Enter the email and password.
If a value is blank/whitespace, leave that field empty.
Submit the login form.
Validate the result based on expected.
Validation
For expected: success:

Verify login is successful.
Verify the My Account page is displayed.
For expected: failure:

Verify login is unsuccessful.
Verify the appropriate OpenCart warning/error message, such as: Warning: No match for E-Mail Address and/or Password.
For blank email/password:

Verify the application's actual validation/error behavior.
Do not replace blank values with dummy data.

Expected Result
Loading the external test data produces one independent test per row, and the actual OpenCart login result matches each row's expected value.