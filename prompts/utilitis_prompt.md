
Create Utility Files

Create these four TypeScript files in the existing utils/ folder:
- helper.ts
- dataGenerator.ts
- dbClient.ts
- DataReader.ts

Rules for all files

- Use only dependencies already listed in package.json: @faker-js/faker, mysql2, dotenv, csv-parse, and xlsx.
- Match the requested names, method signatures, return values, and behavior exactly.
- Keep the code simple and beginner-friendly for a Playwright framework.
- Don’t add extra files, dependencies, methods, types, validation, logging, error handling, or features.
- Return only the complete code for the requested file.

1. utils/helper.ts

Export a class named Helper with exactly these static methods:
- convertPriceToNumber(price: string): number
  Remove everything except digits and decimal points, convert the result to a number, and return it.
- getProductDetails()

  Return exactly:{
    productName: "MacBook",
    productQuantity: "1",
    totalPrice: "$602.00"
  }
- getLoginDetails()
  Return exactly:{
    email: "pavanol@xyz.com",
    password: "test@123"
  }
2. utils/dataGenerator.ts
Import Faker from @faker-js/faker. Export a class named RandomDataUtil.

Implement exactly these static methods, using the corresponding Faker person, internet, location, date, and commerce APIs:

Person

getFirstName(): string
getLastName(): string
getFullName(): string
getEmail(): string
getPhoneNumber(): string
getUsername(): string
getPassword(length: number = 10): string
getCountry(): string
getState(): string
getCity(): string
getStreet(): string
getStreetAddress(): string
getZipCode(): string
getLatitude(): string
getLongitude(): string

Date and time

getCurrentDate(): string
getRecentDate(days: number = 10): string
getFutureDate(years: number = 1): string
getPastDate(years: number = 1): string

Return dates in YYYY-MM-DD format.

Commerce

getProductName(): string
getProductDescription(): string
getProductPrice(): string
getDepartment(): string
getImageUrl(): string
getNumber(): number

Generate product prices from 1 to 500 with two decimal places. Generate getNumber() as an integer from 1 to 999.

API payloads

Implement exactly these methods:

generateInvalidLoginPayload()
generateProductPayload()
generateUpdatedProductPayload()
generateUserPayload()
generateUserUpdatePayload()
generateCartPayload(userId: number)
generateUpdatedCartPayload(userId: number)

Use this reference for the expected API payload formats: Postman reference.

Return these structures:
- generateInvalidLoginPayload(): username from getUsername() and password from getPassword().
- generateProductPayload(): title, numeric price, description, image, and lowercase category.
- generateUpdatedProductPayload(): same fields as the product payload, with the title starting with Updated .
- generateUserPayload(): email, username, password, name, firstname, lastname, address, city, street, number, zipcode, geolocation, lat, long, and phone.
- generateUserUpdatePayload(): same structure as the user payload, with the username starting with updated-.
- generateCartPayload(userId) and generateUpdatedCartPayload(userId): userId, a date in YYYY-MM-DD format, and products containing productId and quantity.
Reuse RandomDataUtil methods where they apply instead of duplicating Faker logic.


3. utils/dbClient.ts

Import mysql from mysql2/promise and dotenv from dotenv, then call dotenv.config().


Export exactly one async function:
executeQuery(sql: string, params?: any[])
For each call, this function must:
1. Create one connection using mysql.createConnection().
2. Read DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, and DB_NAME from environment variables.
3. Convert DB_PORT to a number when present; use undefined when it’s absent.
4. Run connection.execute(sql, params), store the result, close the connection with await connection.end(), and return the result.
Do not use connection pooling or add transactions, retries, logging, custom error handling, validation, or other database features.


4. utils/DataReader.ts

Use fs, csv-parse, and xlsx. Export a class named DataProvider with exactly these static methods:
- readJson(filePath: string)
  Read with fs.readFileSync(filePath, 'utf8'), parse with JSON.parse(), and return the data.
- readCsv(filePath: string)
  Read with fs.readFileSync(filePath). Parse using parse() from csv-parse/sync with { columns: true, skip_empty_lines: true }, then return the data.
- readExcel(filePath: string)
  Read with XLSX.readFile(filePath), select the first worksheet, convert it with XLSX.utils.sheet_to_json(worksheet, { header: 1 }), and return the data.
Don’t add other file formats, sheet-name parameters, or extra functionality.

   
