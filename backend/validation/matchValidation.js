const { body } = require("express-validator");
const ApiError = require("../utils/ApiError");
const { default: mongoose } = require("mongoose");

const matchValidation = [
  body("creator")
    .notEmpty()
    .withMessage("creator is required")
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new ApiError(400, "mongoId must be valid");
      }
      return true;
    }),
  body("location").trim().notEmpty().withMessage("Location is required"),
  body("pay")
    .notEmpty()
    .withMessage("pay is required")
    .isIn(["Loosers pay", "50-50", "70-30", "60-40"])
    .withMessage("Invalid pay option"),
  body("date").trim().notEmpty().withMessage("Date is required"),
  body("time").trim().notEmpty().withMessage("Time is required"),
  body("playerJoined")
    .optional({ checkFalsy: true })
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new ApiError(400, "mongoId must be valid");
      }
      return true;
    }),
];

module.exports = matchValidation;
