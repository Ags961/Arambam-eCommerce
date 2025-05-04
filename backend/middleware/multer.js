import multer from 'multer';
import path from 'path';

/**
 * Generates a unique file name with original base name and timestamp.
 */
const generateUniqueFilename = (originalname) => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1e6);
  const ext = path.extname(originalname);
  const name = path.basename(originalname, ext);
  return `${name}-${timestamp}-${random}${ext}`;
};

/**
 * Storage strategy: saves files in /uploads with unique names.
 */
const fileStorage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads/');
  },
  filename: (_, file, cb) => {
    cb(null, generateUniqueFilename(file.originalname));
  },
});

/**
 * Validates acceptable MIME types for images.
 */
const validateImage = (_, file, cb) => {
  const isImage = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.mimetype);
  cb(isImage ? null : new Error('Unsupported file type.'), isImage);
};

/**
 * Multer middleware: handles image upload with 5MB size limit.
 */
const upload = multer({
  storage: fileStorage,
  fileFilter: validateImage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max 5MB
});

export default upload;