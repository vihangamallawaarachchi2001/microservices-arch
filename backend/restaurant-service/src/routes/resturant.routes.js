const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/resturant.controller");

// Create a new hotel
router.post("/", hotelController.createHotel);

// Get a single hotel by ID
router.get("/getById/:id", hotelController.getHotel);

// Get all hotels
router.get("/getAll", hotelController.getAllHotels);

// Update a hotel by ID
router.put("update/:id", hotelController.updateHotel);

// Delete a hotel by ID
router.delete("/:id", hotelController.deleteHotel);

//rate hotel
router.put("/rate/:id",hotelController.rateHotel)

//remove rating
router.put('/removeRate/:id', hotelController.removeRating)

module.exports = router;
