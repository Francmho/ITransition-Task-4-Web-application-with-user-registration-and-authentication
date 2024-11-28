import React, { useState, useContext } from 'react';
import { AppContext } from './AppContext';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

const LogIn = () => {
  const { logIn } = useContext(AppContext); // Access the logIn function from AppContext
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add your login logic here (e.g., sending email and password to the backend)
    const userData = { email };  // Sample user data; replace with real login result
    const isLoginSuccessful = true;  // Replace with real logic

    if (isLoginSuccessful) {
      logIn(userData); // Update global authentication state via Context
      navigate('/admin'); // Redirect to Admin Page
    }
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
      <h1>Log In</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Log In
        </Button>
      </Form>
    </Container>
  );
};

export default LogIn;
