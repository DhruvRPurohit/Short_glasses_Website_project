const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { faker } = require("@faker-js/faker");
const Purchase = require("../models/purchase.model");

dotenv.config();

const generateFakePurchase = (userIds, productIds) => {
  const numberOfItems = faker.number.int({ min: 1, max: 5 });

  const selectedProducts = faker.helpers.arrayElements(productIds, numberOfItems);
  const products = selectedProducts.map((id) => ({
    product: id,
    quantity: faker.number.int({ min: 1, max: 3 }),
  }));

  const totalAmount = products.reduce((total) => {
    // NOTE: You may want to fetch actual product prices
    return total + faker.number.float({ min: 20, max: 200 });
  }, 0);

  const customer = faker.helpers.arrayElement(userIds);

  return {
    customer,
    products,
    customerId: faker.string.uuid(),
    orderId: faker.string.uuid(),
    totalAmount: +totalAmount.toFixed(2),
    status: faker.helpers.arrayElement(["pending", "delivered"]),
  };
};

const seedPurchases = async (userIds, productIds) => {
  try {
    await Purchase.deleteMany();
    console.log("🧹 Cleared existing purchases");

    const purchases = Array.from({ length: 15 }).map(() =>
      generateFakePurchase(userIds, productIds)
    );

    const inserted = await Purchase.insertMany(purchases);
    console.log("🛒 Seeded purchases successfully");

    return inserted;
  } catch (error) {
    console.error("❌ Purchase seeding error:", error);
  }
};

module.exports = seedPurchases;
