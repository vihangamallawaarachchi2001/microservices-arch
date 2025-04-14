const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

// Create a new review
router.post("/", reviewController.createReview);

// Get all reviews
router.get("/", reviewController.getReviews);

// Get a single review by ID
router.get("/:reviewId", reviewController.getReview);

// Get all reviews by `refId`
router.get("/ref/:refId", reviewController.getAllReviewsByRefId);

// Update a review by ID
router.put("/:reviewId", reviewController.updateReview);

// Delete a review by ID
router.delete("/:reviewId", reviewController.deleteReview);

module.exports = router;