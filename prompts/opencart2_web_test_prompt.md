
OpenCart Frontend Test Scenarios

Application: http://localhost/opencart/upload/

Implement these scenarios using the conventions in playwright-mcp-context.md.

1. Register a customer
   - Open My Account → Register and verify the page loads.
   - Fill in valid details, including a unique email, and accept the Privacy Policy.
   - Submit the form and verify the account-created confirmation and account navigation.
2. Log in with valid credentials
   - Open My Account → Login and enter valid credentials from the project’s test data.
   - Verify login succeeds and the My Account area is displayed.
3. Reject invalid credentials
   - Submit an invalid email and/or password.
   - Verify login fails, the customer remains unauthenticated, and the warning appears:
     Warning: No match for E-Mail Address and/or Password.
4. Log out
   - Log in, select Logout, and verify the logout confirmation.
   - Select Continue and verify the expected redirect and that authenticated options are no longer available.
5. Search for a product
   - Search for a known product.
   - Verify the results page includes the expected product with the correct name.
6. Add a product to the cart
   - Find a known product and open its details page.
   - Set the requested quantity, if applicable, and select Add to Cart.
   - Verify the confirmation and check that the cart contains the product in the expected quantity.
7. Complete an end-to-end shopping journey
   - Register a customer with unique data, log out, then log back in.
   - Search for a known product and add it to the cart.
   - Verify the product, quantity, price, and applicable total.
8. Test login with external data
   - Load login data from one of these files:
     - testdata/opencart_logindata.csv
     - testdata/opencart_logindata.xlsx
     - testdata/opencart_logindata.json
   - Each row contains a scenario name (testName or TestName), email, password, and expected result (success or failure). Do not hard-code test data in the spec.
   - Generate one independent test per row. Leave blank or whitespace-only fields empty; do not substitute dummy values.
   - For successful rows, verify login and the My Account page. For failed rows, verify login is rejected and the appropriate warning appears. For blank credentials, verify the application’s actual validation behavior.
Overall expected result: Each scenario behaves as described, and each data-driven login test matches its row’s expected result.

   
