import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Category',
  },
  dateCreated: {
    type: Date,
    required: true,
  },
  dateUpdated: {
    type: Date,
    required: true,
  },
  comments: [
    {
      author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
      comment: {
        type: String,
        required: true,
      },
      dateCreated: {
        type: Date,
        required: true,
      },
    },
  ],
  tags: [],
});

const Post = mongoose.model('Post', postSchema);

export default Post;
