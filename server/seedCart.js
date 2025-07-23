// seedCart.js

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { faker } = require("@faker-js/faker");


dotenv.config();

const Cart = require("./models/cart.model");
const User = require("./models/user.model");
const Product = require("./models/product.model");

// MongoDB URI with database name included
const uri = process.env.MONGO_URI;

async function seedCarts() {
  try {
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB");

    // Get existing products and users
    const users = await User.find();
    const products = await Product.find();

    if (!users.length || !products.length) {
      console.error("❌ Need to seed users and products first.");
      return;
    }

    // Clear existing cart data
    await Cart.deleteMany();
    console.log("🧹 Cleared existing cart data");

    // Create 10 cart items
    const cartItems = [];

    for (let i = 0; i < 10; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      const randomQty = Math.floor(Math.random() * 5) + 1; // 1-5

      cartItems.push({
        user: randomUser._id,
        product: randomProduct._id,
        quantity: randomQty,
      });
    }

    await Cart.insertMany(cartItems);
    console.log("🛒 Seeded cart data successfully");
  } catch (err) {
    console.error("❌ Seeding cart error:", err);
  } finally {
    mongoose.disconnect();
  }
}

seedCarts();
