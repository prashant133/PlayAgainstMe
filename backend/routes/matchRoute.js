const express = require("express");
const matchValidation = require("../validation/matchValidation");
const validate = require("../middleware/validate");
const {
  createMatchController,
  getSingleMatchController,
  getAllMatchController,
  deleteMatchController,
  updateMatchController,
  joinMatchController,
  getAvailableMatchesController,
} = require("../controller/matchController");
const cleanBody = require("../middleware/cleanBody");

const router = express.Router();

router.post(
  "/create",
  cleanBody,
  matchValidation,
  validate,
  createMatchController
);
router.get("/available", getAvailableMatchesController);
router.get("/:id", getSingleMatchController);
router.get("/", getAllMatchController);
router.put("/update/:id",cleanBody, matchValidation, validate, updateMatchController);
router.delete("/delete/:id", deleteMatchController);

router.post("/join/:matchId", joinMatchController);

module.exports = router;
