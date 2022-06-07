/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDom from 'react-dom/client';
import App from './app';

const root =
ReactDom.createRoot(document.querySelector('#root') as HTMLElement);
root.render(<App />);
