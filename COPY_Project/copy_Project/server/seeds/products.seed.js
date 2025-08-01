const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { faker } = require("@faker-js/faker");
const Product = require("../models/product.model");

dotenv.config();

const generateFakeProduct = (categoryIds, brandIds, storeIds, userIds) => {
  const gallery = Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(() => ({
    url: faker.image.url(),
    public_id: faker.string.uuid(),
  }));

  const features = Array.from({ length: 3 }).map(() => ({
    title: faker.commerce.productAdjective(),
    content: [faker.commerce.productDescription(), faker.commerce.productDescription()],
  }));

  const campaignStates = ["new-arrival", "discount", "sold-out", "on-sale"];

  return {
    title: faker.commerce.productName(),
    summary: faker.commerce.productDescription(),
    thumbnail: {
      url: faker.image.url(),
      public_id: faker.string.uuid(),
    },
    gallery,
    features,
    variations: {
      colors: faker.helpers.arrayElements(["red", "blue", "green", "black", "white"], 3),
      sizes: faker.helpers.arrayElements(["S", "M", "L", "XL", "XXL"], 2),
    },
    campaign: {
      title: faker.company.buzzPhrase(),
      state: faker.helpers.arrayElement(campaignStates),
    },
    price: faker.number.float({ min: 10, max: 1000, precision: 0.01 }),
    category: faker.helpers.arrayElement(categoryIds),
    brand: faker.helpers.arrayElement(brandIds),
    store: faker.helpers.arrayElement(storeIds),
    buyers: faker.helpers.arrayElements(userIds, { min: 1, max: 3 }),
    reviews: [], // Will be filled later
  };
};

const seedProducts = async (categoryIds, brandIds, storeIds, userIds) => {
  try {
    await Product.deleteMany();
    console.log("🧹 Cleared existing products");

    const products = Array.from({ length: 20 }).map(() =>
      generateFakeProduct(categoryIds, brandIds, storeIds, userIds)
    );

    const inserted = await Product.insertMany(products);
    console.log("🌱 Seeded products successfully");

    return inserted;
  } catch (error) {
    console.error("❌ Product seeding error:", error);
  }
};

module.exports = seedProducts;
