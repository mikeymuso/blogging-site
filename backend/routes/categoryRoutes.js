import express from 'express';
const router = express.Router();
import Category from '../models/categorySchema.js';
import Post from '../models/postSchema.js';
import asyncHandler from 'express-async-handler';

// @desc    Fetch all categories
// @route   GET /api/categories
// @access  Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
  })
);

// @desc    Fetch posts by category id
// @route   GET /api/categories/:id
// @access  Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const posts = await Post.find({ category: req.params.id });

    if (posts) {
      res.json(posts);
    } else {
      res.status(404);
    }
  })
);

export default router;
