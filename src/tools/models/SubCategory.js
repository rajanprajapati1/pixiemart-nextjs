import mongoose from "mongoose";

const SubcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
});

export const SubCategory =
  mongoose.models.subcategory ||
  mongoose.model("subcategory", SubcategorySchema);
