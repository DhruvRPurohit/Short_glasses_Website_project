// seed/favorites.seed.js

const { faker } = require("@faker-js/faker");
const Favorite = require("../models/favorite.model");

// Generate one favorite (user + product)
const generateFakeFavorite = (userIds, productIds) => ({
  user: faker.helpers.arrayElement(userIds),
  product: faker.helpers.arrayElement(productIds),
});

// Seeder function
const seedFavorites = async (userIds = [], productIds = []) => {
  try {
    console.log("🧹 Clearing existing favorites...");
    await Favorite.deleteMany();

    const favorites = Array.from({ length: 10 }, () =>
      generateFakeFavorite(userIds, productIds)
    );

    const inserted = await Favorite.insertMany(favorites);
    console.log(`❤️ Seeded ${inserted.length} favorites`);
    return inserted;
  } catch (error) {
    console.error("❌ Favorite Seeding Error:", error.message);
    throw error;
  }
};

module.exports = seedFavorites;
