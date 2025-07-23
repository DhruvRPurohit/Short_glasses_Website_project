/**
 * Title: Seed Category Data Script
 * Author: Your Name
 */

const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const Category = require("./models/category.model");
const User = require("./models/user.model"); // For creator

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/canim-template")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Seed function
const seedCategories = async () => {
  try {
    // Clear existing categories
    await Category.deleteMany();
    console.log("🧹 Cleared existing categories");

    // Fetch any user to set as creator
    const creator = await User.findOne();
    if (!creator) throw new Error("❌ Please seed users before seeding categories.");

    const categories = Array.from({ length: 8 }).map(() => ({
      title: faker.commerce.department(),
      description: faker.lorem.sentences(2),
      thumbnail: {
        url: faker.image.urlPlaceholder({ width: 296, height: 200 }),
        public_id: "cat_" + faker.string.uuid(),
      },
      keynotes: faker.helpers.uniqueArray(() => faker.commerce.productAdjective(), 3),
      tags: faker.helpers.uniqueArray(() => faker.commerce.productMaterial(), 3),
      creator: creator._id,
    }));

    await Category.insertMany(categories);
    console.log(`✅ Inserted ${categories.length} categories`);
  } catch (err) {
    console.error("❌ Seeding error:", err.message);
  } finally {
    mongoose.disconnect();
  }
};

seedCategories();
