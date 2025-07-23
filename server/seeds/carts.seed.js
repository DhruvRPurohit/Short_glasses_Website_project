// seed/carts.seed.js

const { faker } = require("@faker-js/faker");
const Cart = require("../models/cart.model");

// Generate a single fake cart item
const generateFakeCart = (productIds, userIds) => ({
  product: faker.helpers.arrayElement(productIds),
  user: faker.helpers.arrayElement(userIds),
  quantity: faker.number.int({ min: 1, max: 5 }),
});

// Seeder function
const seedCarts = async (productIds = [], userIds = []) => {
  try {
    console.log("🧹 Clearing existing carts...");
    await Cart.deleteMany();

    const carts = Array.from({ length: 10 }, () =>
      generateFakeCart(productIds, userIds)
    );

    const inserted = await Cart.insertMany(carts);
    console.log(`🛒 Seeded ${inserted.length} carts`);
    return inserted;
  } catch (error) {
    console.error("❌ Cart Seeding Error:", error.message);
    throw error;
  }
};

module.exports = seedCarts;
