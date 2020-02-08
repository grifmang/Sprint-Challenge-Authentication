const router = require('express').Router();
const bc = require('bcrypt');
const auth = require('./authModel.js');
const jwt = require('jsonwebtoken');
const authenticate = require('./authenticate-middleware.js');
const { jwtSecret } = require('../api/config/secrets.js');

router.post('/register', (req, res) => {
  // implement registration
  if (req.body && req.body.username && req.body.password) {
    let user = req.body;
    const hash = bc.hashSync(user.password, 8);
    user.password = hash;

    auth.add(user)
    .then(response => {
      const token = signToken(user);
      return res.status(201).json({
        message: `${response.username} registered.`,
        token: token
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ error: "User was not registered." })
    })

  } else {
    return res.status(400).json({ error: "You need a username and password to register." })
  }

});

router.post('/login', (req, res) => {
  // implement login
  if (req.body && req.body.username && req.body.password) {
    let { username, password } = req.body;

    auth.findBy({ username }).first()
    .then(user => {
      if (user && bc.compareSync(password, user.password)) {
        const token = signToken(user);
        return res.status(201).json({
          message: `${user.username} was logged in.`,
          token: token
        })
      } else {
        return res.status(401).json({ error: "Invalid credentials." })
      }
    })
    .catch(err => {
      console.log(err);
      return res.status(400).json({ error: "User was not logged in." })
    })
  } else {
    return res.status(400).json({ error: "Username and password required to log in." })
  }
});

function signToken(user) {
  const payload = {
    userId: user.id,
    username: user.username
  }

  const options = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
