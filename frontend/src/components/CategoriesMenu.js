import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav } from 'react-bootstrap';

const CategoriesMenu = ({ categories, title }) => {
  return (
    <Container className="py-3">
      {title}
      <Nav>
        <Nav.Item>
          <Link to={`/`}>All</Link>
        </Nav.Item>
        {categories.map(category => (
          <Nav.Item key={category._id}>
            <Link to={`/category/${category._id}`}>{category.name}</Link>
          </Nav.Item>
        ))}
      </Nav>
    </Container>
  );
};

export default CategoriesMenu;
