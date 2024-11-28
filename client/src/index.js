import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App'; // Your main application component
// import { Context } from './AppContext'; // Import the Context provider

// // Rendering the App inside the Context provider
// ReactDOM.render(
//   <Context>
//     <App />
//   </Context>,
//   document.getElementById('root')
// );
