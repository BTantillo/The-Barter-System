const seeds = require("./seeds");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("--------------");
  await seeds();
  console.log("--------------");
  // await seedPosts(); DUPLICATE this line for each seed file needed
  console.log("--------------");

  process.exit(0);
};

seedAll();
