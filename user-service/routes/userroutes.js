const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../module/user');
require('dotenv').config();
const { decrypt, encrypt } = require('../ecryptoUtils'); 
const router = express.Router();
let JWT_SECRET = "manishkumar682jaipursikarindia"


const authentication = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ error: 'Unauthorized' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

router.post('/register', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const emailHash = crypto.createHash('sha256').update(email).digest('hex');
    const existingUser = await User.findOne({ emailHash });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      emailHash,
      password: hashedPassword,
      role
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered', userId: newUser._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration error' });
  }
});



router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const emailHash = crypto.createHash('sha256').update(email).digest('hex');
    const user = await User.findOne({ emailHash });

    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    const encryptedUsername = encrypt(user.username);
    const encryptedEmail = encrypt(user.email);

    res.status(200).json({
      token,
      userData: {
        userid: user._id,
        username:encryptedUsername,
        email: encryptedEmail 
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed' });
  }
});


router.get('/profile', authentication, async (req, res) => {
  res.send(`Hello user with ID: ${req.user.id}`);
});
router.get('/userall', async (req, res) => {
  try {
    const users = await User.find();

    const decryptedUsers = users.map(user => ({
      id: user._id,
      username: decrypt(user.username),
      email: decrypt(user.email),
      role: user.role
    }));

    res.status(200).json({ users: decryptedUsers });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;

