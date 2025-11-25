const cleanBody = (req, res, next) => {
  for (let key in req.body) {
    if (req.body[key] === "" || req.body[key] === null) {
      req.body[key] = null; // set empty to null
    }
  }
  next();
};

module.exports = cleanBody;
