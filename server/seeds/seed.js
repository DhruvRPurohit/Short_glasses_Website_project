require("dotenv").config();
const mongoose = require("mongoose");
const consoleMessage = require("../utils/console.util");

// 👉 Import seed functions
const seedUsers = require("./users.seed");
const seedBrands = require("./brands.seed");
const seedCategories = require("./categories.seed");
const seedStores = require("./stores.seed");
const seedProducts = require("./products.seed");
const seedCarts = require("./carts.seed");
const seedFavorites = require("./favorites.seed");
const seedPurchases = require("./purchases.seed");
const seedReviews = require("./reviews.seed");

// 🧠 DB Connect
const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  consoleMessage.successMessage("✅ Connected to MongoDB");
};

// 🌱 Run All Seeders
const runAllSeeders = async () => {
  try {
    await connectDB();

    // 1️⃣ Seed Users
    const users = await seedUsers();
    const userIds = users.map((u) => u._id);

    // 2️⃣ Seed Brands
    const brands = await seedBrands([], userIds);
    const brandIds = brands.map((b) => b._id);

    // 3️⃣ Seed Categories
    const categories = await seedCategories([], userIds);
    const categoryIds = categories.map((c) => c._id);

    // 4️⃣ Seed Stores
    const stores = await seedStores([], userIds);
    const storeIds = stores.map((s) => s._id);

    // 5️⃣ Seed Products
    const products = await seedProducts(categoryIds, brandIds, storeIds, userIds);
    const productIds = products.map((p) => p._id);

    // 6️⃣ Seed Carts
    await seedCarts(productIds, userIds);

    // 7️⃣ Seed Favorites
    await seedFavorites(userIds, productIds);

    // 8️⃣ Seed Purchases
    await seedPurchases(userIds, productIds);

    // 9️⃣ Seed Reviews
    await seedReviews(userIds, productIds);

    consoleMessage.successMessage("🎉 All seeding completed successfully!");
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    consoleMessage.errorMessage("❌ Seeding error: " + err.message);
    process.exit(1);
  }
};

runAllSeeders();
