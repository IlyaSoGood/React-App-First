import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';


// const elem = React.createElement('h2', {className: 'greetings'}, 'Hello World!');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App/>
);