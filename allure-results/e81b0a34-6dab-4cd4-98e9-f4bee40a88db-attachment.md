# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\fakestore-api.spec.ts >> Carts API >> 28. Delete cart
- Location: tests\api\fakestore-api.spec.ts:348:7

# Error details

```
Error: Unexpected status for https://fakestoreapi.com/carts/2

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 403
```

# Test source

```ts
  1   | import { test, expect, APIResponse } from '@playwright/test';
  2   | import Ajv from 'ajv';
  3   | import * as fs from 'fs';
  4   | import * as path from 'path';
  5   | import { Routes } from '../../api/endpoints/routes';
  6   | 
  7   | test.use({ baseURL: Routes.BASE_URL });
  8   | 
  9   | // Replace {placeholders} in a route with real values
  10  | function buildRoute(route: string, params: Record<string, string | number> = {}): string {
  11  |   return Object.entries(params).reduce(
  12  |     (url, [key, value]) => url.replace(`{${key}}`, String(value)),
  13  |     route
  14  |   );
  15  | }
  16  | 
  17  | function loadSchema(fileName: string) {
  18  |   return JSON.parse(fs.readFileSync(path.join(__dirname, '../../api/schemas', fileName), 'utf-8'));
  19  | }
  20  | 
  21  | function validateSchema(schema: object, data: unknown) {
  22  |   const ajv = new Ajv({ allErrors: true });
  23  |   const validate = ajv.compile(schema);
  24  |   const valid = validate(data);
  25  |   expect(valid, `Schema validation failed: ${JSON.stringify(validate.errors, null, 2)}`).toBe(true);
  26  | }
  27  | 
  28  | async function expectStatus(response: APIResponse, status: number) {
> 29  |   expect(response.status(), `Unexpected status for ${response.url()}`).toBe(status);
      |                                                                        ^ Error: Unexpected status for https://fakestoreapi.com/carts/2
  30  | }
  31  | 
  32  | function expectAscending(ids: number[]) {
  33  |   expect(ids, 'IDs should be ascending').toEqual([...ids].sort((a, b) => a - b));
  34  | }
  35  | 
  36  | function expectDescending(ids: number[]) {
  37  |   expect(ids, 'IDs should be descending').toEqual([...ids].sort((a, b) => b - a));
  38  | }
  39  | 
  40  | const newProduct = {
  41  |   title: 'Playwright Test Backpack',
  42  |   price: 49.99,
  43  |   description: 'Product created by Playwright API test',
  44  |   image: 'https://i.pravatar.cc',
  45  |   category: 'electronics',
  46  | };
  47  | 
  48  | const newUser = {
  49  |   email: 'john.playwright@example.com',
  50  |   username: 'johnplaywright',
  51  |   password: 'Passw0rd!123',
  52  |   name: { firstname: 'John', lastname: 'Playwright' },
  53  |   address: {
  54  |     city: 'Toronto',
  55  |     street: 'King Street',
  56  |     number: 100,
  57  |     zipcode: '12926-3874',
  58  |     geolocation: { lat: '-37.3159', long: '81.1496' },
  59  |   },
  60  |   phone: '1-570-236-7033',
  61  | };
  62  | 
  63  | const newCart = {
  64  |   userId: 1,
  65  |   date: '2024-01-15',
  66  |   products: [
  67  |     { productId: 1, quantity: 2 },
  68  |     { productId: 3, quantity: 1 },
  69  |   ],
  70  | };
  71  | 
  72  | test.describe('Authentication', () => {
  73  |   test('1. Successful login returns a token', async ({ request }) => {
  74  |     const response = await request.post(Routes.AUTH_LOGIN, {
  75  |       data: { username: 'mor_2314', password: '83r5^_' },
  76  |     });
  77  |     await expectStatus(response, 201);
  78  |     const body = await response.json();
  79  |     expect(body.token, 'token should be present').toBeDefined();
  80  |     expect(typeof body.token, 'token should be a string').toBe('string');
  81  |     expect(body.token.length, 'token should not be empty').toBeGreaterThan(0);
  82  |   });
  83  | 
  84  |   test('2. Invalid login returns 401', async ({ request }) => {
  85  |     const response = await request.post(Routes.AUTH_LOGIN, {
  86  |       data: { username: 'wrong_user', password: 'wrong_pass' },
  87  |     });
  88  |     await expectStatus(response, 401);
  89  |     const text = await response.text();
  90  |     expect(text, 'error message should match').toContain('username or password is incorrect');
  91  |   });
  92  | });
  93  | 
  94  | test.describe('Products API', () => {
  95  |   test('3. Get all products', async ({ request }) => {
  96  |     const response = await request.get(Routes.GET_ALL_PRODUCTS);
  97  |     await expectStatus(response, 200);
  98  |     const products = await response.json();
  99  |     expect(Array.isArray(products), 'body should be an array').toBe(true);
  100 |     expect(products.length, 'should have products').toBeGreaterThan(0);
  101 |     for (const p of products) {
  102 |       expect(p).toEqual(
  103 |         expect.objectContaining({
  104 |           id: expect.any(Number),
  105 |           title: expect.any(String),
  106 |           price: expect.any(Number),
  107 |           category: expect.any(String),
  108 |           image: expect.any(String),
  109 |         })
  110 |       );
  111 |     }
  112 |   });
  113 | 
  114 |   test('4. Get product by ID', async ({ request }) => {
  115 |     const id = 1;
  116 |     const response = await request.get(buildRoute(Routes.GET_PRODUCT_BY_ID, { id }));
  117 |     await expectStatus(response, 200);
  118 |     const product = await response.json();
  119 |     expect(product.id, 'product id should match requested id').toBe(id);
  120 |     expect(product.title).toEqual(expect.any(String));
  121 |     expect(product.price).toEqual(expect.any(Number));
  122 |     expect(product.category).toEqual(expect.any(String));
  123 |     expect(product.image).toEqual(expect.any(String));
  124 |   });
  125 | 
  126 |   test('5. Get products with limit', async ({ request }) => {
  127 |     const limit = 5;
  128 |     const response = await request.get(buildRoute(Routes.GET_PRODUCTS_WITH_LIMIT, { limit }));
  129 |     await expectStatus(response, 200);
```