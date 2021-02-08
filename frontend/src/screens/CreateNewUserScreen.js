import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import axios from 'axios';

const CreateNewUser = ({ history }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordValidation, setPasswordValidation] = useState('');
  const [passwordValid, setPasswordValid] = useState(true);
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    const checkPassword = setTimeout(() => {
      if (password !== passwordValidation) {
        setPasswordValid(false);
      } else {
        setPasswordValid(true);
      }
    }, 1000);

    return () => {
      clearTimeout(checkPassword);
    };
  }, [password, passwordValidation]);

  useEffect(() => {
    const checkUsername = async (req, res) => {
      const response = await axios.post('/api/users/check', { username });
      setUserExists(response.data.userFound);
    };

    checkUsername();
  }, [username]);

  const handleFormSubmit = async e => {
    e.preventDefault();

    try {
      const user = await axios.post('/api/users/create', {
        username,
        password,
        email,
        firstName,
        lastName,
      });

      if (user) {
        history.push('/login');
      }
    } catch {
      console.log('Account could not be created.');
    }
  };

  return (
    <FormContainer>
      <Form className="pt-3" onSubmit={handleFormSubmit}>
        <h1>Sign in</h1>
        <Form.Group>
          <Form.Check.Label>Username</Form.Check.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter a username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <Form.Text className="text-muted">
            Username must be 8 characters or more
          </Form.Text>
        </Form.Group>

        {userExists ? (
          <Row className="mt-3">
            <Col>
              <Message variant="danger" className="m-3">
                Username already exists
              </Message>
            </Col>
          </Row>
        ) : null}

        <Form.Group>
          <Form.Check.Label>Email</Form.Check.Label>
          <Form.Control
            required
            type="text"
            placeholder="email@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Check.Label>First Name</Form.Check.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Check.Label>Last Name</Form.Check.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Password"
            value={passwordValidation}
            onChange={e => setPasswordValidation(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create account
        </Button>
      </Form>

      {passwordValid ? null : (
        <Row className="mt-3">
          <Col>
            <Message variant="danger" className="m-3">
              Passwords do not match
            </Message>
          </Col>
        </Row>
      )}
    </FormContainer>
  );
};

export default CreateNewUser;
