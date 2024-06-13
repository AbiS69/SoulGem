import mongoose from 'mongoose';

const connectMongo = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error(
      'Add the MONGODB_URI environment variable inside .env.local to use mongoose'
    );
  }

  if (mongoose.connection.readyState >= 1) {
    // If mongoose connection is already established, use that connection
    console.log('Mongoose connection already established');
    return mongoose.connection;
  }

  return mongoose
    .connect(process.env.MONGODB_URI)
    .then((db) => {
      console.log('Mongoose connected successfully');
      return db;
    })
    .catch((e) => {
      console.error('Mongoose Client Error: ' + e.message);
    });
};

export default connectMongo;
