const express = require("express");
const router = express.Router();
const multer = require("multer");

const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../model/listing");
const ExpressError = require("../utils/ExpressError.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const {
  index,
  renderNewForm,
  showListing,
  createListings,
  renderEditForm,
  destroyListing,
  listingEdit,
} = require("../controllers/listings.js");

router
  .route("/")
  .get(wrapAsync(index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(createListings)
  );

router.get("/new", isLoggedIn, renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(renderEditForm)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(destroyListing));

// router.get("/:id", wrapAsync(showListing));

// router.post("/", isLoggedIn, validateListing, wrapAsync(createListings));

// edit route
router.get("/:id/edit", isOwner, isLoggedIn, wrapAsync(listingEdit));

//

// update Route
// router.put(
//   "/:id",
//   isLoggedIn,
//   isOwner,
//   validateListing,
//   wrapAsync(renderEditForm)
// );

// delete Route
// router.delete("/:id", isLoggedIn, isOwner, wrapAsync(destroyListing));

// new route
// router.get("/new", (req, res) => {
//   if (!req.isAuthenticated()) {
//     req.flash("error", "you must be logged in to create listing!");
//     return res.redirect("/listings");
//   }
//   res.render("listings/new.ejs");
// });

module.exports = router;
