import mongoose from "mongoose";

const geoSchema = new mongoose.Schema({
  lat: { type: String },
  lng: { type: String },
}, { _id: false });

const addressSchema = new mongoose.Schema({
  street: { type: String },
  city: { type: String },
  zip: { type: String },
  geo: geoSchema,
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  email: { type: String, required: [true, "Email is required"], match: [/.+@.+\..+/, "Enter a valid email"] },
  phone: { type: String, required: [true, "Phone is required"] },
  company: { type: String },
  address: addressSchema,
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", userSchema);
