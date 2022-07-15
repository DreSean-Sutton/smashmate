import React from 'react';
import RenderCards from '../components/render-cards';

interface HomeProps {
  addFocusedFighter: (param1: object) => void
  favorites: object[]
  addFavorites: (param1: object | undefined) => void
  focusedFighter: {
    displayName: string
    fighter: string,
    fighterId: number,
    rosterId: number,
  }
  deleteFavorites: (param1: number) => void
}
export default function Home(props: HomeProps) {
  return (
    <RenderCards
      addFocusedFighter={props.addFocusedFighter}
      favorites={props.favorites}
      addFavorites={props.addFavorites}
      focusedFighter={props.focusedFighter}
      deleteFavorites={props.deleteFavorites}
      />
  );
}
