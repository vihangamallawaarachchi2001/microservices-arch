import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  userID: string;
  status: "pending" | "processing" | "completed" | "canceled"; // Enum type
  isOrderCompleted: boolean;
}

const OrderSchema: Schema = new Schema(
  {
    userID: { type: String, required: true, unique: true },
    status: { 
      type: String, 
      required: true, 
      enum: ["pending", "processing", "completed", "canceled"], // Enum added
      default: "pending" // Optional default value
    },
    isOrderCompleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Order = mongoose.model<IUser>("Order", OrderSchema);
export default Order;
