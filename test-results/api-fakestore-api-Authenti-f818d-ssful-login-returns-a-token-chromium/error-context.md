# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\fakestore-api.spec.ts >> Authentication >> 1. Successful login returns a token
- Location: tests\api\fakestore-api.spec.ts:73:7

# Error details

```
Error: Unexpected status for https://fakestoreapi.com/auth/login

expect(received).toBe(expected) // Object.is equality

Expected: 201
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
      |                                                                        ^ Error: Unexpected status for https://fakestoreapi.com/auth/login
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
  79  |     expect(body, 'login response should be an object containing a token').toEqual(
  80  |       expect.objectContaining({ token: expect.any(String) })
  81  |     );
  82  |     expect(body.token, 'token should be present').toBeDefined();
  83  |     expect(typeof body.token, 'token should be a string').toBe('string');
  84  |     expect(body.token.length, 'token should not be empty').toBeGreaterThan(0);
  85  |   });
  86  | 
  87  |   test('2. Invalid login returns 401', async ({ request }) => {
  88  |     const response = await request.post(Routes.AUTH_LOGIN, {
  89  |       data: { username: 'wrong_user', password: 'wrong_pass' },
  90  |     });
  91  |     await expectStatus(response, 401);
  92  |     const text = await response.text();
  93  |     expect(text, 'error message should match').toContain('username or password is incorrect');
  94  |   });
  95  | });
  96  | 
  97  | test.describe('Products API', () => {
  98  |   test('3. Get all products', async ({ request }) => {
  99  |     const response = await request.get(Routes.GET_ALL_PRODUCTS);
  100 |     await expectStatus(response, 200);
  101 |     const products = await response.json();
  102 |     expect(Array.isArray(products), 'body should be an array').toBe(true);
  103 |     expect(products.length, 'should have products').toBeGreaterThan(0);
  104 |     for (const p of products) {
  105 |       expect(p).toEqual(
  106 |         expect.objectContaining({
  107 |           id: expect.any(Number),
  108 |           title: expect.any(String),
  109 |           price: expect.any(Number),
  110 |           category: expect.any(String),
  111 |           image: expect.any(String),
  112 |         })
  113 |       );
  114 |     }
  115 |   });
  116 | 
  117 |   test('4. Get product by ID', async ({ request }) => {
  118 |     const id = 1;
  119 |     const response = await request.get(buildRoute(Routes.GET_PRODUCT_BY_ID, { id }));
  120 |     await expectStatus(response, 200);
  121 |     const product = await response.json();
  122 |     expect(product.id, 'product id should match requested id').toBe(id);
  123 |     expect(product.title).toEqual(expect.any(String));
  124 |     expect(product.price).toEqual(expect.any(Number));
  125 |     expect(product.category).toEqual(expect.any(String));
  126 |     expect(product.image).toEqual(expect.any(String));
  127 |   });
  128 | 
  129 |   test('5. Get products with limit', async ({ request }) => {
```