import mongoose, { Schema, Document } from "mongoose";

export interface IHotel extends Document {
  userID: string;
  hotelName: string;
  hotelAddress:string;
  MetaData: Record<string, any>;
  banner:string;
  isAuthorized:boolean;
  authCertificates:Record<string, any>;
  ordersCount:number;
  location:string;
  opentime:TimeRanges;
  rating:number;
}


// Schema for the Hotel
const HotelSchema: Schema = new Schema({
    userID: { type: String, required: true }, // Added userID
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
  }, { timestamps: true });

const Hotel = mongoose.model<IHotel>("Hotel", HotelSchema);
export default Hotel;