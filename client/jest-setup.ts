import '@testing-library/jest-dom';
import 'jest-extended/all'; // Needed for tests to recognize jest functions
import './src/util/matchMedia.mock';
import React from 'react';
import { useParams } from 'react-router-dom';
global.React = React
const noop = () => { };
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });

// Mock useParams() behavior
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Preserve the actual behavior of other functions
  useParams: jest.fn(),
}));

useParams.mockReturnValue({ fighter: 'bayonetta' });
