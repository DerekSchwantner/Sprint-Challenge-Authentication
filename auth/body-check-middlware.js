//Middleware for checking req.body

module.exports = {
  validateBodyInfo
};

function validateBodyInfo(req, res, next) {
  const bodyInfo = req.body;
  console.log("time to validate the body info");
  if (!bodyInfo.username || !bodyInfo.password) {
    res.status(400).json({ message: "missing username or password" });
  } else {
    next();
  }
}
