const dotenv = require("dotenv").config();
const connectDB = require("./database/db");
const app = require("./app");

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Mongo DB connection failed !!! ${error}`);
  });
