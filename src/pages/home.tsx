import React from 'react';
import RenderCards from '../components/render-cards';

interface HomeProps {
  viewChange: (param1: string) => void
  focusedFighter: (param1: object) => void
  view: string
  favorites: object[]
  addFavorites: (param1: object | undefined) => void
  deleteFavorites: (param1: number) => void
}
export default function Home(props: HomeProps) {
  return (
    <RenderCards
      viewChange={props.viewChange}
      focusedFighter={props.focusedFighter}
      view={props.view}
      favorites={props.favorites}
      addFavorites={props.addFavorites}
      deleteFavorites={props.deleteFavorites}
      />
  );
}
