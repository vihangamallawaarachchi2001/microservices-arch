import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  userID: string;
  title: string;
  body: string;
  markAsRead:boolean;
}

const NotificationSchema: Schema = new Schema({
  userID: { type: String, required: true },
  title: { type: String, required: true},
  body: { type: String, default:"" },
  markAsRead:{ type: Boolean, default:false },
}, { timestamps: true });

const Notification = mongoose.model<IUser>("Notification", NotificationSchema);
export default Notification;