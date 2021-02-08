import React from 'react';
import { Container, Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <Container className="my-5">
      <Spinner
        animation="border"
        role="status"
        style={{
          width: '100px',
          height: '100px',
          margin: 'auto',
          display: 'block',
        }}
      />
    </Container>
  );
};

export default Loader;
