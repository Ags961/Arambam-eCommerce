import mongoose from "mongoose";

function createProductSchema() {
  return new mongoose.Schema({
    name:        { type: String, required: true },
    description: { type: String, required: true },
    price:       { type: Number, required: true },
    image:       { type: Array, required: true },
    category:    { type: String, required: true },
    subCategory: { type: String, required: true },
    sizes:       { type: Array, required: true },
    bestseller:  { type: Boolean },
    sale:        { type: Boolean, default: false },
    date:        { type: Number, required: true }
  });
}

const productSchema = createProductSchema();

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;