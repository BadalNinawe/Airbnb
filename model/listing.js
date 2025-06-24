const mongoose = require("mongoose");
const Review = require("./reviews.js");
// const reviews = require("./reviews");
const Schema = mongoose.Schema;

// const listingSchema = new Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: String,
//   image: {
//     filename: String,
//     url: {
//       type: String,
//       default:
//         "https://wallup.net/wp-content/uploads/2019/09/977995-mansion-house-architecture-luxury-building-design.jpg",
//       set: (v) =>
//         v === ""
//           ? "https://wallup.net/wp-content/uploads/2019/09/977995-mansion-house-architecture-luxury-building-design.jpg"
//           : v,
//     },
//   },
//   price: Number,
//   location: String,
//   country: String,
//   reviews: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "Review",
//     },
//   ],
// });

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  // category: {
  //   type: String,
  //   enum: ["mountains", "arctic", "farms", "deserts"],
  // },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
