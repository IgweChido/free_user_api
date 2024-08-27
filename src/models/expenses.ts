import mongoose from "mongoose";

const Expenses = new mongoose.Schema({
  title: String,
  amount: Number,
  category: String,
  description: String,
  date_spent: Date,
  is_deleted: Boolean,
});

export default mongoose.model<mongoose.Document>("Expenses", Expenses);
