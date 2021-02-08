import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav } from 'react-bootstrap';

const ProfileMenu = ({ options, title, style }) => {
  return (
    <Container className="py-3" style={style}>
      {title}
      <Nav>
        {options.map(option => (
          <Nav.Item key={option.link}>
            <Link to={`/profile/${option.link}`}>{option.title}</Link>
          </Nav.Item>
        ))}
      </Nav>
    </Container>
  );
};

export default ProfileMenu;
