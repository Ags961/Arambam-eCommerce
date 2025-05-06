import React, { useState } from 'react';
import axios from 'axios';

const Add = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [sizes, setSizes] = useState([]);
  const [image, setImage] = useState(null);
  const [sale, setSale] = useState(false);

  const handleSizeToggle = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('subCategory', subCategory.toLowerCase()); // ✅ force lowercase
    formData.append('sizes', JSON.stringify(sizes));
    formData.append('sale', sale);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post('/api/products', formData);
      alert('Product added successfully!');
      // Optionally clear form
      setName('');
      setPrice('');
      setCategory('');
      setSubCategory('');
      setSizes([]);
      setImage(null);
      setSale(false);
    } catch (err) {
      console.error(err);
      alert('Failed to add product');
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="max-w-xl mx-auto p-6 bg-white shadow rounded"
    >
      <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>

      <label className="text-sm font-medium mb-1">Name</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border rounded px-3 py-2 mb-4 w-full"
        required
      />

      <label className="text-sm font-medium mb-1">Price (£)</label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border rounded px-3 py-2 mb-4 w-full"
        required
      />

      <label className="text-sm font-medium mb-1">Category</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border rounded px-3 py-2 mb-4 w-full"
        required
      >
        <option value="">Select Category</option>
        {['Men', 'Women', 'Kids'].map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <label className="text-sm font-medium mb-1">Subcategory</label>
      <select
        value={subCategory}
        onChange={(e) => setSubCategory(e.target.value)}
        className="border rounded px-3 py-2 mb-4 w-full"
        required
      >
        <option value="">Select Type</option>
        {['hoodies', 'chinos', 'joggers', 'shirts', 'shorts'].map((sub) => (
          <option key={sub} value={sub}>
            {sub.charAt(0).toUpperCase() + sub.slice(1)}
          </option>
        ))}
      </select>

      <label className="text-sm font-medium mb-1">Sizes</label>
      <div className="flex flex-wrap gap-2 mb-4">
        {['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
          <label key={sz} className="flex items-center gap-1 text-sm">
            <input
              type="checkbox"
              value={sz}
              checked={sizes.includes(sz)}
              onChange={() => handleSizeToggle(sz)}
            />
            {sz}
          </label>
        ))}
      </div>

      <label className="text-sm font-medium mb-1">Image</label>
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        className="mb-4"
        accept="image/*"
        required
      />

      <label className="flex items-center gap-2 text-sm font-medium mb-4">
        <input
          type="checkbox"
          checked={sale}
          onChange={(e) => setSale(e.target.checked)}
        />
        On Sale
      </label>

      <button
        type="submit"
        className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
      >
        Add Product
      </button>
    </form>
  );
};

export default Add;
