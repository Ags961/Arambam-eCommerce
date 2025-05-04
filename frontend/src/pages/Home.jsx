import React from 'react';

// ✅ Import homepage sections
import Hero from '../components/Hero';
import LatestCollection from '../components/LatestCollection';
import BestSeller from '../components/BestSeller';
import OurPolicy from '../components/OurPolicy';
import NewsletterBox from '../components/NewsletterBox';
import VideoBanner from '../components/VideoBanner';
import NewInSection from '../components/NewInSection';

// ✅ Home Page - Combines all homepage components in visual order
const Home = () => {
  return (
    <div className="overflow-hidden">

      {/* 🎯 Top Hero Banner with animated slideshow */}
      <Hero />

      {/* 🆕 Latest Arrivals */}
      <LatestCollection />

      {/* 🛍️ New In Section - Highlights seasonal/featured items */}
      <NewInSection />

      {/* 🎥 Promotional Video Section with CTA */}
      <VideoBanner />

      {/* ⭐ Popular Picks - Horizontal scrollable bestsellers */}
      <BestSeller />

      {/* ✅ Company Highlights (Returns, Support, Policy Info) */}
      <OurPolicy />

      {/* 💌 Email Newsletter Form */}
      <NewsletterBox />

    </div>
  );
};

export default Home;