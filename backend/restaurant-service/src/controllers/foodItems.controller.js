const Food = require("../models/foodItems.model");

const hotelID = "2345567777654"

// Create a new food item
exports.createFood = async (req, res) => {
  try {
    const { categoryName, foodName, image, price, description, isAvailable, isOfferAvailable } = req.body;

    const newFood = new Food({
      hotelID:hotelID,
      categoryName,
      foodName,
      image,
      price,
      description,
      isAvailable,
      isOfferAvailable,
    });

    await newFood.save();
    res.status(201).json(newFood);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all food items
exports.getAllFood = async (req, res) => {
  try {
    const foodItems = await Food.find();
    res.status(200).json(foodItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a food item by ID
exports.getFoodById = async (req, res) => {
  try {
    const foodItem = await Food.findById(req.params.id);
    
    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }

    res.status(200).json(foodItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a food item by ID
exports.deleteFood = async (req, res) => {
  try {
    const deletedFood = await Food.findByIdAndDelete(req.params.id);

    if (!deletedFood) {
      return res.status(404).json({ message: "Food item not found" });
    }

    res.status(200).json({ message: "Food item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing food item
exports.updateFood = async (req, res) => {
    try {
      const { categoryName, foodName, image, price, description, isAvailable, isOfferAvailable } = req.body;
  
      const updatedFood = await Food.findByIdAndUpdate(
        req.params.id,
        {
          categoryName,
          foodName,
          image,
          price,
          description,
          isAvailable,
          isOfferAvailable,
        },
        { new: true } // Return the updated document
      );
  
      if (!updatedFood) {
        return res.status(404).json({ message: "Food item not found" });
      }
  
      res.status(200).json(updatedFood);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  


exports.rateFoodItem = async (req, res) => {
    try {
      let { ratingID } = req.body;
  
      // Ensure ratingID is an array before pushing
      if (!Array.isArray(ratingID)) {
        ratingID = [ratingID]; // Convert single string to an array
      }
  
      const updatedFoodItem = await Food.findByIdAndUpdate(
        req.params.id,
        { $push: { ratingID: { $each: ratingID } } }, // Ensure correct array push
        { new: true }
      );
  
      if (!updatedFoodItem) {
        return res.status(404).json({ message: "FoodItem not found" });
      }
  
      res.status(200).json(updatedFoodItem);
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
      const updatedFoodItem = await Food.findByIdAndUpdate(
        req.params.id,
        { $pull: { ratingID: ratingID } },
        { new: true }
      );
  
      // Check if the FoodupdatedFoodItem was found and updated
      if (!updatedFoodItem) {
        return res.status(404).json({ message: "FoodupdatedFoodItem not found" });
      }
  
      res.status(200).json(updatedFoodItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  