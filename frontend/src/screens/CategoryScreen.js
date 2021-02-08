import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Message';
import axios from 'axios';
import CategoriesMenu from '../components/CategoriesMenu';

const CategoryScreen = ({ match, categories }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    try {
      const getPosts = async () => {
        const { data } = await axios.get(`/api/categories/${match.params.id}`);
        setPosts(data);
      };

      getPosts();
    } catch (error) {
      console.log(`There was an error retrieving the posts: ${error}`);
    }
  }, [match]);

  return (
    <Container className="p-0">
      <CategoriesMenu categories={categories} title={'FILTER BY CATEGORIES'} />
      {posts.length !== 0 ? (
        <Row md={2}>
          {posts.map(post => (
            <LinkContainer key={post.title} to={`/posts/${post._id}`}>
              <Col>
                <Card className="my-3">
                  <Card.Img variant="top" src={`../${post.image}`} />
                  <Card.Body>
                    <Card.Title>
                      <h2>{post.title}</h2>
                    </Card.Title>
                    <Card.Text>
                      {`${post.content.split('').slice(0, 180).join('')}...`}
                    </Card.Text>
                    <Button variant="primary">Read more...</Button>
                  </Card.Body>
                </Card>
              </Col>
            </LinkContainer>
          ))}
        </Row>
      ) : (
        <Message>No posts here...</Message>
      )}
    </Container>
  );
};

export default CategoryScreen;
