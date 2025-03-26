import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    rateCount: number;
  feedBack: string;

}

const RatingsSchema: Schema = new Schema({
  rateCount: { type: Number, required: true, unique: true},
  feedBack: { type: String, required: true },
}, { timestamps: true });

const Ratings = mongoose.model<IUser>("Ratings", RatingsSchema);
export default Ratings;