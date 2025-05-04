import { v2 as cloudinary } from 'cloudinary';

/**
 * Uploads an array of image files to Cloudinary.
 * @param {Array} files - Files to upload.
 * @returns {Promise<Array>} - Array of uploaded image URLs.
 */
const uploadToCloudinary = async (files) => {
  try {
    const uploads = await Promise.all(
      files.map(async (file) => {
        const res = await cloudinary.uploader.upload(file.path, {
          resource_type: 'image',
        });
        return res.secure_url;
      })
    );
    return uploads;
  } catch (err) {
    console.error("❌ Cloudinary Upload Error:", err.message);
    throw err;
  }
};

export default uploadToCloudinary;