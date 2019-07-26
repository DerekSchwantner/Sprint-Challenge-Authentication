const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("./helpers");

const { authenticate } = require("../auth/authenticate");
const { validateBodyInfo } = require("../auth/body-check-middlware");

module.exports = server => {
  server.post("/api/register", validateBodyInfo, register);
  server.post("/api/login", validateBodyInfo, login);
  server.get("/api/jokes", authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  let user = req.body;
  console.log(user);

  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
}

function login(req, res) {
  // implement user login
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        //produce a token
        const token = generateToken(user);
        console.log(token);

        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: "application/json" }
  };

  console.log("RO:", requestOptions);

  axios
    .get("https://icanhazdadjoke.com/search", requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}

function generateToken(user) {
  const jwtPayload = {
    subject: user.id,
    username: user.username
  };
  const jwtSecret = process.env.JWT_SECRET || "keep it secret";
  const jwtOptions = {
    expiresIn: "1d"
  };
  return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
}
