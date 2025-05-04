import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

// ✅ Collection Page - Displays products with search, filters, and sorting
const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sizeFilter, setSizeFilter] = useState([]);
  const [priceRange, setPriceRange] = useState(1000);
  const [sortType, setSortType] = useState('relevant');

  // ✅ Handle toggle for category filters
  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  // ✅ Handle toggle for subcategory filters
  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  // ✅ Handle toggle for size filters
  const toggleSize = (e) => {
    const value = e.target.value;
    setSizeFilter((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  // ✅ Clear all filters
  const clearFilters = () => {
    setCategory([]);
    setSubCategory([]);
    setSizeFilter([]);
    setPriceRange(1000);
    setSortType('relevant');
  };

  // ✅ Apply filters based on current selections
  const applyFilter = () => {
    let productsCopy = [...products];

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory));
    }

    if (sizeFilter.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        item.sizes?.some((size) => sizeFilter.includes(size))
      );
    }

    productsCopy = productsCopy.filter((item) => item.price <= priceRange);

    setFilterProducts(productsCopy);
  };

  // ✅ Sort the filtered products
  const sortProduct = () => {
    let sorted = [...filterProducts];
    switch (sortType) {
      case 'low-high':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        applyFilter();
        return;
    }
    setFilterProducts(sorted);
  };

  // ✅ Apply filters when filters/search/products change
  useEffect(() => {
    applyFilter();
  }, [category, subCategory, sizeFilter, priceRange, search, showSearch, products]);

  // ✅ Sort when sort option changes
  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 pt-10 px-4 border-t">

      {/* ✅ Filters Panel */}
      <div className="min-w-60">
        {/* Toggle Button on Mobile */}
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt="dropdown"
          />
        </p>

        {/* ✅ Filter Options */}
        <div className={`${showFilter ? '' : 'hidden'} sm:block`}>
          {/* Category */}
          <div className="border border-gray-300 pl-5 py-3 mt-6 rounded-lg">
            <p className="mb-3 text-sm font-medium">CATEGORIES</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              {['Men', 'Women', 'Kids'].map((cat, i) => (
                <label key={i} className="flex gap-2">
                  <input type="checkbox" value={cat} checked={category.includes(cat)} onChange={toggleCategory} />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          {/* Subcategory */}
          <div className="border border-gray-300 pl-5 py-3 my-5 rounded-lg">
            <p className="mb-3 text-sm font-medium">TYPE</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              {['Hoodies', 'Chinos', 'Joggers', 'Shirts', 'Shorts'].map((sub, i) => (
                <label key={i} className="flex gap-2">
                  <input type="checkbox" value={sub} checked={subCategory.includes(sub)} onChange={toggleSubCategory} />
                  {sub}
                </label>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="border border-gray-300 pl-5 py-3 my-5 rounded-lg">
            <p className="mb-3 text-sm font-medium">SIZES</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              {['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'].map((sz, i) => (
                <label key={i} className="flex gap-2">
                  <input type="checkbox" value={sz} checked={sizeFilter.includes(sz)} onChange={toggleSize} />
                  {sz}
                </label>
              ))}
            </div>
          </div>

          {/* Price Slider */}
          <div className="border border-gray-300 pl-5 py-3 my-5 rounded-lg">
            <p className="mb-3 text-sm font-medium">PRICE RANGE</p>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
            />
            <p className="text-sm text-gray-700">Up to £{priceRange}</p>
          </div>

          {/* ✅ Clear All Filters */}
          <button
            onClick={clearFilters}
            className="w-full mt-3 py-2 text-sm text-teal-600 border border-teal-400 rounded-full hover:bg-teal-50 transition"
          >
            Clear All Filters
          </button>
        </div>
      </div>

      {/* ✅ Products Section */}
      <div className="flex-1">
        {/* Title & Sort */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          <div className="flex gap-3 items-center">
            <span className="text-gray-500 text-sm">{filterProducts.length} Products</span>
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="border border-gray-300 text-sm px-3 py-2 rounded-md"
            >
              <option value="relevant">Sort: Relevant</option>
              <option value="low-high">Sort: Price Low to High</option>
              <option value="high-low">Sort: Price High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filterProducts.length > 0 ? (
            filterProducts.map((item) => (
              <ProductItem
                key={item._id}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
                sale={item.sale}
              />
            ))
          ) : (
            <p className="col-span-4 text-center text-gray-600 mt-10">No products match your filters.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;