import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Message from '../components/Message';

// TODO: Add rich text editor to content input
// TODO: Add image upload option

const NewPostForm = ({ categories, setDatabaseDidChange }) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState([]);

  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const onCancel = () => {};

  const onFormSubmit = async e => {
    e.preventDefault();

    const post = await axios.post('/api/posts', {
      title,
      subtitle,
      content,
      image: './images/javascript.jpg',
      category,
      tags,
    });

    if (post) {
      setMessage('Your post was saved and is now live!');
      setDatabaseDidChange(post);
      window.scrollTo(0, 0);
    } else {
      setMessage('Sorry, there was a problem creating your new post.');
      setError(true);
    }
  };

  return (
    <Container>
      <Link to="/profile/posts" className="btn btn-light mb-3 pl-3">
        Go Back
      </Link>

      <Form onSubmit={e => onFormSubmit(e)}>
        {message ? (
          <Message variant={error ? 'danger' : 'success'}>{message}</Message>
        ) : null}
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            required
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
            required
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
            required
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
            required
            as="select"
            custom
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="" disabled>
              Select a category...
            </option>
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
            disabled
            type="text"
            placeholder="This feature is in development..."
            value={tags}
            onChange={e => setTags(e.target.value)}
          />
          <Form.Text className="text-muted">
            Enter comma separated tags, i.e HTML, MongoDB, Jest.
          </Form.Text>
        </Form.Group>

        <Button variant="info" type="submit">
          Create Post
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
    </Container>
  );
};

export default NewPostForm;
