const mongoose = require("mongoose");

// Schema for the Hotel
const FoodSchema = new mongoose.Schema(
  {
    hotelID: { type: String, required: true },
    categoryName: { type: String, required: true },
    foodName: { type: String, required: true },
    image: { type: String, default: "default_banner_image_url" },
    price: { type: String, required: true },
    description: { type: String, default:''}, // Assuming this is a string for hours
    isAvailable: { type: Boolean, default: false },
    ratingID: { type: [String], default: [] }, // Assuming this is the rating
    isOfferAvailable: { type: Boolean, default: false },

  },
  { timestamps: true }
);

const Food = mongoose.model("foodItems", FoodSchema);
module.exports = Food;
