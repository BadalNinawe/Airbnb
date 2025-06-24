const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../model/listing");
const MONGO_URL = "mongodb://localhost:27017/airbnb";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}
const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "6854d94094eee93cc53bc6c6",
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
