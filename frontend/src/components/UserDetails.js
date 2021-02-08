import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Message from '../components/Message';

const UserDetails = ({ user, setDatabaseDidChange }) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [message, setMessage] = useState(null);

  const onFormSubmit = async e => {
    e.preventDefault();
    const updatedUser = await axios.put(`/api/users/${user.id}`, {
      firstName,
      lastName,
    });

    if (updatedUser) {
      setMessage('User details updated');
      setDatabaseDidChange(updatedUser);
    } else {
      setMessage('There was a problem updating your details');
    }
  };

  return (
    <Container>
      {message ? <Message>{message}</Message> : null}
      <Form onSubmit={e => onFormSubmit(e)}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            disabled
            type="text"
            placeholder="Change username"
            value={username}
          />
          <Form.Text className="text-muted">
            Username can not be changed
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            disabled
            type="text"
            placeholder="Change username"
            value={email}
          />
          <Form.Text className="text-muted">Email can not be changed</Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>First name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Change First Name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Change Last Name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </Form.Group>
        <Button variant="info" type="submit">
          Update details
        </Button>
      </Form>
    </Container>
  );
};

export default UserDetails;
