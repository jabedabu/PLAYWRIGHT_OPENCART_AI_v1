

import { faker as Faker } from "@faker-js/faker";

export class RandomDataUtil {
  static getFirstName(): string {
    return Faker.person.firstName();
  }

  static getLastName(): string {
    return Faker.person.lastName();
  }

  static getFullName(): string {
    return Faker.person.fullName();
  }

  static getEmail(): string {
    return Faker.internet.email();
  }

  static getPhoneNumber(): string {
    return Faker.phone.number();
  }

  static getUsername(): string {
    return Faker.internet.username();
  }

  static getPassword(length: number = 10): string {
    return Faker.internet.password({ length });
  }

  static getCountry(): string {
    return Faker.location.country();
  }

  static getState(): string {
    return Faker.location.state();
  }

  static getCity(): string {
    return Faker.location.city();
  }

  static getStreet(): string {
    return Faker.location.street();
  }

  static getStreetAddress(): string {
    return Faker.location.streetAddress();
  }

  static getZipCode(): string {
    return Faker.location.zipCode();
  }

  static getLatitude(): string {
    return Faker.location.latitude().toString();
  }

  static getLongitude(): string {
    return Faker.location.longitude().toString();
  }

  static getCurrentDate(): string {
    return new Date().toISOString().split("T")[0];
  }

  static getRecentDate(days: number = 10): string {
    return Faker.date.recent({ days }).toISOString().split("T")[0];
  }

  static getFutureDate(years: number = 1): string {
    return Faker.date.future({ years }).toISOString().split("T")[0];
  }

  static getPastDate(years: number = 1): string {
    return Faker.date.past({ years }).toISOString().split("T")[0];
  }

  static getProductName(): string {
    return Faker.commerce.productName();
  }

  static getProductDescription(): string {
    return Faker.commerce.productDescription();
  }

  static getProductPrice(): string {
    return Faker.commerce.price({ min: 1, max: 500, dec: 2 });
  }

  static getDepartment(): string {
    return Faker.commerce.department();
  }

  static getImageUrl(): string {
    return Faker.image.url();
  }

  static getNumber(): number {
    return Faker.number.int({ min: 1, max: 999 });
  }

  static generateInvalidLoginPayload() {
    return {
      username: this.getUsername(),
      password: this.getPassword(),
    };
  }

  static generateProductPayload() {
    return {
      title: this.getProductName(),
      price: Number(this.getProductPrice()),
      description: this.getProductDescription(),
      image: this.getImageUrl(),
      category: this.getDepartment().toLowerCase(),
    };
  }

  static generateUpdatedProductPayload() {
    const product = this.generateProductPayload();
    return {
      ...product,
      title: `Updated ${product.title}`,
    };
  }

  static generateUserPayload() {
    return {
      email: this.getEmail(),
      username: this.getUsername(),
      password: this.getPassword(),
      name: {
        firstname: this.getFirstName(),
        lastname: this.getLastName(),
      },
      address: {
        city: this.getCity(),
        street: this.getStreet(),
        number: this.getNumber(),
        zipcode: this.getZipCode(),
        geolocation: {
          lat: this.getLatitude(),
          long: this.getLongitude(),
        },
      },
      phone: this.getPhoneNumber(),
    };
  }

  static generateUserUpdatePayload() {
    const user = this.generateUserPayload();
    return {
      ...user,
      username: `updated-${user.username}`,
    };
  }

  static generateCartPayload(userId: number) {
    return {
      userId,
      date: this.getCurrentDate(),
      products: [
        {
          productId: this.getNumber(),
          quantity: this.getNumber(),
        },
      ],
    };
  }

  static generateUpdatedCartPayload(userId: number) {
    return this.generateCartPayload(userId);
  }
}
