
   FakeStore REST API – API Test Prompts

Base URL: https://fakestoreapi.com

Common Requirements

For every prompt:

Create a Playwright API test using TypeScript.
Use the existing Playwright project/framework structure.
Use Playwright's request fixture / APIRequestContext according to the existing project framework.
Use the existing Routes constants when the project already defines them.
Do not invent route names that are not present in the project.
Keep request construction, response parsing, and assertions clear for beginners.
Validate status codes, response structure, and important business fields.
Add meaningful test and assertion messages.
Avoid weak assertions such as checking only that a response exists.
Use API response data as input to later operations in workflow tests.
Keep independent tests independent; do not rely on another test's execution order unless the prompt explicitly requires a workflow.
For CRUD tests, use deterministic test data and capture returned IDs.
Where the API's behavior is not guaranteed by the supplied test material, validate the response contract rather than adding unsupported assumptions.
Authentication

1. Successful Login
Create a Playwright API test using TypeScript to verify successful authentication.

Use AUTH_LOGIN from Routes.
Send a POST request with valid username and password.
Verify status code 201.
Parse the JSON response.
Verify that token exists.
Verify that token is a non-empty string.
Expected Result
Status 201 is returned and a non-empty authentication token is provided.

2. Invalid Login
Create a Playwright API test using TypeScript to verify authentication failure.

Use AUTH_LOGIN from Routes.
Send invalid username and password.
Verify status code 401.
Parse the response.
Verify the error message is:
username or password is incorrect

Expected Result
Status 401 is returned with the expected authentication error.

Products API
3. Get All Products
Create a Playwright API test to retrieve all products.

Use GET_ALL_PRODUCTS from Routes.
Send a GET request.
Verify status 200.
Verify the response body is an array.
Verify that the array contains at least one product.
Validate important fields such as:
id
title
price
category
image
Expected Result
A non-empty product array is returned with the expected product structure.

4. Get Product by ID
Create a Playwright API test to retrieve one product.

Use GET_PRODUCT_BY_ID from Routes.
Select a valid product ID.
Replace the {id} path parameter.
Send a GET request.
Verify status 200.
Verify the returned id matches the requested ID.
Validate the important product properties.
Expected Result
The requested product is returned and its ID matches the requested ID.

5. Get Products with Limit
Create a Playwright API test to validate the product limit parameter.

Use GET_PRODUCTS_WITH_LIMIT from Routes.
Send a GET request with a predefined limit.
Verify status 200.
Verify the response is an array.
Verify the returned number of products matches the requested limit.
Expected Result
The response contains an array with the requested number of products.

6. Sort Products – Ascending
Create a Playwright API test to verify ascending product sorting.

Use GET_PRODUCTS_SORTED from Routes.
Send the request with the project's supported ascending sort parameter.
Verify status 200.
Extract product IDs.
Verify IDs are in ascending order.
Expected Result
Product IDs follow ascending order.

7. Sort Products – Descending
Create a Playwright API test to verify descending product sorting.

Use GET_PRODUCTS_SORTED from Routes.
Send the request with the project's supported descending sort parameter.
Verify status 200.
Extract product IDs.
Verify IDs are in descending order.
Expected Result
Product IDs follow descending order.

8. Get All Product Categories
Create a Playwright API test to retrieve all product categories.

Use GET_ALL_CATEGORIES from Routes.
Send a GET request.
Verify status 200.
Verify the response is an array.
Verify the category list is not empty.
Expected Result
A non-empty category array is returned.

9. Get Products by Category
Create a Playwright API test to retrieve products for a specific category.

Use GET_PRODUCTS_BY_CATEGORY from Routes.
Use a valid category such as electronics.
Replace {category} with the selected category.
Send a GET request.
Verify status 200.
Verify the response is an array.
Verify every returned product has the requested category.
Expected Result
Products for the requested category are returned and each product belongs to that category.

10. Product CRUD – Create
Create a Playwright API test to create a product.

Use CREATE_PRODUCT from Routes.
Send a POST request with valid product data.
Verify status 201.
Parse the response.
Verify a product ID is returned.
Verify the response contains the submitted product information.
Expected Result
The product creation request succeeds and a product ID is returned.

11. Product CRUD – Update
Create a Playwright API test to update an existing product.

Use UPDATE_PRODUCT from Routes.
Select a valid product ID.
Send a PUT request with updated product information.
Verify status 200.
Verify the response contains the updated values.
Verify the returned product ID matches the requested ID.
Expected Result
The update request succeeds and the response reflects the requested changes.

12. Product CRUD – Delete
Create a Playwright API test to delete a product.

Use DELETE_PRODUCT from Routes.
Select a valid product ID.
Send a DELETE request.
Verify status 200.
Validate the response body where the API contract provides one.
Expected Result
The delete request is processed successfully.

Users API
13. Get All Users
Create a Playwright API test to retrieve all users.

Use GET_ALL_USERS from Routes.
Send a GET request.
Verify status 200.
Verify the response is an array.
Verify the array is not empty.
Expected Result
A non-empty user array is returned.

14. Get User by ID
Create a Playwright API test to retrieve a specific user.

Use GET_USER_BY_ID from Routes.
Select a valid user ID.
Replace {id}.
Send a GET request.
Verify status 200.
Verify the returned user ID matches the requested ID.
Expected Result
The requested user is returned with the correct ID.

15. Get Users with Limit
Create a Playwright API test to validate user result limiting.

Use GET_USERS_WITH_LIMIT from Routes.
Send a GET request with a predefined limit.
Verify status 200.
Verify the response is an array.
Verify the returned user count matches the requested limit.
Expected Result
The response contains the requested number of users.

16. Sort Users
Create Playwright API tests using TypeScript to verify user sorting.

Use GET_USERS_SORTED from Routes.
Test both ascending and descending sorting.
Verify status 200 for each request.
Extract user IDs.
Verify the IDs follow the requested sort order.
Expected Result
User IDs follow the requested ascending or descending order.

17. User CRUD – Create
Create a Playwright API test to create a user.

Use CREATE_USER from Routes.
Send a POST request with valid user information.
Verify status 201.
Verify a generated user ID is returned.
Validate the returned user information.
Expected Result
The user is created successfully and a user ID is returned.

18. User CRUD – Update
Create a Playwright API test to update a user.

Use UPDATE_USER from Routes.
Select a valid user ID.
Send a PUT request with updated user information.
Verify status 200.
Verify the response contains the updated values.
Expected Result
The update request succeeds and the response contains the requested changes.

19. User CRUD – Delete
Create a Playwright API test to delete a user.

Use DELETE_USER from Routes.
Select a valid user ID.
Send a DELETE request.
Verify status 200.
Validate the response body where applicable.
Expected Result
The delete request is processed successfully.

Carts API
20. Get All Carts
Create a Playwright API test to retrieve all carts.

Use GET_ALL_CARTS from Routes.
Send a GET request.
Verify status 200.
Verify the response is an array.
Verify the array is not empty.
Expected Result
A non-empty cart array is returned.

21. Get Cart by ID
Create a Playwright API test to retrieve a specific cart.

Use GET_CART_BY_ID from Routes.
Select a valid cart ID.
Replace {id}.
Send a GET request.
Verify status 200.
Verify the returned cart ID matches the requested ID.
Expected Result
The requested cart is returned with the correct ID.

22. Get Carts by Date Range
Create a Playwright API test to validate cart filtering by date range.

Use GET_CARTS_BY_DATE_RANGE from Routes.
Provide valid start and end dates.
Send a GET request.
Verify status 200.
Verify the response is an array.
Verify returned cart records fall within the requested date range according to the API's response format.
Expected Result
The response contains carts matching the requested date range.

23. Get User Cart
Create a Playwright API test to retrieve carts belonging to a specific user.

Use GET_USER_CART from Routes.
Provide a valid user ID.
Send a GET request.
Verify status 200.
Verify the response contains cart records where applicable.
Verify returned carts belong to the requested user.
Expected Result
The requested user's carts are returned.

24. Get Carts with Limit
Create a Playwright API test to validate cart result limiting.

Use GET_CARTS_WITH_LIMIT from Routes.
Send a GET request with a predefined limit.
Verify status 200.
Verify the response is an array.
Verify the returned cart count matches the requested limit.
Expected Result
The response contains the requested number of carts.

25. Sort Carts
Create Playwright API tests to verify cart sorting.

Use GET_CARTS_SORTED from Routes.
Test ascending and descending sorting.
Verify status 200 for each request.
Extract cart IDs.
Verify IDs are sorted according to the requested order.
Expected Result
Cart IDs follow the requested sort order.

26. Cart CRUD – Create
Create a Playwright API test to create a cart.

Use CREATE_CART from Routes.
Send a POST request containing a valid user ID and products list.
Verify status 201.
Verify a cart ID is returned.
Verify the response contains the expected user ID and products.
Expected Result
The cart is created successfully and its returned data matches the submitted data.

27. Cart CRUD – Update
Create a Playwright API test to update an existing cart.

Use UPDATE_CART from Routes.
Select a valid cart ID.
Send a PUT request with updated cart information.
Change at least one product quantity.
Verify status 200.
Verify the response reflects the updated values.
Expected Result
The cart update succeeds and the requested quantity change is reflected.

28. Cart CRUD – Delete
Create a Playwright API test to delete an existing cart.

Use DELETE_CART from Routes.
Select a valid cart ID.
Send a DELETE request.
Verify status 200.
Validate the response body where applicable.
Expected Result
The cart deletion request is processed successfully.

JSON Schema Validation
29. Product Response Schema
Create a Playwright API test to validate the JSON schema of a product response.

Retrieve a product using GET_PRODUCT_BY_ID.
Verify status 200.
Define the expected product JSON schema based on the API response contract.
Validate the response against the schema.
Fail the test with a useful validation message when the schema does not match.
Expected Result
The product response conforms to the expected JSON schema.

30. User Response Schema
Create a Playwright API test to validate the JSON schema of a user response.

Retrieve a user using GET_USER_BY_ID.
Verify status 200.
Define the expected user JSON schema.
Validate the response against the schema.
Fail the test when the response does not conform to the schema.
Expected Result
The user response conforms to the expected JSON schema.

31. Cart Response Schema
Create a Playwright API test to validate the JSON schema of a cart response.

Retrieve a cart using GET_CART_BY_ID.
Verify status 200.
Define the expected cart JSON schema.
Validate the response against the schema.
Fail the test when the response does not conform to the schema.
Expected Result
The cart response conforms to the expected JSON schema.

End-to-End API Workflows
32. Product CRUD Workflow
Create a Playwright API test using TypeScript that validates the complete Product CRUD workflow.

Execute these operations in sequence:

Create a product using CREATE_PRODUCT.
Verify status 201.
Extract the returned product ID.
Update the same product using UPDATE_PRODUCT.
Verify status 200.
Verify the updated product values.
Delete the same product using DELETE_PRODUCT.
Verify status 200.
Use the product ID returned by the create operation for both update and delete.

Expected Result
The create → update → delete workflow completes successfully using the same generated product ID.

33. User CRUD Workflow
Create a Playwright API test using TypeScript that validates the complete User CRUD workflow.

Execute these operations in sequence:

Create a user using CREATE_USER.
Verify status 201.
Extract the returned user ID.
Update the same user using UPDATE_USER.
Verify status 200.
Verify the updated user information.
Delete the same user using DELETE_USER.
Verify status 200.
Use response data from each step as input for the next operation.

Expected Result
The create → update → delete workflow completes successfully using the same generated user ID.

34. Cart CRUD Workflow
Create a Playwright API test using TypeScript that validates the complete Cart CRUD workflow.

Execute these operations in sequence:

Create a cart using CREATE_CART.
Verify status 201.
Extract the returned cart ID.
Verify the returned user ID and products list.
Update the same cart using UPDATE_CART.
Verify status 200.
Verify the updated product quantity.
Delete the same cart using DELETE_CART.
Verify status 200.
Use the generated cart ID for both update and delete.

Expected Result
The create → update → delete workflow completes successfully using the same generated cart ID.

Final Implementation Quality Criteria
The generated API tests must:

Use TypeScript and Playwright API testing.
Follow the existing project's Routes structure.
Validate both status codes and response content.
Use strong assertions for important fields.
Produce useful failure messages.
Avoid duplicated setup where the existing framework already provides fixtures.
Keep independent tests isolated.
Use response chaining only where the prompt explicitly defines a workflow.
Keep the implementation simple enough for beginners to understand.