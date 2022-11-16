import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from './app/store';
import App from './App';
import './main.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // React.StrictMode makes useEffect render twice per react render in dev mode, but not production mode
  <Router>
    <Provider store={setupStore()}>
      <App />
    </Provider>
  </Router>
);
