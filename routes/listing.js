const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer = require("multer");
const { storage, cloudinary } = require("../cloudConfig.js");
const upload = multer({storage });

const listingController = require("../controllers/listings.js");

router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, upload.single('url'),validateListing, wrapAsync(listingController.createListing))

router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwner, upload.single('url'), validateListing, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing))

router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(listingController.editListing));

router.post('/:id/map')

module.exports = router;
 