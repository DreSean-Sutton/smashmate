import React from 'react';
import { render, screen } from '@testing-library/react';
import RenderCards from '../components/render-cards';
const reactTestRenderer = require('react-test-renderer');

// interface MyProps {
//   addFavorites: (param1: object) => void,
//   deleteFavorites: (param1: number) => void,
//   favorites: any[],
//   focusedFighter: (param1: object) => void,
//   view: string,
//   viewChange: (param1: string) => void
// }
// const renderer = reactTestRenderer.create(
//   <RenderCards
//     viewChange={props.viewChange}
//     focusedFighter={props.focusedFighter}
//     view={props.view}
//     favorites={props.favorites}
//     addFavorites={props.addFavorites}
//     deleteFavorites={props.deleteFavorites}
//     />
// );

// it ('sends a request to', () => {

// })
// it('noOneDigitNums', () => {
//   function noOneDigitNums(num: number) {
//     return num < 10
//       ? `0${num}`
//       : `${num}`;
//   }
//   expect(noOneDigitNums(5)).toEqual('05');
//   expect(noOneDigitNums(15)).toEqual('15');
// })
