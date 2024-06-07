import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  user : {
    type:mongoose.Schema.Types.ObjectId,
    ref : 'user',
    required :true
  } ,
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
    required: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

export const Wishlist = mongoose.models.wishlist || mongoose.model("wishlist", wishlistSchema);
