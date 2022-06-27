import React from 'react';
import RenderCards from '../components/render-cards';
import HomeProps from '../types/home-props'
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
