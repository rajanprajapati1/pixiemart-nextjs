import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    size: {
      type: String,
    },
    color: {
      type: String, 
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Cart = mongoose.models.cart || mongoose.model("cart", CartSchema);
