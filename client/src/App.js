import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LogIn from './LogIn'; // Import your LogIn component
import AdminPage from './AdminPage'; // Import your AdminPage component
import CustomNavbar from './Navbar'; // Import your Navbar component
import { CONFIG } from './config.js'; // Import your config

function App() {
  // State to manage whether the user is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // State to manage the players data
  const [players, setPlayers] = useState([]);

  // Fetch players data from API
  useEffect(() => {
    fetch(CONFIG.API_BASE_URL)
      .then((results) => results.json())
      .then((usersData) => setPlayers(usersData));
  }, []);

  return (
    <Router>
      <CustomNavbar isSignedUp={isLoggedIn} />
      <Routes>
        {/* LogIn as the main page (home) */}
        <Route
          path="/"
          element={
            !isLoggedIn ? <LogIn setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/admin" />
          }
        />
        
        {/* Protected Admin route */}
        <Route
          path="/admin"
          element={
            isLoggedIn ? (
              <AdminPage users={users} /> // Pass users data to AdminPage
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;



// import React, { Component } from 'react';
// import './App.css';
// import { CONFIG } from './config.js';

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//         players: []
//     };
//   }

//   componentDidMount() {
//     fetch(CONFIG.API_BASE_URL)
//         .then(results => results.json())
//         .then(players => this.setState({players: players}));
//   }

//   render() {
//     const players = this.state.players.map((player, index) => <li key={index}>{player.lastname} {player.firstname}</li>);

//     return (
//       <div>
//           <h1>Players list</h1>
//           <ul>
//             {players}
//           </ul>
//       </div>
//     );
//   }
// }

// export default App;