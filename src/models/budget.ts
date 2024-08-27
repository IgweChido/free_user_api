import mongoose from "mongoose";

const Budget = new mongoose.Schema({
  title: String,
  amount: Number,
  category: String,
  budget_date: Date,
});

export default mongoose.model<mongoose.Document>("Budget", Budget);
