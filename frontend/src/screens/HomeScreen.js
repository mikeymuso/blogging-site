import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import CategoriesMenu from '../components/CategoriesMenu';

const HomeScreen = ({ posts, categories }) => {
  return (
    <Container className="p-0">
      <CategoriesMenu categories={categories} title={'FILTER BY CATEGORIES'} />

      <Row md={2}>
        {posts.map(post => (
          <LinkContainer key={post.title} to={`/posts/${post._id}`}>
            <Col>
              <Card className="my-3">
                <Card.Img variant="top" src={post.image} />
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
    </Container>
  );
};

export default HomeScreen;
