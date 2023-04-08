const express = require("express")
const router = express.Router({ mergeParams: true })
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware")
const catchAsync = require("../utils (error)/catchAsync")
const reviews = require("../controllers/reviews")
const Campground = require("../models/campground")
const Review = require("../models/review")


//create review
router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview))

//delete review
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router
