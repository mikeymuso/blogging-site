import React, { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import Message from '../components/Message';

// TODO: Add rich text editor to content input
// TODO: Add image upload option

const EditPostForm = ({
  location,
  categories,
  history,
  setDatabaseDidChange,
}) => {
  const postId = location.search ? location.search.split('=')[1] : null;

  if (!postId) {
    history.push('/profile');
  }

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState([]);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    setLoading(true);

    try {
      const getPost = async () => {
        const { data } = await axios.get(`/api/posts/${postId}`);

        setTitle(data.title);
        setSubtitle(data.subtitle);
        setContent(data.content);
        setCategory(data.category);
        setTags([...data.tags]);
        setLoading(false);
      };

      getPost();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [location, postId]);

  const onCancel = () => {
    history.push('/profile');
  };

  const onFormSubmit = async e => {
    e.preventDefault();

    try {
      const updatedPost = await axios.post(
        `/api/posts/${postId}`,
        {
          title,
          subtitle,
          content,
          category,
          tags,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (updatedPost) {
        setErrorMessage(false);
        setDatabaseDidChange(updatedPost);
        history.push('/profile');
      }
    } catch {
      setErrorMessage(true);
    }
  };

  return (
    <Container>
      <Link to="/profile/posts" className="btn btn-light mb-3 pl-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : (
        <Form onSubmit={e => onFormSubmit(e)}>
          {errorMessage ? (
            <Message variant="info">
              There was an issue updating the post.
            </Message>
          ) : null}
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <Form.Text className="text-muted">
              Something catchy and interesting!
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Subtitle</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter subtitle"
              value={subtitle}
              onChange={e => setSubtitle(e.target.value)}
            />
            <Form.Text className="text-muted">
              Add a brief description about your blog
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={20}
              placeholder="Enter content"
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              custom
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Tags</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter tags"
              value={tags}
              onChange={e => setTags(e.target.value)}
            />
            <Form.Text className="text-muted">
              Enter comma separated tags, i.e HTML, MongoDB, Jest.
            </Form.Text>
          </Form.Group>

          <Button variant="info" type="submit">
            Update Post
          </Button>
          <Button
            variant="warning"
            type="button"
            className="ml-2"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default EditPostForm;
