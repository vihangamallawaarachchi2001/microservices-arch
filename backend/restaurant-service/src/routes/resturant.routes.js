const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/resturant.controller");
const authGuard  = require("../middleware/auth.middleware");

// Create a new hotel
router.post("/",authGuard, hotelController.createHotel);

// Get a single hotel by ID
router.get("/getById/:id", hotelController.getHotel);

// Get all hotels (with filtering and search)
router.get("/", hotelController.getAllHotels);

// Update a hotel by ID
router.put("/update/:id", authGuard, hotelController.updateHotel); // Fixed missing "/"

// Delete a hotel by ID
router.delete("/:id", authGuard, hotelController.deleteHotel);

// Rate a hotel
router.put("/rate/:id", hotelController.rateHotel);

// Remove a rating from a hotel
//router.put("/removeRate/:id", hotelController.removeRating);

module.exports = router;