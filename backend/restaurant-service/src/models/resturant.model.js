const mongoose = require("mongoose");

// Schema for the Hotel
const HotelSchema = new mongoose.Schema(
  {
    userID: { type: String, required: true },
    hotelName: { type: String, required: true },
    hotelAddress: { type: String, required: true },
    metaData: { type: Object, default: {} },
    banner: { type: String, default: "default_banner_image_url" },
    isAuthorized: { type: Boolean, default: false },
    authCertificates: { type: Object, default: {} },
    ordersCount: { type: Number, default: 0 },
    location: { type: String, required: true },
    opentime: { type: String, required: true }, // Assuming this is a string for hours
    rating: { type: Number, default: 0 }, // Assuming this is the rating
    categoriesprovider: {type: [String]},
    cousinProvided: {type: [String]},
    isFeatured: {type: Boolean},
  },
  { timestamps: true }
);

const Hotel = mongoose.model("Hotel", HotelSchema);
module.exports = Hotel;
