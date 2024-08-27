import mongoose from "mongoose";

const Earnings = new mongoose.Schema({
  title: String,
  amount: Number,
  description: String,
  date_earned: Date,
  date_for: Date,
});

export default mongoose.model<mongoose.Document>("Earnings", Earnings);

// Admin shipment controller

// booking controller
