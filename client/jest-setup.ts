import '@testing-library/jest-dom';
import 'jest-extended/all'; // Needed for tests to recognize jest functions
import './src/util/matchMedia.mock';
import React from 'react';
global.React = React
const noop = () => { };
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });
