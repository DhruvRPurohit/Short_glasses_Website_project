const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const Review = require("../models/review.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");

const seedReviews = async () => {
  try {
    console.log("🧹 Clearing existing reviews...");
    await Review.deleteMany({});

    const users = await User.find({}, "_id");
    const products = await Product.find({}, "_id");

    if (users.length === 0 || products.length === 0) {
      console.warn("⚠️ Cannot seed reviews: No users or products found.");
      return;
    }

    const reviews = [];

    for (let i = 0; i < 10; i++) {
      reviews.push({
        rating: faker.number.int({ min: 1, max: 5 }),
        comment: faker.lorem.text().slice(0, 200), // Ensure comment is within limit
        createdBy: faker.helpers.arrayElement(users)._id,
        product: faker.helpers.arrayElement(products)._id,
      });
    }

    await Review.insertMany(reviews);
    console.log("✅ Seeded 10 reviews successfully");
  } catch (err) {
    console.error("❌ Review seeding error:", err);
    throw err;
  }
};

module.exports = seedReviews;
