import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  foodID: string;
  orderID: string;

}

const OrderItemsSchema: Schema = new Schema({
  foodID: { type: String, required: true},
  orderID: { type: String, required: true },
}, { timestamps: true });

const OrderItems = mongoose.model<IUser>("OrderItems", OrderItemsSchema);
export default OrderItems;