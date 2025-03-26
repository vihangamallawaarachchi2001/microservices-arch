import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  foodID: string;
  type: string;
  newPrice: string;

}

const FlashDealsSchema: Schema = new Schema({
  foodID: { type: String, required: true, unique: true},
  type: { type: String, required: true },
  newPrice: { type: String, required: true },
}, { timestamps: true });

const FlashDeals = mongoose.model<IUser>("FlashDeals", FlashDealsSchema);
export default FlashDeals;