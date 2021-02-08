import React, { useEffect, useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import axios from 'axios';
import CategoriesMenu from '../components/CategoriesMenu';

const PostScreen = ({ match, categories, user, setPostWasUpdated }) => {
  const [post, setPost] = useState({});
  const [comment, setComment] = useState('');

  const dateFormatter = dateString => {
    const date = new Date(dateString);

    const daysMonthYear = date.toLocaleDateString('en-GB');
    const time = date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });

    return `${daysMonthYear}, ${time}`;
  };

  useEffect(() => {
    try {
      const getPosts = async () => {
        const { data } = await axios.get(`/api/posts/${match.params.id}`);
        setPost(data);
      };
      getPosts();
    } catch (error) {
      console.log(`There was an error retrieving the posts: ${error}`);
    }
  }, [match]);

  const handleSubmit = async e => {
    e.preventDefault();

    const newComment = await axios.post(`/api/comments/${match.params.id}`, {
      comment,
      author: user.id,
    });

    if (newComment) {
      setPostWasUpdated(comment);
      console.log(comment);
    }
  };

  return (
    <Container className="p-0">
      <CategoriesMenu categories={categories} title={'FILTER BY CATEGORIES'} />

      <Link to="/" className="btn btn-light mb-3 pl-3">
        Go Back
      </Link>
      <Card style={{ width: '90%', margin: 'auto' }}>
        <Card.Header className="p-3">
          <h1 className="m-0">{post.title}</h1>
        </Card.Header>
        {post.image ? (
          <Card.Img
            variant="top"
            src={post.image ? `../${post.image}` : <Loader />}
          />
        ) : (
          <Loader />
        )}

        <Card.Body>
          <Card.Title>
            <h3>{post.subtitle}</h3>
          </Card.Title>
          <Card.Text>{post.content}</Card.Text>
        </Card.Body>
      </Card>

      <Card style={{ width: '90%', margin: 'auto' }} className="mt-3">
        <Card.Header className="pb-0">
          <h3>Comments</h3>
        </Card.Header>

        <Card.Body className="pb-0">
          <Form onSubmit={e => handleSubmit(e)}>
            <Form.Group>
              <Form.Label>Add a new comment</Form.Label>
              <Form.Control
                disabled={!user.id}
                required
                type="textarea"
                placeholder={
                  user.id ? 'Enter comment' : 'Login to leave a comment'
                }
                value={comment}
                onChange={e => setComment(e.target.value)}
              />
              <Form.Text className="text-muted">
                Something catchy and interesting!
              </Form.Text>
            </Form.Group>
            <Button variant="info" type="submit" disabled={!user.id}>
              Add comment
            </Button>
          </Form>
        </Card.Body>

        <Card.Body>
          {post.comments &&
            post.comments.reverse().map((comment, index) => (
              <Card key={index} className="mt-1">
                <Card.Body className="p-3">
                  <Card.Title className="mb-0">
                    {comment.author.username}
                  </Card.Title>
                  <Card.Text>{comment.comment}</Card.Text>
                  <Card.Text className="text-muted text-right">
                    {dateFormatter(new Date(comment.dateCreated))}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PostScreen;
