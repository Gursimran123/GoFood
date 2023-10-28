const mongoose = require("mongoose");
const mongoURI = "mongodb://127.0.0.1:27017/Mernproject";

const mongoConnect = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
    console.log("Connected to the database!");

    const fetch_data = mongoose.connection.db.collection("users");
    const userData = await fetch_data.find({}).toArray();

    const foodCategory = mongoose.connection.db.collection("category");
    const catData = await foodCategory.find({}).toArray();

    global.fooditems = userData;
    global.foodCategory = catData;

    // console.log(
    //   "Data fetched successfully:",
    //   global.fooditems,
    //   global.foodCategory
    // );
  } catch (error) {
    console.error("Connection or Fetching error:", error);
  }
};

module.exports = mongoConnect;
