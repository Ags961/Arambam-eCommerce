import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

/**
 * Schema for registered users in the system.
 */
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'User name is required'],
      trim: true,
    },

    email: {
      type: String,
      required: [true, 'User email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/.+\@.+\..+/, 'Please enter a valid email address'],
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
    },

    cartData: {
      type: Object,
      default: {}, // Empty object to store product IDs and quantities
    },
  },
  {
    minimize: false,     // Keep empty objects in DB (useful for cart)
    timestamps: true,    // Adds createdAt and updatedAt fields
    versionKey: false,   // Disables __v version field
  }
);

// ✅ Export the model or reuse existing one (important for hot-reload)
const User = models.User || model('User', UserSchema);
export default User;