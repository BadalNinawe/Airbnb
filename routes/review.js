const express = require("express");
const app = express();
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { reviewSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../model/listing.js");
const Review = require("../model/reviews.js");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");
const { createReview, destroyReview } = require("../controllers/reviews.js");

router.post("/", isLoggedIn, validateReview, wrapAsync(createReview));

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,

  wrapAsync(destroyReview)
);

// server start

module.exports = router;
