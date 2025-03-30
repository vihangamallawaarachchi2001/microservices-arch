const mongoose = require("mongoose");

const FlashDealsSchema = new mongoose.Schema(
  {
    FoodID: { type: String, required: true },
    type: { 
      type: String, 
      enum: ["byOneGetOne", "savedOnSelected"], // Allowed values
      required: true 
    },
    newPrice: { type: String, required: true }
  },
  { timestamps: true }
);

const FlashDeals = mongoose.model("flashDeal", FlashDealsSchema);
module.exports = FlashDeals;
