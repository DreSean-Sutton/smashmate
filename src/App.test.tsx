import React,{ useState, useEffect } from 'react';
import { render, screen } from '@testing-library/react';
import App from './app'
import Home from './pages/home';
import HomeProps from './types/home-props';
import FighterDetails from './pages/fighter-details';
import FavoritesList from './pages/favorites';
import Navbar from './components/navbar';
import BackgroundCarousel from './components/background-carousel';
// const renderer = require('react-test-renderer');

test('renders learn react link', () => {
  console.log(Home);
  render(<App />);
  const linkElement = screen.getByText(/smashmate/i);
  expect(linkElement).toBeInTheDocument();
});

// it('correctly renders App', () => {
//   const tree = renderer.create(<App></App>).toJSON();
//   expect(tree).toMatchSnapshot();
// });

// it('renders correctly', () => {
//   // let root: HomeProps;
//   let utils: HomeProps = render(<Home
//     viewChange={}
//     focusedFighter={focusedFighter}
//     view={'characterList'}
//     favorites={favorites}
//     addFavorites={addFavorites}
//     deleteFavorites={deleteFavorites}
//     />);
//   expect(utils).toMatchSnapshot();
// });

// let testRenderer: any;
// // const testInstance: any = testRenderer.root;
// let root: any;
// testRenderer.act(() => {
//   root = testRenderer.create(<App />)
// });

// // make assertions on root
// expect(root.toJSON()).toMatchSnapshot();

// // update with some different props
// testRenderer.act(() => {
//   root.update(<App />);
// })

// // make assertions on root
// expect(root.toJSON()).toMatchSnapshot();
