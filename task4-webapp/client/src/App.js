import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LogIn from './components/LogIn';
import AdminPage from './components/AdminPage';
import CustomNavbar from './components/Navbar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <CustomNavbar isSignedUp={isLoggedIn} />
      <Routes>
        {/* LogIn as the main page (home) */}
        <Route
          path="/"
          element={!isLoggedIn ? <LogIn setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/admin" />}
        />
        {/* Protected Admin route */}
        <Route
          path="/admin"
          element={isLoggedIn ? <AdminPage /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
