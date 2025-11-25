const ApiError = require("../utils/ApiError");

const errorMiddleware = (err, req, res, next) => {
  console.log(err);

  return res.status(err.statusCode || 500).json({
    statusCode: err.statusCode || 500,
    message: err.message || "Internal server Error,",
    errors: err.errors || [],
    data: err.data || null,
    success: false,
  });
};

const notFound = (req, res, next) => {
  const err = new ApiError(404, `Route ${req.originalUrl} not found`);
  next(err);
};
module.exports = { errorMiddleware, notFound };
