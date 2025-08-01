const { faker } = require("@faker-js/faker");
const User = require("../models/user.model");

// 📞 Generate valid Bangladeshi phone number
const generatePhoneNumber = () => {
  const validCodes = ["3", "4", "5", "6", "7", "8", "9"];
  const middleDigit = validCodes[Math.floor(Math.random() * validCodes.length)];
  const rest = faker.string.numeric(8); // must be 8 digits
  return `+8801${middleDigit}${rest}`;
};

// 🔐 Generate a strong password
const generatePassword = () => {
  const upper = faker.string.alphanumeric(1).toUpperCase();
  const lower = faker.string.alpha(1).toLowerCase();
  const number = faker.string.numeric(1);
  const symbol = faker.helpers.arrayElement(["@", "#", "$", "!", "%", "&"]);
  const rest = faker.string.alphanumeric(6);
  const password = upper + lower + number + symbol + rest;
  return faker.helpers.shuffle(password.split("")).join("");
};

// 🌱 Seed Users
const seedUsers = async () => {
  try {
    await User.deleteMany({});
    console.log("🧹 Cleared existing users");

    const users = [];

    for (let i = 0; i < 10; i++) {
      const password = generatePassword();
      users.push({
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        password,
        phone: generatePhoneNumber(),
        avatar: {
          url: faker.image.avatar(),
          public_id: "N/A",
        },
        address: faker.location.streetAddress(),
        role: "buyer",
      });
    }

    const insertedUsers = await User.insertMany(users);
    console.log(`🌱 Seeded ${insertedUsers.length} users successfully`);

    return insertedUsers;
  } catch (err) {
    console.error("❌ Seeding error:", err.message);
    throw err;
  }
};

// ✅ Export the function to use in main seeder
module.exports = seedUsers;
