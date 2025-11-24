const asyncHandler = (fn) => {
  return function (req, res, next) {
    // ensure any returened promise rejection is passed to next()
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = asyncHandler;
