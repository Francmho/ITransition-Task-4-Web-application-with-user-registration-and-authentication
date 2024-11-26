// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Context } from './App'; // Import the Context provider
import { LoaderTargetPlugin } from 'webpack';

ReactDOM.render(<App/>, document.getElementById('root'));
