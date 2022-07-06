import React from 'react';
import RenderCards from '../components/render-cards';

interface favoritesListProps {
  viewChange: (param1: string) => void
  focusedFighter: (param1: object) => void
  view: string
  favorites: object[]
  addFavorites: (param1: object | undefined) => void
  deleteFavorites: (param1: number) => void
}
export default function FavoritesList(props: favoritesListProps) {
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
