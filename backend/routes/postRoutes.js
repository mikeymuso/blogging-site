import express from 'express';
const router = express.Router();
import Post from '../models/postSchema.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

// @desc    Fetch all posts
// @route   GET /api/posts
// @access  Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const posts = await Post.find().populate('author', 'username');
    res.json(posts);
  })
);

// @desc    Fetch individual post
// @route   GET /api/posts/:id
// @access  Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    console.log(req.params.id);

    const post = await Post.findById(req.params.id)
      .populate('comments.author', 'username')
      .populate('author', 'username');

    if (post) {
      res.send(post);
    } else {
      res.status(404);
    }
  })
);

// @desc    Fetch all users' posts
// @route   GET /api/posts/profile/:id
// @access  Public
router.get(
  '/profile/:id',
  asyncHandler(async (req, res) => {
    const posts = await Post.find({ author: req.params.id });

    if (posts) {
      res.json(posts);
    } else {
      res.status(500).json({ message: 'No posts found' });
    }
  })
);

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
router.post(
  '/',
  asyncHandler(async (req, res) => {
    if (req.cookies.token) {
      const token = req.cookies.token;
      const data = await jwt.verify(token, process.env.TOKEN_SECRET);

      if (data) {
        const post = await Post.create({
          title: req.body.title,
          subtitle: req.body.subtitle,
          image: req.body.image,
          content: req.body.content,
          author: data.id,
          category: req.body.category,
          tags: req.body.tags,
          dateCreated: Date.now(),
          dateUpdated: Date.now(),
        });

        if (post) {
          res.send({ post });
        } else {
          res.status(500).send({ message: 'Could not create post' });
        }
      } else {
        res.status(403).send({ message: 'Token invalid' });
      }
    } else {
      res.status(403).send({ message: 'No token found' });
    }
  })
);

// @desc    Update individual post
// @route   POST /api/posts/:id
// @access  Private
router.post(
  '/:id',
  asyncHandler(async (req, res) => {
    console.log(req.body);

    if (req.cookies.token) {
      const token = req.cookies.token;
      const data = await jwt.verify(token, process.env.TOKEN_SECRET);

      if (data) {
        const post = await Post.updateOne(
          { _id: req.params.id },
          {
            title: req.body.title,
            subtitle: req.body.subtitle,
            content: req.body.content,
            category: req.body.category,
            tags: req.body.tags,
            dateUpdate: Date.now(),
          }
        );

        if (post) {
          res.json({ success: true });
        } else {
          res.status(500).json({ message: 'Could not update post' });
        }
      } else {
        res.json({ message: 'Token invalid' });
      }
    } else {
      res.json({ message: 'No token found' });
    }
  })
);

// @desc    Delete individual post
// @route   POST /api/posts/:id
// @access  Private
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    console.log(req.params.id);

    if (req.cookies.token) {
      const token = req.cookies.token;
      const data = await jwt.verify(token, process.env.TOKEN_SECRET);

      if (data) {
        const post = await Post.deleteOne({ _id: req.params.id });

        console.log(post);

        if (post) {
          res.json({ message: 'Post was deleted' });
        } else {
          res.status(500).json({ message: 'Could not delete post' });
        }
      } else {
        res.status(401).send('Token is invalid or expired');
      }
    } else {
      res.status(401).send('No valid token found');
    }
  })
);

export default router;
