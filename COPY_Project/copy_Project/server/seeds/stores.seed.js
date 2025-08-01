// seed/stores.seed.js

const { faker } = require("@faker-js/faker");
const Store = require("../models/store.model");

// Generate a single fake store
const generateFakeStore = (productIds, userIds) => ({
  title: faker.company.name(),
  description: faker.company.catchPhrase(),
  thumbnail: {
    url: faker.image.urlLoremFlickr({ category: "shop", width: 296, height: 200 }),
    public_id: faker.string.uuid(),
  },
  owner: faker.helpers.arrayElement(userIds),
  products: faker.helpers.arrayElements(productIds, { min: 0, max: 4 }),
  status: faker.helpers.arrayElement(["active", "inactive"]),
  keynotes: faker.helpers.uniqueArray(faker.company.bsBuzz, 3),
  tags: faker.helpers.uniqueArray(faker.commerce.productAdjective, 4),
});

// Seeder function
const seedStores = async (productIds = [], userIds = []) => {
  try {
    console.log("🧹 Clearing existing stores...");
    await Store.deleteMany();

    const stores = Array.from({ length: 10 }, () =>
      generateFakeStore(productIds, userIds)
    );

    const inserted = await Store.insertMany(stores);
    console.log(`🌱 Seeded ${inserted.length} stores`);
    return inserted;
  } catch (error) {
    console.error("❌ Store Seeding Error:", error.message);
    throw error;
  }
};

module.exports = seedStores;
