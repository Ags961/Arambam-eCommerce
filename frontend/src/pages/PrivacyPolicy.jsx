import React from 'react';

// ✅ Privacy Policy Page - Explains how user data is handled at Arambam
const PrivacyPolicy = () => {
  return (
    <div className="p-10 max-w-3xl mx-auto text-white">
      
      {/* ✅ Page Heading */}
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      {/* ✅ Introduction */}
      <p className="mb-4 text-white/80">
        At Arambam, your privacy is one of our highest priorities. We are fully committed to keeping your personal information secure, private, and protected at all times.
        This Privacy Policy explains how we collect, use, and safeguard your data when you interact with our website.
      </p>

      {/* ✅ What We Collect */}
      <h2 className="text-xl font-semibold mt-8 mb-2 text-teal-300">1. Information We Collect</h2>
      <ul className="list-disc pl-5 text-white/70 space-y-2">
        <li>Name, contact details, and shipping information when placing an order</li>
        <li>Payment information (processed securely and never stored by us)</li>
        <li>Browsing behavior and product interests to enhance your experience</li>
        <li>Voluntary information provided through customer support or forms</li>
      </ul>

      {/* ✅ How We Use It */}
      <h2 className="text-xl font-semibold mt-8 mb-2 text-teal-300">2. How We Use Your Data</h2>
      <ul className="list-disc pl-5 text-white/70 space-y-2">
        <li>To process and fulfill your orders</li>
        <li>To send order updates and respond to inquiries</li>
        <li>To personalize your shopping experience</li>
        <li>To improve our products and website</li>
        <li>To comply with legal obligations</li>
      </ul>

      {/* ✅ Data Sharing */}
      <h2 className="text-xl font-semibold mt-8 mb-2 text-teal-300">3. Data Sharing</h2>
      <p className="text-white/70 mb-4">
        We do <span className="text-teal-400 font-semibold">not</span> sell or rent your personal data. Information is only shared with trusted partners necessary to complete your transactions, such as payment processors and delivery couriers — and always under strict confidentiality agreements.
      </p>

      {/* ✅ Your Rights */}
      <h2 className="text-xl font-semibold mt-8 mb-2 text-teal-300">4. Your Rights</h2>
      <ul className="list-disc pl-5 text-white/70 space-y-2">
        <li>You can access or correct your data at any time</li>
        <li>You can request deletion of your data</li>
        <li>You may opt out of marketing communications</li>
        <li>We honor your rights under the UK GDPR and Data Protection Act 2018</li>
      </ul>

      {/* ✅ Contact Info */}
      <h2 className="text-xl font-semibold mt-8 mb-2 text-teal-300">5. Contact Us</h2>
      <p className="text-white/70">
        If you have questions about this policy or would like to exercise your data rights, please contact us at: <br />
        <a href="mailto:aarambam.ltd@gmail.com" className="underline hover:text-teal-200">
          aarambam.ltd@gmail.com
        </a>
      </p>
    </div>
  );
};

export default PrivacyPolicy;