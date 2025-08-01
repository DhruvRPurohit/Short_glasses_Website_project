// seed/brands.seed.js

const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const Brand = require("../models/brand.model");

// Reusable brand generator
const generateFakeBrand = (productIds, userIds) => {
  const title = faker.company.name();

  return {
    title,
    description: faker.lorem.sentences(3),
    logo: {
      url: faker.image.urlLoremFlickr({ category: "brand", width: 296, height: 200 }),
      public_id: faker.string.uuid(),
    },
    products: faker.helpers.arrayElements(productIds, { min: 1, max: 3 }),
    keynotes: faker.helpers.uniqueArray(faker.company.catchPhrase, 3),
    tags: faker.helpers.uniqueArray(() => faker.commerce.department(), 4),
    creator: faker.helpers.arrayElement(userIds),
  };
};

// Main seeding function
const seedBrands = async (productIds = [], userIds = []) => {
  try {
    console.log("🧹 Clearing existing brands...");
    await Brand.deleteMany();

    const brands = Array.from({ length: 10 }, () =>
      generateFakeBrand(productIds, userIds)
    );

    const inserted = await Brand.insertMany(brands);
    console.log(`🌱 Seeded ${inserted.length} brands successfully`);

    return inserted; // In case other seeds need them
  } catch (error) {
    console.error("❌ Brand Seeding Error:", error.message);
    throw error;
  }
};

module.exports = seedBrands;
