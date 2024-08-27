import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"],
      lowercase: true,
    },
    name: {
      title: {
        type: String,
        enum: ["miss", "master", "mrs", "mr"],
        lowercase: true,
        required: true,
      },
      first: {
        type: String,
        required: true,
        index: true,
        lowercase: true,
      },
      last: {
        type: String,
        index: true,
        lowercase: true,
        required: true,
      },
    },
    location: {
      street: {
        number: Number,
        name: {
          type: String,
          index: true,
          lowercase: true,
          required: true,
        },
      },
      city: {
        type: String,
        index: true,
        lowercase: true,
        required: true,
      },
      state: {
        type: String,
        index: true,
        lowercase: true,
        required: true,
      },
      country: {
        type: String,
        index: true,
        lowercase: true,
        required: true,
      },
      postcode: Number,
    },
    email: {
      type: String,
      required: true,
      index: true,
      lowercase: true,
    },
    dob: {
      date: {
        type: Date,
        required: true,
      },
      age: {
        type: Number,
        index: true,
        required: true,
      },
    },
    registered: {
      date: {
        type: Date,
        required: true,
      },
      age: Number,
    },
    phone: {
      type: String,
      required: true,
      index: true,
    },
    cell: {
      type: String,
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<mongoose.Document>("User", User);
