const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/users-model.js");
const secrets = require("../api/secrets.js");

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const rounds = process.env.HASH_ROUNDS || 14;
  const hash = bcrypt.hashSync(user.password, rounds);
  user.password = hash;

  if (user.username != null && user.password != null) {
    Users.add(user)
      .then(saved => {
        res.status(201).json( {message: "User created successfully"});
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ errorMessage: error.message });
      });
  } else {
    res.status(500).json({ message: "error: please add valid user and password" });
  }
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;
  if (username != null && password != null) {
    Users.findBy({ username })
        .then(([user]) => {
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);
            res.status(200).json({ message: "Welcome!", token });
        } else {
            res.status(401).json({ message: "You cannot pass!" });
        }})
        .catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: error.message });
          });
   } else {
        res.status(500).json({ message: "invalid credentials" });
    }
});

function generateToken(user) {
  const payload = {
    userId: user.id,
    username: user.username,
    department: user.department
  };
  const secret = secrets.jwtSecret;
  const options = {
    expiresIn: "5m",
  };
  return jwt.sign(payload, secret, options);
}

module.exports = router;
