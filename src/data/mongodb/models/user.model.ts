import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    credits: {
      type: Number,
      default: 100, // Si es FREE, puede recargar créditos
    },
    typePlan: {
      type: String,
      enum: ["PRO", "FREE"], // Solo acepta estos valores
      required: [true, "TypePlan is required"],
    },
    subscriptionExpiresAt: {
      type: Date,
      default: null, // Si es FREE, no tiene fecha de expiración
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model("User", userSchema);
