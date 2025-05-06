import mongoose from 'mongoose';

/**
 * Connects to MongoDB using the MONGODB_URI environment variable.
 * Includes connection event listeners for robust debugging.
 */
const connectDB = async () => {
  const { MONGODB_URI } = process.env;

  if (!MONGODB_URI) {
    throw new Error('❌ MONGODB_URI is not defined in environment variables.');
  }

  try {
    // Connect to MongoDB database (e-commerce is the default DB name here)
    await mongoose.connect(`${MONGODB_URI}/e-commerce`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Connection success
    console.log('✅ MongoDB connection established.');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1); // Stop the server if DB connection fails
  }

  // Optional: log connection status (useful in dev)
  mongoose.connection.on('disconnected', () => {
    console.warn('⚠️ MongoDB connection lost.');
  });

  mongoose.connection.on('reconnected', () => {
    console.log('🔁 MongoDB reconnected.');
  });
};

export default connectDB;