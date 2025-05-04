import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

// ✅ Product Page - Shows full product details, images, size, cart, and review system
const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState([]);

  // ✅ Scroll to top and load product details
  useEffect(() => {
    window.scrollTo(0, 0);
    const selectedProduct = products.find(p => p._id === productId);
    if (selectedProduct) {
      setProductData(selectedProduct);
      setImage(selectedProduct.image[0]);
    } else {
      setProductData(null);
    }
  }, [productId, products]);

  // ✅ Handle submitting a new review
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (rating === 0 || reviewText.trim() === '') {
      toast.error("Please select a rating and write a review.");
      return;
    }

    const newReview = {
      rating,
      text: reviewText.trim(),
      date: new Date().toISOString(),
    };

    // Prepend for latest-first
    setReviews(prev => [newReview, ...prev]);
    setRating(0);
    setReviewText('');
    toast.success("Review submitted!");
  };

  // ✅ Delete review (by index)
  const handleDeleteReview = (index) => {
    setReviews(prev => prev.filter((_, i) => i !== index));
    toast("Review deleted");
  };

  // ✅ Calculate average rating
  const averageRating = reviews.length
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    : 0;

  const fullStars = Math.floor(averageRating);
  const hasHalfStar = averageRating % 1 >= 0.5;

  // ❗ Show fallback if product not found
  if (!productData) {
    return <div className="text-center text-gray-500 py-20">Product not found.</div>;
  }

  return (
    <motion.div
      className="border-t-2 pt-10 px-4 md:px-10 transition-opacity ease-in duration-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >

      {/* 🔍 Product Top Section */}
      <div className="flex flex-col md:flex-row gap-10">

        {/* Left: Image Gallery */}
        <motion.div
          className="flex-1 flex flex-col-reverse md:flex-row gap-4"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          {/* Thumbnails */}
          <div className="flex md:flex-col overflow-x-auto md:overflow-y-auto md:w-1/5 gap-3 md:gap-4">
            {productData.image.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="Thumbnail"
                onClick={() => setImage(img)}
                className={`w-24 h-24 object-cover cursor-pointer border ${image === img ? 'border-black' : 'border-transparent'}`}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="w-full md:w-4/5 flex justify-center items-center">
            <img src={image} alt={productData.name} className="w-full h-auto rounded-xl shadow-md" />
          </div>
        </motion.div>

        {/* Right: Product Info */}
        <motion.div
          className="flex-1 flex flex-col gap-5"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <h1 className="text-3xl font-bold text-black">{productData.name}</h1>

          {/* ⭐ Display Average Rating */}
          <div className="flex items-center gap-1 text-yellow-400">
            {[...Array(fullStars)].map((_, i) => <img key={i} src={assets.star_icon} className="w-5" />)}
            {hasHalfStar && <img src={assets.star_dull_icon} className="w-5" />}
            {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
              <img key={i} src={assets.star_dull_icon} className="w-5" />
            ))}
            <span className="text-gray-600 text-sm pl-2">({reviews.length} review{reviews.length !== 1 && 's'})</span>
          </div>

          <p className="text-2xl font-semibold text-black">{currency}{productData.price}</p>
          <p className="text-gray-600">{productData.description}</p>

          {/* 📏 Size Selector */}
          <div className="flex flex-col gap-4 mt-6">
            <p className="font-semibold">Select Size</p>
            <div className="flex gap-3 flex-wrap">
              {productData.sizes.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setSize(s)}
                  className={`px-4 py-2 rounded-lg border ${size === s ? 'border-black bg-gray-100' : 'border-gray-300'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* 🛒 Add to Cart */}
          <motion.button
            onClick={() => {
              if (!size) {
                toast.error("Please select a size");
                return;
              }
              addToCart(productData._id, size);
              toast.success("Added to basket!");
            }}
            className="bg-black text-white text-sm mt-6 px-8 py-3 rounded hover:bg-gray-800 transition"
            whileHover={{ scale: 1.05 }}
          >
            ADD TO CART
          </motion.button>

          {/* 🚚 Delivery Info */}
          <div className="text-sm text-gray-600 mt-6 space-y-1">
            <p>✅ 100% Original Product</p>
            <p>💵 Cash on Delivery Available</p>
            <p>🔄 Easy Return & Exchange within 7 Days</p>
          </div>
        </motion.div>
      </div>

      {/* 📝 Product Description */}
      <div className="mt-16 border px-6 py-6 text-sm text-gray-600 leading-relaxed rounded-xl">
        <p>
          Aarambam offers an easy, secure and stylish online shopping experience. Each product is handpicked to ensure top quality, comfort, and value.
        </p>
        <p className="mt-4">
          Our return policy and transparent pricing ensure your satisfaction every time.
        </p>
      </div>

      {/* ✍️ Review Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Write a Review</h2>
        <form onSubmit={handleReviewSubmit} className="flex flex-col gap-4 max-w-xl">
          {/* Star Input */}
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setRating(star)}
                className={`text-2xl ${rating >= star ? 'text-yellow-400' : 'text-gray-400'}`}
                aria-label={`Rate ${star} star`}
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            placeholder="Write your review..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="border p-3 rounded-md"
            rows="4"
          ></textarea>

          <button type="submit" className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
            Submit Review
          </button>
        </form>

        {/* 🧾 Display Submitted Reviews */}
        {reviews.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-3">Customer Reviews</h3>
            {reviews.map((r, i) => (
              <div key={i} className="mb-4 p-4 border rounded-md relative">
                <div className="flex gap-1 mb-2 text-yellow-400">
                  {[...Array(r.rating)].map((_, idx) => <span key={idx}>★</span>)}
                  {[...Array(5 - r.rating)].map((_, idx) => <span key={idx} className="text-gray-300">★</span>)}
                </div>
                <p className="text-gray-700">{r.text}</p>
                <button
                  onClick={() => handleDeleteReview(i)}
                  className="absolute top-2 right-2 text-sm text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🛍️ Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </motion.div>
  );
};

export default Product;