const express = require("express");
const router = express.Router();
const foodItemController = require("../controllers/foodItems.controller");

// Create a new hotel
router.post("/", foodItemController.createFood);

// Get a single hotel by ID
router.get("/getById/:hotelID", foodItemController.getFoodById);
router.get("/:id", foodItemController.getFoodBy_ID);

// Get all hotels
router.get("/getAll", foodItemController.getAllFood);

// Update a hotel by ID
router.put("/update/:id", foodItemController.updateFood);

// Delete a hotel by ID
router.delete("/:id", foodItemController.deleteFood);

//rate hotel
router.put("/rate/:id",foodItemController.rateFoodItem)

//remove rating
router.put('/removeRate/:id', foodItemController.removeRating)

module.exports = router;
