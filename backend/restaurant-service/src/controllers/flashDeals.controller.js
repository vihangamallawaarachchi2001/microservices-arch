const FlashDeals = require("../models/flashDeals.model");

//const FoodID = "2124564165"

exports.createFlashDeal = async (req, res) => {
  try {
    const {  type, newPrice,FoodID } = req.body;

    // Check if a flash deal already exists for this FoodID
    const existingDeal = await FlashDeals.findOne({ FoodID });

    if (existingDeal) {
      return res.status(400).json({ message: "A flash deal already exists for this food item." });
    }

    // Create a new flash deal
    const newDeal = new FlashDeals({
      FoodID,
      type,
      newPrice,
    });

    await newDeal.save();
    res.status(201).json({ message: "Flash deal created successfully!", flashDeal: newDeal });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update an existing flash deal
exports.updateFlashDeal = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, newPrice } = req.body;

    const updatedDeal = await FlashDeals.findByIdAndUpdate(
      id,
      { type, newPrice },
      { new: true, runValidators: true } // Ensure validation
    );

    if (!updatedDeal) {
      return res.status(404).json({ message: "Flash deal not found" });
    }

    res.status(200).json({ message: "Flash deal updated successfully!", flashDeal: updatedDeal });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a flash deal
exports.deleteFlashDeal = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDeal = await FlashDeals.findByIdAndDelete(id);

    if (!deletedDeal) {
      return res.status(404).json({ message: "Flash deal not found" });
    }

    res.status(200).json({ message: "Flash deal deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a flash deal by ID
exports.getFlashDealById = async (req, res) => {
  try {
    const { id } = req.params;
    const FoodID = id.toString();
    const flashDeal = await FlashDeals.findOne({FoodID: FoodID});

    if (!flashDeal) {
      return res.status(200).json({ message: "Flash deal not found" });
    }

    res.status(200).json(flashDeal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all flash deals
exports.getAllFlashDeals = async (req, res) => {
  try {
    const flashDeals = await FlashDeals.find();
    res.status(200).json(flashDeals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
