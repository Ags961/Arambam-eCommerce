import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Admin form for adding or editing a product.
 * Supports image upload, editable fields, and category handling.
 */
const Add = ({ token, darkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Determine if in edit mode
  const productId = searchParams.get('id');
  const editItem = location.state;

  // Product form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [bestseller, setBestseller] = useState(false);
  const [sale, setSale] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [images, setImages] = useState([false, false, false, false]);

  // Fetch existing product if editing
  useEffect(() => {
    const initialiseForm = async () => {
      try {
        const product = editItem || (await fetchProductById(productId));
        if (!product) return;

        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setCategory(product.category);
        setSubCategory(product.subCategory);
        setBestseller(product.bestseller);
        setSale(product.sale);
        setSizes(product.sizes || []);
        setImages(product.image || [false, false, false, false]);
      } catch (error) {
        toast.error('Failed to load product.');
      }
    };

    initialiseForm();
  }, [productId, editItem]);

  // Fetch product by ID
  const fetchProductById = async (id) => {
    try {
      const res = await axios.post(`${backendUrl}/api/product/single`, { productId: id });
      return res.data.success ? res.data.product : null;
    } catch {
      return null;
    }
  };

  // Returns image preview or placeholder
  const previewImage = (fileOrUrl) =>
    typeof fileOrUrl === 'string' ? fileOrUrl : fileOrUrl ? URL.createObjectURL(fileOrUrl) : assets.upload_area;

  // Handles form submission
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (sizes.length === 0) {
      return toast.error('Please select at least one size.');
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('subCategory', subCategory);
    formData.append('bestseller', bestseller);
    formData.append('sale', sale);
    formData.append('sizes', JSON.stringify(sizes));

    images.forEach((img, i) => {
      if (img && typeof img !== 'string') formData.append(`image${i + 1}`, img);
    });

    if (productId) formData.append('productId', productId);

    try {
      const url = productId ? '/api/product/edit' : '/api/product/add';
      const res = await axios.post(`${backendUrl}${url}`, formData, {
        headers: { token },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/list');
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to submit product');
    }
  };

  return (
    <motion.form
      onSubmit={onSubmitHandler}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`w-full flex flex-col gap-6 p-6 rounded-md shadow-md ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
    >
      <h2 className="text-2xl font-bold">
        {productId ? 'Edit Product' : 'Add New Product'}
      </h2>

      {/* Upload Section */}
      <section>
        <p className="mb-2">Upload Images</p>
        <div className="flex gap-3 flex-wrap">
          {images.map((img, idx) => (
            <label key={idx}>
              <img
                className="w-20 h-20 object-cover border rounded"
                src={previewImage(img)}
                alt={`Product ${idx + 1}`}
              />
              <input
                type="file"
                hidden
                onChange={(e) => {
                  const files = [...images];
                  files[idx] = e.target.files[0];
                  setImages(files);
                }}
              />
            </label>
          ))}
        </div>
      </section>

      {/* Name and Description */}
      <div className="w-full">
        <label className="block mb-1">Product Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          required
          className="w-full max-w-md border px-3 py-2 rounded"
          placeholder="T-shirt, Jeans, etc."
        />
      </div>

      <div className="w-full">
        <label className="block mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full max-w-md border px-3 py-2 rounded"
          placeholder="Write a short product description"
        />
      </div>

      {/* Category Fields */}
      <div className="flex flex-col sm:flex-row gap-6">
        <div>
          <label className="block mb-1">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="border px-3 py-2 rounded">
            {['Men', 'Women', 'Kids'].map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Subcategory</label>
          <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className="border px-3 py-2 rounded">
            {['Hoodies', 'Chinos', 'Joggers', 'Shirts', 'Shorts'].map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Price (£)</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            required
            className="border px-3 py-2 rounded w-[100px]"
          />
        </div>
      </div>

      {/* Size Selector */}
      <section>
        <p className="mb-2">Available Sizes</p>
        <div className="flex gap-2 flex-wrap">
          {['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <span
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((s) => s !== size)
                    : [...prev, size]
                )
              }
              className={`cursor-pointer px-4 py-1 rounded-full transition ${
                sizes.includes(size) ? 'bg-blue-500 text-white' : 'bg-gray-300'
              }`}
            >
              {size}
            </span>
          ))}
        </div>
      </section>

      {/* Toggles */}
      <div className="flex gap-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={bestseller}
            onChange={() => setBestseller((prev) => !prev)}
          />
          Bestseller
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={sale}
            onChange={() => setSale((prev) => !prev)}
          />
          Sale Item
        </label>
      </div>

      {/* Submit */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        className="mt-4 w-40 py-3 bg-black text-white rounded-full hover:opacity-90 transition"
        type="submit"
      >
        {productId ? 'SAVE CHANGES' : 'ADD PRODUCT'}
      </motion.button>
    </motion.form>
  );
};

export default Add;