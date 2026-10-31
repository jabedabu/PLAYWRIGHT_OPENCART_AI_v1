
OpenCart Customer Registration: UI, Admin, and Database Test

Implement one end-to-end test using the framework rules in playwright-mcp-context.md.

Goal--
Register a new customer through the OpenCart website, then verify that the same customer appears in the Admin Portal and MySQL database. Generate new customer data for each run so the email is unique.

Application details

- Store: http://localhost/opencart/upload/
- Admin: http://localhost/opencart/upload/admin/index.php
- Admin login: Use credentials configured for the test environment.
- MySQL: localhost:3306
- Database: openshop
- Username: root
- Password: empty
- Table: oc_customer

Test steps

1. Register through the website
1. Open the store and go to My Account → Register.
2. Confirm the registration page is visible.
3. Generate a unique first name, last name, email, telephone number, and password.
4. Fill in the required fields, confirm the password, accept the Privacy Policy, and submit.
5. Confirm registration succeeded and the account-created message is shown.
6. Keep the generated customer details for the next steps.
2. Check the Admin Portal
1. Open the Admin Portal and sign in using the configured credentials.
2. Go to Customers and search using the new email address.
3. Confirm the customer is listed.
4. Open the customer details when available and check the first name, last name, and email.
5. Confirm the customer status is correct.
3. Check the database
1. Connect to MySQL using the configured database details.
2. Find the row in oc_customer with the new email address.
3. Confirm exactly one matching customer exists.
4. Check that firstname, lastname, and email match the generated values.
5. Check that status is correct and date_added is present if that column exists.
6. Close the connection even if a check fails.

Pass condition

The test passes only if the new customer is registered successfully and the same customer’s details match in the website, Admin Portal, and database. If a value does not match, fail with a clear message.

   