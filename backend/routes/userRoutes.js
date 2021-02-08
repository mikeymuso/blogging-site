import express from 'express';
const router = express.Router();
import asyncHandler from 'express-async-handler';
import User from '../models/userSchema.js';
import generateToken from '../utils/generateWebToken.js';
import validateToken from '../utils/validateWebToken.js';
import jwt from 'jsonwebtoken';

// @desc    Create new user
// @route   POST /api/users
// @access  Public
router.post('/create', async (req, res) => {
  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    dateCreated: Date.now(),
  });

  if (user) {
    res.status(200).send(user);
  } else {
    res.status(500).send('User could not be created');
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
router.get(
  '/profile',
  asyncHandler(async (req, res) => {
    const user = await validateToken(req, res);

    console.log(`JWT TOKEN: ${req.headers.cookie.split('=')[1]}`);
  })
);

// @desc    Fetch single user by Id
// @route   GET /api/users/:id
// @access  Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User could not be found');
    }
  })
);

// @desc    Check username exists
// @route   POST /api/users/check
// @access  Public
router.post(
  '/check',
  asyncHandler(async (req, res) => {
    const user = await User.find({ username: req.body.username });
    console.log(req.body.username);

    if (user.length === 0) {
      res.json({ userFound: false });
    } else {
      res.json({ userFound: true });
    }
  })
);

// @desc    Check stored user token & auth user
// @route   POST /api/users/login
// @access  Public
router.post(
  '/checktoken',
  asyncHandler(async (req, res) => {
    if (req.cookies.token) {
      const token = req.cookies.token;
      const data = await jwt.verify(token, process.env.TOKEN_SECRET);

      if (data) {
        const user = await User.findById(data.id);

        if (user) {
          res.json({
            id: user._id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id, user.isAdmin),
          });
        } else {
          res.send('User could not be found');
        }
      } else {
        res.json({ message: 'Token invalid' });
      }
    } else {
      res.json({ message: 'No token found' });
    }
  })
);

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      res.cookie('token', generateToken(user._id, user.isAdmin), {
        httpOnly: true,
      });
      res.json({
        id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id, user.isAdmin),
      });
    } else {
      res.status(401).send({ message: 'Invalid email or password' });
    }
  })
);

// @desc    Check stored user token & auth user
// @route   POST /api/users/login
// @access  Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    if (req.cookies.token) {
      const token = req.cookies.token;
      const data = await jwt.verify(token, process.env.TOKEN_SECRET);

      if (data) {
        const users = await User.find();

        if (users) {
          res.send(users);
        } else {
          res.status(500);
        }
      } else {
        res.json({ message: 'Token invalid' });
      }
    } else {
      res.json({ message: 'No token found' });
    }
  })
);

// @desc    Update user by ID
// @route   PUT /api/users/:id
// @access  Private
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    if (req.cookies.token) {
      const token = req.cookies.token;
      const data = await jwt.verify(token, process.env.TOKEN_SECRET);

      if (data) {
        const user = await User.updateOne(
          { _id: req.params.id },
          {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dateUpdate: Date.now(),
          }
        );

        if (user) {
          res.send(user);
        } else {
          res.status(500).send('User could not be updated');
        }
      } else {
        res.json({ message: 'Token invalid' });
      }
    } else {
      res.json({ message: 'No token found' });
    }
  })
);

// @desc    Delete user by ID
// @route   DELETE /api/users/:id
// @access  Public
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    if (req.cookies.token) {
      const token = req.cookies.token;
      const data = await jwt.verify(token, process.env.TOKEN_SECRET);

      if (data) {
        const user = await User.findById(req.params.id);

        if (user) {
          res.send(user);
        } else {
          res.status(500).send('User ID could not be found');
        }
      } else {
        res.json({ message: 'Token invalid' });
      }
    } else {
      res.json({ message: 'No token found' });
    }
  })
);

// @desc    Delete user token from cookies
// @route   GET /api/users/logout
// @access  Public
router.post(
  '/logout',
  asyncHandler(async (req, res) => {
    res.clearCookie('token', {
      httpOnly: true,
    });
    res.json({
      message: 'User logged out',
    });
  })
);

export default router;
