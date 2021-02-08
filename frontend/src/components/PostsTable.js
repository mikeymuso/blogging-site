import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import CustomModal from './CustomModal';
import axios from 'axios';

const PostsTable = ({ posts, history, categories }) => {
  const [showModal, setShowModal] = useState(false);
  const [deletePost, setDeletePost] = useState({});

  const dateFormatter = dateString => {
    const date = new Date(dateString);

    const daysMonthYear = date.toLocaleDateString('en-GB');
    const time = date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });

    return `${daysMonthYear}, ${time}`;
  };

  const handleEditPost = post => {
    console.log('edit post ID', post);
    history.push(`/profile/post/edit?id=${post._id}`);
  };

  const handleDeletePost = post => {
    setDeletePost(post);
    setShowModal(true);
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  const handleDeleteConfirm = async () => {
    setShowModal(false);
    const data = await axios.delete(`/api/posts/${deletePost._id}`);

    window.location.reload();
    console.log(data);
  };

  return (
    <>
      <h2>Blog Posts</h2>
      <Table striped bordered hover variant="dark" responsive="md" size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Content</th>
            <th>Category</th>
            <th>Created</th>
            <th>Updated</th>
            <th>Likes</th>
            <th>Comments</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {posts.length === 0 ? (
            <tr>
              <td></td>
              <td colSpan="8">No posts</td>
            </tr>
          ) : (
            posts.map((post, index) => (
              <tr key={post._id}>
                <td>{index + 1}</td>
                <td>{post.title}</td>
                <td>{`${post.content.split('').slice(0, 30).join('')}...`}</td>
                <td>
                  {
                    categories.find(category => category._id === post.category)
                      .name
                  }
                </td>
                <td>{dateFormatter(post.dateCreated)}</td>
                <td>{dateFormatter(post.dateUpdated)}</td>
                <td>0</td>
                <td>{post.comments.length}</td>
                <td
                  className="cell-centered edit-icon"
                  onClick={() => handleEditPost(post)}
                  style={{ cursor: 'pointer' }}
                >
                  <i className="far fa-edit" />
                </td>
                <td
                  className="cell-centered delete-icon"
                  onClick={() => handleDeletePost(post)}
                  style={{ cursor: 'pointer' }}
                >
                  <i className="fas fa-trash-alt " />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <CustomModal
        show={showModal}
        handleClose={handleModalCancel}
        handleDeleteConfirm={handleDeleteConfirm}
        title="Delete Post"
        content="Are you sure you want to delete this post? This can not be undone."
      />
    </>
  );
};

export default PostsTable;
