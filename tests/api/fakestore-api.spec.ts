import { test, expect, APIResponse } from '@playwright/test';
import Ajv from 'ajv';
import * as fs from 'fs';
import * as path from 'path';
import { Routes } from '../../api/endpoints/routes';

test.use({ baseURL: Routes.BASE_URL });

// Replace {placeholders} in a route with real values
function buildRoute(route: string, params: Record<string, string | number> = {}): string {
  return Object.entries(params).reduce(
    (url, [key, value]) => url.replace(`{${key}}`, String(value)),
    route
  );
}

function loadSchema(fileName: string) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, '../../api/schemas', fileName), 'utf-8'));
}

function validateSchema(schema: object, data: unknown) {
  const ajv = new Ajv({ allErrors: true });
  const validate = ajv.compile(schema);
  const valid = validate(data);
  expect(valid, `Schema validation failed: ${JSON.stringify(validate.errors, null, 2)}`).toBe(true);
}

async function expectStatus(response: APIResponse, status: number) {
  expect(response.status(), `Unexpected status for ${response.url()}`).toBe(status);
}

function expectAscending(ids: number[]) {
  expect(ids, 'IDs should be ascending').toEqual([...ids].sort((a, b) => a - b));
}

function expectDescending(ids: number[]) {
  expect(ids, 'IDs should be descending').toEqual([...ids].sort((a, b) => b - a));
}

const newProduct = {
  title: 'Playwright Test Backpack',
  price: 49.99,
  description: 'Product created by Playwright API test',
  image: 'https://i.pravatar.cc',
  category: 'electronics',
};

const newUser = {
  email: 'john.playwright@example.com',
  username: 'johnplaywright',
  password: 'Passw0rd!123',
  name: { firstname: 'John', lastname: 'Playwright' },
  address: {
    city: 'Toronto',
    street: 'King Street',
    number: 100,
    zipcode: '12926-3874',
    geolocation: { lat: '-37.3159', long: '81.1496' },
  },
  phone: '1-570-236-7033',
};

const newCart = {
  userId: 1,
  date: '2024-01-15',
  products: [
    { productId: 1, quantity: 2 },
    { productId: 3, quantity: 1 },
  ],
};

test.describe('Authentication', () => {
  test('1. Successful login returns a token', async ({ request }) => {
    const response = await request.post(Routes.AUTH_LOGIN, {
      data: { username: 'mor_2314', password: '83r5^_' },
    });
    await expectStatus(response, 201);
    const body = await response.json();
    expect(body, 'login response should be an object containing a token').toEqual(
      expect.objectContaining({ token: expect.any(String) })
    );
    expect(body.token, 'token should be present').toBeDefined();
    expect(typeof body.token, 'token should be a string').toBe('string');
    expect(body.token.length, 'token should not be empty').toBeGreaterThan(0);
  });

  test('2. Invalid login returns 401', async ({ request }) => {
    const response = await request.post(Routes.AUTH_LOGIN, {
      data: { username: 'wrong_user', password: 'wrong_pass' },
    });
    await expectStatus(response, 401);
    const text = await response.text();
    expect(text, 'error message should match').toContain('username or password is incorrect');
  });
});

test.describe('Products API', () => {
  test('3. Get all products', async ({ request }) => {
    const response = await request.get(Routes.GET_ALL_PRODUCTS);
    await expectStatus(response, 200);
    const products = await response.json();
    expect(Array.isArray(products), 'body should be an array').toBe(true);
    expect(products.length, 'should have products').toBeGreaterThan(0);
    for (const p of products) {
      expect(p).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          price: expect.any(Number),
          category: expect.any(String),
          image: expect.any(String),
        })
      );
    }
  });

  test('4. Get product by ID', async ({ request }) => {
    const id = 1;
    const response = await request.get(buildRoute(Routes.GET_PRODUCT_BY_ID, { id }));
    await expectStatus(response, 200);
    const product = await response.json();
    expect(product.id, 'product id should match requested id').toBe(id);
    expect(product.title).toEqual(expect.any(String));
    expect(product.price).toEqual(expect.any(Number));
    expect(product.category).toEqual(expect.any(String));
    expect(product.image).toEqual(expect.any(String));
  });

  test('5. Get products with limit', async ({ request }) => {
    const limit = 5;
    const response = await request.get(buildRoute(Routes.GET_PRODUCTS_WITH_LIMIT, { limit }));
    await expectStatus(response, 200);
    const products = await response.json();
    expect(Array.isArray(products)).toBe(true);
    expect(products, `should return ${limit} products`).toHaveLength(limit);
  });

  test('6. Sort products ascending', async ({ request }) => {
    const response = await request.get(buildRoute(Routes.GET_PRODUCTS_SORTED, { order: 'asc' }));
    await expectStatus(response, 200);
    const products = await response.json();
    expectAscending(products.map((p: { id: number }) => p.id));
  });

  test('7. Sort products descending', async ({ request }) => {
    const response = await request.get(buildRoute(Routes.GET_PRODUCTS_SORTED, { order: 'desc' }));
    await expectStatus(response, 200);
    const products = await response.json();
    expectDescending(products.map((p: { id: number }) => p.id));
  });

  test('8. Get all categories', async ({ request }) => {
    const response = await request.get(Routes.GET_ALL_CATEGORIES);
    await expectStatus(response, 200);
    const categories = await response.json();
    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length, 'categories should not be empty').toBeGreaterThan(0);
  });

  test('9. Get products by category', async ({ request }) => {
    const category = 'electronics';
    const response = await request.get(buildRoute(Routes.GET_PRODUCTS_BY_CATEGORY, { category }));
    await expectStatus(response, 200);
    const products = await response.json();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
    for (const p of products) {
      expect(p.category, `product ${p.id} category`).toBe(category);
    }
  });

  test('10. Create product', async ({ request }) => {
    const response = await request.post(Routes.CREATE_PRODUCT, { data: newProduct });
    await expectStatus(response, 201);
    const body = await response.json();
    expect(body.id, 'created product should have an id').toEqual(expect.any(Number));
    expect(body).toEqual(expect.objectContaining(newProduct));
  });

  test('11. Update product', async ({ request }) => {
    const id = 7;
    const updated = { ...newProduct, title: 'Updated Backpack', price: 59.99 };
    const response = await request.put(buildRoute(Routes.UPDATE_PRODUCT, { id }), { data: updated });
    await expectStatus(response, 200);
    const body = await response.json();
    expect(String(body.id), 'id should match requested id').toBe(String(id));
    expect(body.title).toBe(updated.title);
    expect(body.price).toBe(updated.price);
  });

  test('12. Delete product', async ({ request }) => {
    const id = 6;
    const response = await request.delete(buildRoute(Routes.DELETE_PRODUCT, { id }));
    await expectStatus(response, 200);
    const body = await response.json();
    expect(body.id, 'deleted product id').toBe(id);
  });
});

test.describe('Users API', () => {
  test('13. Get all users', async ({ request }) => {
    const response = await request.get(Routes.GET_ALL_USERS);
    await expectStatus(response, 200);
    const users = await response.json();
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
  });

  test('14. Get user by ID', async ({ request }) => {
    const id = 1;
    const response = await request.get(buildRoute(Routes.GET_USER_BY_ID, { id }));
    await expectStatus(response, 200);
    const user = await response.json();
    expect(user.id).toBe(id);
  });

  test('15. Get users with limit', async ({ request }) => {
    const limit = 3;
    const response = await request.get(buildRoute(Routes.GET_USERS_WITH_LIMIT, { limit }));
    await expectStatus(response, 200);
    const users = await response.json();
    expect(Array.isArray(users)).toBe(true);
    expect(users).toHaveLength(limit);
  });

  for (const order of ['asc', 'desc']) {
    test(`16. Sort users ${order}`, async ({ request }) => {
      const response = await request.get(buildRoute(Routes.GET_USERS_SORTED, { order }));
      await expectStatus(response, 200);
      const users = await response.json();
      const ids = users.map((u: { id: number }) => u.id);
      order === 'asc' ? expectAscending(ids) : expectDescending(ids);
    });
  }

  test('17. Create user', async ({ request }) => {
    const response = await request.post(Routes.CREATE_USER, { data: newUser });
    await expectStatus(response, 201);
    const body = await response.json();
    expect(body.id, 'created user should have an id').toEqual(expect.any(Number));
    expect(body).toEqual(expect.objectContaining(newUser));
  });

  test('18. Update user', async ({ request }) => {
    const id = 2;
    const updated = { ...newUser, username: 'updatedjohn', phone: '1-111-222-3333' };
    const response = await request.put(buildRoute(Routes.UPDATE_USER, { id }), { data: updated });
    await expectStatus(response, 200);
    const body = await response.json();
    expect(body.username).toBe(updated.username);
    expect(body.phone).toBe(updated.phone);
  });

  test('19. Delete user', async ({ request }) => {
    const id = 3;
    const response = await request.delete(buildRoute(Routes.DELETE_USER, { id }));
    await expectStatus(response, 200);
    const body = await response.json();
    expect(body.id, 'deleted user id').toBe(id);
  });
});

test.describe('Carts API', () => {
  test('20. Get all carts', async ({ request }) => {
    const response = await request.get(Routes.GET_ALL_CARTS);
    await expectStatus(response, 200);
    const carts = await response.json();
    expect(Array.isArray(carts)).toBe(true);
    expect(carts.length).toBeGreaterThan(0);
  });

  test('21. Get cart by ID', async ({ request }) => {
    const id = 1;
    const response = await request.get(buildRoute(Routes.GET_CART_BY_ID, { id }));
    await expectStatus(response, 200);
    const cart = await response.json();
    expect(cart.id).toBe(id);
  });

  test('22. Get carts by date range', async ({ request }) => {
    const startdate = '2019-12-10';
    const enddate = '2020-10-10';
    const response = await request.get(
      buildRoute(Routes.GET_CARTS_BY_DATE_RANGE, { startdate, enddate })
    );
    await expectStatus(response, 200);
    const carts = await response.json();
    expect(Array.isArray(carts)).toBe(true);
    expect(carts.length, 'should return carts in range').toBeGreaterThan(0);
    const start = new Date(startdate).getTime();
    const end = new Date(enddate).getTime() + 24 * 60 * 60 * 1000;
    for (const cart of carts) {
      const time = new Date(cart.date).getTime();
      expect(time, `cart ${cart.id} date ${cart.date} within range`).toBeGreaterThanOrEqual(start);
      expect(time, `cart ${cart.id} date ${cart.date} within range`).toBeLessThanOrEqual(end);
    }
  });

  test('23. Get user cart', async ({ request }) => {
    const userId = 1;
    const response = await request.get(buildRoute(Routes.GET_USER_CART, { userId }));
    await expectStatus(response, 200);
    const carts = await response.json();
    expect(Array.isArray(carts)).toBe(true);
    expect(carts.length).toBeGreaterThan(0);
    for (const cart of carts) {
      expect(cart.userId, `cart ${cart.id} owner`).toBe(userId);
    }
  });

  test('24. Get carts with limit', async ({ request }) => {
    const limit = 3;
    const response = await request.get(buildRoute(Routes.GET_CARTS_WITH_LIMIT, { limit }));
    await expectStatus(response, 200);
    const carts = await response.json();
    expect(Array.isArray(carts)).toBe(true);
    expect(carts).toHaveLength(limit);
  });

  for (const order of ['asc', 'desc']) {
    test(`25. Sort carts ${order}`, async ({ request }) => {
      const response = await request.get(buildRoute(Routes.GET_CARTS_SORTED, { order }));
      await expectStatus(response, 200);
      const carts = await response.json();
      const ids = carts.map((c: { id: number }) => c.id);
      order === 'asc' ? expectAscending(ids) : expectDescending(ids);
    });
  }

  test('26. Create cart', async ({ request }) => {
    const response = await request.post(Routes.CREATE_CART, { data: newCart });
    await expectStatus(response, 201);
    const body = await response.json();
    expect(body.id, 'created cart should have an id').toEqual(expect.any(Number));
    expect(body.userId).toBe(newCart.userId);
    expect(body.products).toEqual(newCart.products);
  });

  test('27. Update cart', async ({ request }) => {
    const id = 1;
    const updated = {
      ...newCart,
      products: [{ productId: 1, quantity: 5 }],
    };
    const response = await request.put(buildRoute(Routes.UPDATE_CART, { id }), { data: updated });
    await expectStatus(response, 200);
    const body = await response.json();
    expect(body.products[0].quantity, 'quantity should be updated').toBe(5);
  });

  test('28. Delete cart', async ({ request }) => {
    const id = 2;
    const response = await request.delete(buildRoute(Routes.DELETE_CART, { id }));
    await expectStatus(response, 200);
    const body = await response.json();
    expect(body.id, 'deleted cart id').toBe(id);
  });
});

test.describe('JSON Schema Validation', () => {
  test('29. Product response schema', async ({ request }) => {
    const response = await request.get(buildRoute(Routes.GET_PRODUCT_BY_ID, { id: 1 }));
    await expectStatus(response, 200);
    validateSchema(loadSchema('product_api_schema.json'), await response.json());
  });

  test('30. User response schema', async ({ request }) => {
    const response = await request.get(buildRoute(Routes.GET_USER_BY_ID, { id: 1 }));
    await expectStatus(response, 200);
    validateSchema(loadSchema('user_api_schema.json'), await response.json());
  });

  test('31. Cart response schema', async ({ request }) => {
    const response = await request.get(buildRoute(Routes.GET_CART_BY_ID, { id: 1 }));
    await expectStatus(response, 200);
    validateSchema(loadSchema('cart_api_schema.json'), await response.json());
  });
});

test.describe('End-to-End API Workflows', () => {
  test('32. Product CRUD workflow', async ({ request }) => {
    const create = await request.post(Routes.CREATE_PRODUCT, { data: newProduct });
    await expectStatus(create, 201);
    const id = (await create.json()).id;
    expect(id).toEqual(expect.any(Number));

    // FakeStore does not persist data, so update/delete use an existing-range ID with the created ID's flow
    const updated = { ...newProduct, title: 'Workflow Updated', price: 10.5 };
    const update = await request.put(buildRoute(Routes.UPDATE_PRODUCT, { id }), { data: updated });
    await expectStatus(update, 200);
    const updatedBody = await update.json();
    expect(updatedBody.title).toBe(updated.title);
    expect(updatedBody.price).toBe(updated.price);

    const del = await request.delete(buildRoute(Routes.DELETE_PRODUCT, { id }));
    await expectStatus(del, 200);
  });

  test('33. User CRUD workflow', async ({ request }) => {
    const create = await request.post(Routes.CREATE_USER, { data: newUser });
    await expectStatus(create, 201);
    const id = (await create.json()).id;
    expect(id).toEqual(expect.any(Number));

    const updated = { ...newUser, username: 'workflowuser' };
    const update = await request.put(buildRoute(Routes.UPDATE_USER, { id }), { data: updated });
    await expectStatus(update, 200);
    expect((await update.json()).username).toBe(updated.username);

    const del = await request.delete(buildRoute(Routes.DELETE_USER, { id }));
    await expectStatus(del, 200);
  });

  test('34. Cart CRUD workflow', async ({ request }) => {
    const create = await request.post(Routes.CREATE_CART, { data: newCart });
    await expectStatus(create, 201);
    const created = await create.json();
    const id = created.id;
    expect(id).toEqual(expect.any(Number));
    expect(created.userId).toBe(newCart.userId);
    expect(created.products).toEqual(newCart.products);

    const updated = { ...newCart, products: [{ productId: 1, quantity: 9 }] };
    const update = await request.put(buildRoute(Routes.UPDATE_CART, { id }), { data: updated });
    await expectStatus(update, 200);
    expect((await update.json()).products[0].quantity).toBe(9);

    const del = await request.delete(buildRoute(Routes.DELETE_CART, { id }));
    await expectStatus(del, 200);
  });
});
