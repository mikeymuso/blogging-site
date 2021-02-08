import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import axios from 'axios';

const LoginScreen = ({ setUser, history }) => {
  // TODO: If user exists already - redirect to homescreen

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginValid, setLoginValid] = useState(true);

  const handleFormSubmit = async e => {
    e.preventDefault();

    try {
      const user = await axios.post('/api/users/login', {
        username,
        password,
      });

      if (user) {
        setLoginValid(true);
        setUser(user.data);
        history.push('/');
      }
    } catch {
      setLoginValid(false);
    }
  };

  return (
    <FormContainer>
      <Form className="pt-3" onSubmit={handleFormSubmit}>
        <h1>Sign in</h1>
        <Form.Group controlId="formBasicEmail">
          <Form.Check.Label>Username</Form.Check.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <Form.Text className="text-muted">
            Username must be 8 characters or more
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      {loginValid ? null : (
        <Row className="mt-3">
          <Col>
            <Message variant="danger" className="m-3">
              Username or password incorrect
            </Message>
          </Col>
        </Row>
      )}
      <Row>
        <Col className="my-3">
          <Link to="createuser">Or create a new account</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
