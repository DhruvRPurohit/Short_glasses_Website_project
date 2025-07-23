/**
 * Title: Seed Product Data Script
 * Author: Your Name
 */

const mongoose = require("mongoose");
const faker = require("@faker-js/faker").faker;
const Product = require("./models/product.model");
const Brand = require("./models/brand.model");
const Category = require("./models/category.model");
const Store = require("./models/store.model");

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/canim-template")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Seed function
const seedProducts = async () => {
  try {
    // Clear existing products
    await Product.deleteMany();
    console.log("🧹 Cleared existing products");

    // Fetch references
    const brand = await Brand.findOne();
    const category = await Category.findOne();
    const store = await Store.findOne();

    if (!brand || !category || !store) {
      throw new Error("❌ Please seed brand, category, and store first.");
    }

    // Create dummy products
    const products = Array.from({ length: 10 }).map(() => ({
      title: faker.commerce.productName() + " " + faker.string.alphanumeric(4),
      summary: faker.commerce.productDescription(),
      thumbnail: {
        url: faker.image.urlPlaceholder({ width: 296, height: 200 }),
        public_id: "dummy",
      },
      gallery: Array.from({ length: 3 }).map(() => ({
        url: faker.image.urlPlaceholder({ width: 296, height: 200 }),
        public_id: "gallery_" + faker.string.uuid(),
      })),
      features: [
        {
          title: "Material",
          content: ["Cotton", "Polyester"],
        },
        {
          title: "Care Instructions",
          content: ["Machine wash", "Do not bleach"],
        },
      ],
      variations: {
        colors: ["Red", "Blue", "Green"],
        sizes: ["S", "M", "L"],
      },
      campaign: {
        title: "Summer Sale",
        state: faker.helpers.arrayElement([
          "new-arrival",
          "discount",
          "sold-out",
          "on-sale",
        ]),
      },
      price: parseFloat(faker.commerce.price({ min: 10, max: 500 })),
      brand: brand._id,
      category: category._id,
      store: store._id,
    }));

    await Product.insertMany(products);
    console.log(`✅ Inserted ${products.length} products`);
  } catch (err) {
    console.error("❌ Seeding error:", err.message);
  } finally {
    mongoose.disconnect();
  }
};

seedProducts();
