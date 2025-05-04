import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { toast } from "react-toastify";

// ✅ ProductItem Component - Renders each product card with sale badge, wishlist toggle, and links
const ProductItem = ({ id, image, name, price, sale }) => {
  const { currency, wishlist, addToWishlist, removeFromWishlist } = useContext(ShopContext);

  // ✅ Check if the product is already in the wishlist
  const isInWishlist = wishlist.includes(id);

  // ✅ Handle toggle wishlist click
  const toggleWishlist = (e) => {
    e.preventDefault();
    if (isInWishlist) {
      removeFromWishlist(id);
      toast.info("Removed from wishlist");
    } else {
      addToWishlist(id);
      toast.success("Added to wishlist");
    }
  };

  return (
    <motion.div
      className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg border border-gray-200 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
    >
      {/* ✅ SALE Badge */}
      {sale && (
        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold z-10">
          SALE
        </div>
      )}

      {/* ✅ Wishlist Icon Button */}
      <button
        onClick={toggleWishlist}
        className="absolute top-3 right-3 bg-white p-1.5 rounded-full shadow-md hover:scale-110 transition z-10"
        aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        {isInWishlist ? (
          <AiFillHeart className="text-red-500 text-xl" />
        ) : (
          <AiOutlineHeart className="text-gray-500 text-xl" />
        )}
      </button>

      {/* ✅ Product Link with Image + Info */}
      <Link to={`/product/${id}`} onClick={() => scrollTo(0, 0)} className="flex flex-col cursor-pointer group">

        {/* Product Image */}
        <div className="overflow-hidden rounded-t-2xl">
          <motion.img
            src={image[0]}
            alt={name}
            className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
            whileHover={{ scale: 1.1 }}
          />
        </div>

        {/* ✅ Product Info */}
        <div className="p-4 text-center">
          <h3 className="text-base font-semibold text-black truncate">{name}</h3>
          <p className="text-sm text-gray-700 mt-1">{currency}{price.toFixed(2)}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductItem;