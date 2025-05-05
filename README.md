# Arambam eCommerce 🛍️

**Arambam eCommerce** is a modern, responsive, and fully functional eCommerce web application built with React and Tailwind CSS. The platform allows users to browse products, manage shopping carts, and complete purchases through an intuitive interface. It is designed to support small to medium-sized clothing businesses.

---

## 🔧 Features

- 🖥️ Responsive frontend built using **React**, **Tailwind CSS**, and **Vite**
- 🛒 Cart management using React **Context API**
- 🧾 Product pages with size selection, description, and review sections
- 💳 Secure payment integration via **Stripe**
- 📱 Mobile-friendly layout
- 🔍 Search and filter product capabilities
- 📦 Admin features for managing products, orders, and analytics 
- 🎥 Embedded promotional video banner
- 🌐 Hosted images via **Cloudinary** 

---

## 📁 Project Structure

```bash
Arambam eCommerce/
├── frontend/               # React frontend source
│   ├── public/             # Static assets
│   ├── src/                # Application source code
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # Global state (ShopContext)
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # React entry point
│   ├── .env                # Environment variables
│   ├── tailwind.config.js  # Tailwind configuration
│   └── vite.config.js      # Vite config



cd Arambam\ eCommerce/frontend
npm install

npm run dev
