const { faker } = require("@faker-js/faker");
const Category = require("../models/category.model");

// 🌱 Seed Categories
const seedCategories = async (productIds, userIds) => {
  try {
    console.log("🧹 Clearing existing categories...");
    await Category.deleteMany({});

    // Generate 10 unique category titles
    const titles = new Set();
    while (titles.size < 10) {
      titles.add(faker.commerce.department());
    }

    const categories = Array.from(titles).map((title) => ({
      title,
      description: faker.commerce.productDescription(), // ✅ Add required description
      products: faker.helpers.arrayElements(productIds, 3),
      createdBy: faker.helpers.arrayElement(userIds),
    }));

    const inserted = await Category.insertMany(categories);
    console.log(`🎉 Seeded ${inserted.length} categories successfully`);

    return inserted;
  } catch (error) {
    console.error("❌ Category Seeding Error:", error.message);
    throw error;
  }
};

module.exports = seedCategories;
