import express from 'express';
const router = express.Router();
import Post from '../models/postSchema.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

// @desc    Create new comment
// @route   POST /api/comments
// @access  Private
router.post(
  '/:id',
  asyncHandler(async (req, res) => {
    if (req.cookies.token) {
      const token = req.cookies.token;
      const data = await jwt.verify(token, process.env.TOKEN_SECRET);

      console.log(data);
      console.log(req.params.id);

      if (data) {
        const comment = await Post.findOneAndUpdate(
          { _id: req.params.id },
          {
            $push: {
              comments: {
                author: req.body.author,
                comment: req.body.comment,
                dateCreated: Date.now(),
              },
            },
          }
        );

        if (comment) {
          res.send(comment);
        } else {
          res.status(500).send({ message: 'Could not create comment' });
        }
      } else {
        res.status(403).send({ message: 'Token invalid' });
      }
    } else {
      res.status(403).send({ message: 'No token found' });
    }
  })
);

// @desc    Get comments by post ID
// @route   POST /api/comments/:id
// @access  Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const comments = await Post.findById(req.params.id);

    if (comments) {
      res.send({ comments });
    } else {
      res.status(500).send('Could not find comments');
    }
  })
);
export default router;
