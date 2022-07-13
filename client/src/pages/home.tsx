import React from 'react';
import RenderCards from '../components/render-cards';

interface HomeProps {
  viewChange: (param1: string) => void
  addFocusedFighter: (param1: object) => void
  view: string
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
      viewChange={props.viewChange}
      addFocusedFighter={props.addFocusedFighter}
      view={props.view}
      favorites={props.favorites}
      addFavorites={props.addFavorites}
      focusedFighter={props.focusedFighter}
      deleteFavorites={props.deleteFavorites}
      />
  );
}
