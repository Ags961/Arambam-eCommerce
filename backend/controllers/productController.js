import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Function to add product
const addProduct = async (req, res) => {
  console.log("🟢 [addProduct] - Entry Point");
  try {
    const { name, description, price, category, subCategory, sizes, bestseller, sale } = req.body;
    console.log("📝 Product Details:", req.body);

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter((item) => item !== undefined);
    console.log("🖼 Uploading Images:", images.map(i => i.originalname));

    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
        console.log("✅ Uploaded:", result.secure_url);
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true",
      sale: sale === "true",
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now()
    };

    const product = new productModel(productData);
    await product.save();

    console.log("✅ Product Added:", product);
    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log("❌ Error in [addProduct]:", error.message);
    res.json({ success: false, message: error.message });
  }
};

// Function to list all products
const listProducts = async (req, res) => {
  console.log("🔍 [listProducts] - Entry Point");
  try {
    const products = await productModel.find({});
    console.log("📦 Total Products:", products.length);
    res.json({ success: true, products });
  } catch (error) {
    console.log("❌ Error in [listProducts]:", error.message);
    res.json({ success: false, message: error.message });
  }
};

// Function to remove a product
const removeProduct = async (req, res) => {
  console.log("🗑 [removeProduct] - Entry Point");
  try {
    await productModel.findByIdAndDelete(req.body.id);
    console.log("✅ Product Removed ID:", req.body.id);
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.log("❌ Error in [removeProduct]:", error.message);
    res.json({ success: false, message: error.message });
  }
};

// Function for single product info
const singleProduct = async (req, res) => {
  console.log("📦 [singleProduct] - Entry Point");
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    console.log("🔎 Product Fetched:", product);
    res.json({ success: true, product });
  } catch (error) {
    console.log("❌ Error in [singleProduct]:", error.message);
    res.json({ success: false, message: error.message });
  }
};

// Function to edit product
const editProduct = async (req, res) => {
  console.log("✏️ [editProduct] - Entry Point");
  try {
    const { productId, name, description, price, category, subCategory, sizes, bestseller, sale } = req.body;
    console.log("📝 Update Data:", req.body);

    const updatedFields = {
      name,
      description,
      price,
      category,
      subCategory,
      bestseller: bestseller === "true",
      sale: sale === "true",
      sizes: JSON.parse(sizes),
    };

    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    const images = [image1, image2, image3, image4].filter(Boolean);

    if (images.length > 0) {
      console.log("🖼 Uploading Updated Images:", images.map(i => i.originalname));
      const imagesUrl = await Promise.all(
        images.map(async (item) => {
          const result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
          console.log("✅ Uploaded:", result.secure_url);
          return result.secure_url;
        })
      );
      updatedFields.image = imagesUrl;
    }

    await productModel.findByIdAndUpdate(productId, updatedFields);
    console.log("✅ Product Updated:", productId);
    res.json({ success: true, message: "Product Updated Successfully" });
  } catch (error) {
    console.log("❌ Error in [editProduct]:", error.message);
    res.json({ success: false, message: error.message });
  }
};

export { listProducts, addProduct, removeProduct, singleProduct, editProduct };
