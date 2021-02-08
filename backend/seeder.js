import dotenv from 'dotenv';
import colors from 'colors';
import { sampleUsers } from './sampleData/users.js';
import { samplePosts } from './sampleData/posts.js';
import { sampleCategories } from './sampleData/categories.js';
import { sampleComments } from './sampleData/comments.js';

import { connectDB } from './config/db.js';

import Post from './models/postSchema.js';
import User from './models/userSchema.js';
import Category from './models/categorySchema.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Post.deleteMany();
    await User.deleteMany();
    await Category.deleteMany();

    const createdUsers = await User.insertMany(sampleUsers);
    const createdCategories = await Category.insertMany(sampleCategories);

    const adminUser = createdUsers[0]._id;
    const category = createdCategories[0]._id;

    const createdComments = sampleComments.map(comment => {
      return { ...comment, author: adminUser };
    });

    const createdPosts = samplePosts.map(post => {
      return {
        ...post,
        author: adminUser,
        category,
        comments: createdComments,
      };
    });

    await Post.insertMany(createdPosts);

    console.log('Data Imported succesfully.'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Post.deleteMany();
    await Comment.deleteMany();
    await User.deleteMany();
    await Category.deleteMany();

    console.log('Database cleared. '.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
