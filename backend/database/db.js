const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `\n MongoDB connected! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error(`Mongo DB connection Error: ${error.message}`);
    // Exit if the connection is not successful
    process.exit(1);
  }
};

module.exports = connectDB ;
