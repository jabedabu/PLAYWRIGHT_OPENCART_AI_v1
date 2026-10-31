
  FakeStore REST API Test Prompts

Base URL: https://fakestoreapi.com

Requirements for every prompt

- Write TypeScript API tests using the project’s existing Playwright setup and request fixture.
- Use existing Routes constants. Don’t invent route names.
- Keep requests, response parsing, and assertions beginner friendly.
- Check status codes, response structure, and important fields with clear failure messages.
- Keep tests independent unless a workflow explicitly chains requests.
- Use deterministic data for CRUD tests and capture returned IDs.
- When API behavior is unspecified, verify the response contract without assuming extra behavior.
Authentication
1. Successful login: POST valid credentials to AUTH_LOGIN. Verify status 201 and a non-empty string token.
2. Invalid login: POST invalid credentials to AUTH_LOGIN. Verify status 401 and error message username or password is incorrect.
Products
3. Get all products: GET GET_ALL_PRODUCTS. Verify status 200, a non-empty array, and each product’s id, title, price, category, and image.
4. Get product by ID: GET GET_PRODUCT_BY_ID with a valid {id}. Verify status 200, matching ID, and required product fields.
5. Limit products: GET GET_PRODUCTS_WITH_LIMIT with a predefined limit. Verify status 200 and the requested number of products.
6. Sort products ascending: GET GET_PRODUCTS_SORTED using the project’s ascending parameter. Verify status 200 and ascending product IDs.
7. Sort products descending: GET GET_PRODUCTS_SORTED using the project’s descending parameter. Verify status 200 and descending product IDs.
8. Get categories: GET GET_ALL_CATEGORIES. Verify status 200 and a non-empty array.
9. Get products by category: GET GET_PRODUCTS_BY_CATEGORY for a valid category, such as electronics. Verify status 200 and that every result belongs to that category.
10. Create product: POST valid data to CREATE_PRODUCT. Verify status 201, a returned ID, and submitted values in the response.
11. Update product: PUT updated data to UPDATE_PRODUCT for a valid ID. Verify status 200, matching ID, and updated values.
12. Delete product: DELETE a valid ID using DELETE_PRODUCT. Verify status 200 and validate the body when the API contract defines one.
Users
13. Get all users: GET GET_ALL_USERS. Verify status 200 and a non-empty array.
14. Get user by ID: GET GET_USER_BY_ID with a valid {id}. Verify status 200 and matching user ID.
15. Limit users: GET GET_USERS_WITH_LIMIT with a predefined limit. Verify status 200 and the requested number of users.
16. Sort users: Test GET_USERS_SORTED in ascending and descending order. Verify status 200 and user IDs in the requested order.
17. Create user: POST valid data to CREATE_USER. Verify status 201, a generated ID, and returned user information.
18. Update user: PUT updated data to UPDATE_USER for a valid ID. Verify status 200 and the updated values.
19. Delete user: DELETE a valid ID using DELETE_USER. Verify status 200 and validate the body when applicable.
Carts
20. Get all carts: GET GET_ALL_CARTS. Verify status 200 and a non-empty array.
21. Get cart by ID: GET GET_CART_BY_ID with a valid {id}. Verify status 200 and matching cart ID.
22. Filter carts by date: GET GET_CARTS_BY_DATE_RANGE with valid start and end dates. Verify status 200 and that returned carts fall within the requested range, using the API’s date format.
23. Get a user’s carts: GET GET_USER_CART for a valid user ID. Verify status 200 and that returned carts belong to that user.
24. Limit carts: GET GET_CARTS_WITH_LIMIT with a predefined limit. Verify status 200 and the requested number of carts.
25. Sort carts: Test GET_CARTS_SORTED in ascending and descending order. Verify status 200 and cart IDs in the requested order.
26. Create cart: POST a valid user ID and products list to CREATE_CART. Verify status 201 and that the response contains the expected data and a cart ID.
27. Update cart: PUT updated data to UPDATE_CART for a valid ID, changing at least one product quantity. Verify status 200 and the change.
28. Delete cart: DELETE a valid ID using DELETE_CART. Verify status 200 and validate the body when applicable.
Response schemas
29. Product schema: Get a product using GET_PRODUCT_BY_ID. Verify status 200 and validate the response against a schema based on the API contract.
30. User schema: Get a user using GET_USER_BY_ID. Verify status 200 and validate the response against the expected schema.
31. Cart schema: Get a cart using GET_CART_BY_ID. Verify status 200 and validate the response against the expected schema.
Each schema test should fail with a useful message when validation fails.
CRUD workflows
For each workflow, pass the ID returned by the create request to the following update and delete requests.
32. Product workflow: Create with CREATE_PRODUCT; verify status 201 and capture the ID. Update with UPDATE_PRODUCT; verify status 200 and updated values. Delete with DELETE_PRODUCT; verify status 200.
33. User workflow: Create with CREATE_USER; verify status 201 and capture the ID. Update with UPDATE_USER; verify status 200 and updated information. Delete with DELETE_USER; verify status 200.
34. Cart workflow: Create with CREATE_CART; verify status 201, user ID, and products. Update with UPDATE_CART; verify status 200 and the changed quantity. Delete with DELETE_CART; verify status 200.
Quality criteria
Keep tests simple and beginner friendly. Reuse existing fixtures and setup. Use strong assertions and useful failure messages. Keep independent tests isolated, and chain response data only in the workflows above.

   