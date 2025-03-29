const express = require("express");
const router = express.Router();
const flashDealsController = require("../controllers/flashDeals.controller");

// Create a new hotel
router.post("/", flashDealsController.createFlashDeal);

// Get a single hotel by ID
router.get("/getById/:id", flashDealsController.getFlashDealById);

// Get all hotels
router.get("/getAll", flashDealsController.getAllFlashDeals);

// Update a hotel by ID
router.put("/update/:id", flashDealsController.updateFlashDeal);

// Delete a hotel by ID
router.delete("/:id", flashDealsController.deleteFlashDeal);

module.exports = router;
