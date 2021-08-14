// Logic to create seed and assign random tools and neighborhoods to user

// BRING IN SEQUELIZE CONNECTION AND MODELS
const sequelize = require('../config/connection');
const { User, Tool, Category, Neighborhood } = require('../models');

// BRING IN SEED DATA FOR USER, TOOL, CATEGORY AND NEIGHBORHOOD
const userData = require('./userData.json');
const toolData = require('./toolData.json');
const categoryData = require('./categoryData.json');
const neighborhoodData = require('./neighborhoodData.json')

// FUNCTION TO SEED DATABASE
const seedDatabase = async () => {
  // SYNC THE DATABASE
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  // CREATE NEIGHBORHOODS WITH NEIGHBORHOOD SEED DATA
  const neighborhoods = await Neighborhood.bulkCreate(neighborhoodData);
  console.log('\n----- NEIGHBORHOODS SEEDED -----\n');

  // CREATE CATEGORIES WITH CATEGORY SEED DATA
  await Category.bulkCreate(categoryData);
  console.log('\n----- CATEGORIES SEEDED -----\n');

  // CREATE NEW USER FOR EACH USER IN USER SEED DATA, RANDOMLY ASSIGNING A NEIGHBORHOOD ID
  // PASS THROUGH HOOKS FOR PASSWORD HASHING
  for (const user of userData) {
    await User.create({
      ...user,
      neighborhood_id: neighborhoods[Math.floor(Math.random() * neighborhoods.length)].id,
    }, {
      individualHooks: true,
      returning: true,
    });
  }
  console.log('\n----- USERS SEEDED -----\n');

  // GET ALL USERS JUST CREATED IN DATABASE
  const users = await User.findAll();

  // CREATE NEW TOOL FOR EACH TOOL IN TOOL SEED DATA, RANDOMLY ASSIGNING A USER ID
  for (const tool of toolData) {
    await Tool.create({
      ...tool,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  console.log('\n----- TOOLS SEEDED -----\n');

  process.exit(0);
};

// RUN THE SEED DATABASE FUNCTION
seedDatabase();