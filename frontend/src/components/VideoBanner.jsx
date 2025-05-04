import React from 'react';
import { useNavigate } from 'react-router-dom';
import videoFile from '../assets/clothing-brand-banner.mp4'; // ✅ Import background video asset

// ✅ VideoBanner Component - Full-width autoplay video banner with CTA button
const VideoBanner = () => {
  const navigate = useNavigate(); // React Router hook to navigate to the collection page

  return (
    <div className="relative w-full my-12 px-4">

      {/* ✅ Background Video (autoplaying, muted, looping) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-[500px] object-cover rounded-2xl shadow-xl border border-white/20"
      >
        <source src={videoFile} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* ✅ CTA Overlay Button (centered over video) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <button
          onClick={() => navigate('/collection')}
          className="text-white text-xl sm:text-3xl font-bold bg-black/50 px-6 py-3 rounded-full hover:bg-black/70 transition backdrop-blur-sm pointer-events-auto"
          aria-label="Shop the latest collection"
        >
          Shop the Collection →
        </button>
      </div>
    </div>
  );
};

export default VideoBanner;