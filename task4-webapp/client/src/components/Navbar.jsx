import React, { useState, useContext } from 'react';
import { Navbar, Nav, Button, Offcanvas } from 'react-bootstrap';
import { AppContext } from '../AppContext';  // Import the context to manage authentication state
import { Link } from 'react-router-dom';
import SignUp from './SignUp'; // Import your SignUp component

const CustomNavbar = () => {
  const { isLoggedIn, logOut } = useContext(AppContext); // Access login status and logOut function from AppContext
  const [showSignUp, setShowSignUp] = useState(false); // State to control Offcanvas visibility

  // Function to handle opening the Offcanvas
  const handleShow = () => setShowSignUp(true);
  // Function to handle closing the Offcanvas
  const handleClose = () => setShowSignUp(false);

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/">MyApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Show SignUp button only if not logged in */}
            {!isLoggedIn && (
              <Button variant="outline-primary" onClick={handleShow}>
                Sign Up
              </Button>
            )}
            {/* Show Log Out button if logged in */}
            {isLoggedIn && (
              <Button variant="outline-danger" onClick={logOut}>
                Log Out
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Offcanvas for SignUp */}
      <Offcanvas show={showSignUp} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Sign Up</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <SignUp /> {/* Your SignUp form component */}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default CustomNavbar;
