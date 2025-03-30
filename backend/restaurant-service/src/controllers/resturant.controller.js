const Hotel = require("../models/resturant.model");

const userID = "123456";


//TODO : Multer setup 

// Create a new hotel
exports.createHotel = async (req, res) => {
  try {

    const {hotelName,hotelAddress,metaData,banner,isAutorized,authCertificates,ordersCount,location,opentime} = req.body;

    const newHotel = new Hotel(
        {userID:userID,
        hotelName,
        hotelAddress,
        metaData,
        banner,
        isAutorized,
        authCertificates,
        ordersCount,
        location,
        opentime}
    );
    await newHotel.save();
    res.status(201).json(newHotel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single hotel by ID
exports.getHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all hotels
exports.getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing hotel
exports.updateHotel = async (req, res) => {
    try {
      const { hotelName, hotelAddress, metaData, banner, isAuthorized, authCertificates, ordersCount, location, opentime } = req.body;
  
      const updatedHotel = await Hotel.findByIdAndUpdate(
        req.params.id,
        {
          hotelName,
          hotelAddress,
          metaData,
          banner,
          isAuthorized,
          authCertificates,
          ordersCount,
          location,
          opentime,
        },
        { new: true }
      );
  
      if (!updatedHotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }
  
      res.status(200).json(updatedHotel);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

// Delete a hotel by ID
exports.deleteHotel = async (req, res) => {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!deletedHotel) return res.status(404).json({ message: "Hotel not found" });
    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.rateHotel = async (req, res) => {
    try {
      let { ratingID } = req.body;
  
      // Ensure ratingID is an array before pushing
      if (!Array.isArray(ratingID)) {
        ratingID = [ratingID]; // Convert single string to an array
      }
  
      const updatedHotel = await Hotel.findByIdAndUpdate(
        req.params.id,
        { $push: { ratingID: { $each: ratingID } } }, // Ensure correct array push
        { new: true }
      );
  
      if (!updatedHotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }
  
      res.status(200).json(updatedHotel);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Remove a rating ID from a hotel
exports.removeRating = async (req, res) => {
    try {
      const { ratingID } = req.body;
  
      // Ensure ratingID is provided
      if (!ratingID) {
        return res.status(400).json({ message: "ratingID is required" });
      }
  
      // Update the hotel by pulling the ratingID from the array
      const updatedHotel = await Hotel.findByIdAndUpdate(
        req.params.id,
        { $pull: { ratingID: ratingID } },
        { new: true }
      );
  
      // Check if the hotel was found and updated
      if (!updatedHotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }
  
      res.status(200).json(updatedHotel);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
