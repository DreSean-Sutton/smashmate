import React from 'react';
import RenderCards from '../components/render-cards';

interface favoritesListProps {
  addFocusedFighter: (param1: object) => void
  fighterArray: any[]
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
export default function FavoritesList(props: favoritesListProps) {
  return (
    <RenderCards
      addFocusedFighter={props.addFocusedFighter}
      fighterArray={props.fighterArray}
      favorites={props.favorites}
      addFavorites={props.addFavorites}
      focusedFighter={props.focusedFighter}
      deleteFavorites={props.deleteFavorites}
      />
  );
}
