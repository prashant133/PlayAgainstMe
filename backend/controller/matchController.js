const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const Match = require("../model/matchModel");

// create a match
const createMatchController = asyncHandler(async (req, res) => {
  const { location, pay, date, time, playerJoined } = req.body;
  const creator = req.user?._id;
  if (!creator) {
    throw new ApiError(401, "User not logged in");
  }
  const match = await Match.create({
    creator,
    location,
    pay,
    date,
    time,
    playerJoined,
  });

  res
    .status(200)
    .json(new ApiResponse(200, match, "match created successfully"));
});

// get single match

const getSingleMatchController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const match = await Match.findById({ _id: id })
    .populate("creator", "name email profilePic")
    .populate("playerJoined", "name email profilePic");

  if (!match) {
    throw new ApiError(404, "Match not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, match, "Match fetched successfully"));
});

// get all the match
const getAllMatchController = asyncHandler(async (req, res) => {
  const matches = await Match.find()
    .populate("creator", "name email profilePic")
    .populate("playerJoined", "name email profilePic");

  if (!matches) {
    throw new ApiError(404, "Match not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, matches, "Matches fetched successfully"));
});

// delete a match
const deleteMatchController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const match = await Match.findByIdAndDelete({ _id: id });

  if (!match) {
    throw new ApiError(404, "Match not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, match, "Match deleted successfully"));
});

// update a match
const updateMatchController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const updateMatch = await Match.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  if (!updateMatch) {
    throw new ApiError(404, "Match not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, updateMatch, "Match updated successfully"));
});

// join a match
const joinMatchController = asyncHandler(async (req, res) => {
  const { matchId } = req.params;
  const playerId = req.user._id;

  const match = await Match.findById(matchId);

  if (!match) {
    throw new ApiError(404, "Match not found");
  }

  //   prevent creator to join the match
  if (match.creator.toString() === playerId.toString()) {
    throw new ApiError(400, "Creator can not join the match");
  }

  //   checck if aleredy joined
  if (match.playerJoined) {
    throw new ApiError(400, "player has already joined the match");
  }

  //   assign player
  match.playerJoined = playerId;
  await match.save();

  return res
    .status(200)
    .json(new ApiResponse(200, match, "Player joined match successfully"));
});

// get availabe matches only
const getAvailableMatchesController = asyncHandler(async (req, res) => {
  const matches = await Match.find({ playerJoined: null }).populate(
    "creator",
    "name email"
  );

  return res
    .status(200)
    .json(new ApiResponse(200, matches, "Available matches fetched"));
});

const getUserMatchesController = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, "User not logged in");
  }

  // Matches the user created
  const createdMatchesPromise = Match.find({ creator: userId })
    .populate("creator", "name email profilePic")
    .populate("playerJoined", "name email profilePic");

  // Matches the user joined
  const joinedMatchesPromise = Match.find({ playerJoined: userId })
    .populate("creator", "name email profilePic")
    .populate("playerJoined", "name email profilePic");

  const [createdMatches, joinedMatches] = await Promise.all([
    createdMatchesPromise,
    joinedMatchesPromise,
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        createdMatches,
        joinedMatches,
      },
      "User matches fetched successfully"
    )
  );
});




module.exports = {
  createMatchController,
  getSingleMatchController,
  getAllMatchController,
  deleteMatchController,
  updateMatchController,
  joinMatchController,
  getAvailableMatchesController,
  getUserMatchesController,
};
