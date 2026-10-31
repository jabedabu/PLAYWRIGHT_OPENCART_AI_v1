

demowebshop – Web Test Scenarios

Application URL: https://demowebshop.tricentis.com/

Implement these scenarios following the framework conventions defined in playwright-mcp-context.md.

    1. User Registration Flow

Validate successful customer registration in the OpenCart frontend.

Open the application.
Navigate to   Register.
Verify that the registration page is displayed.
Generate a unique customer email.
Enter valid values for:
First Name
Last Name
Email Address
Gender
Password
Password Confirmation
Accept the Privacy Policy.
Submit the registration form.
Verify that registration succeeds.
Verify the account-created confirmation
Verify that the newly created account is available through the expected account navigation.
Expected Result
The registration completes successfully and the confirmation message is displayed.
