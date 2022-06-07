import React from 'react';
import RenderCards from '../components/render-cards';

export default function FavoritesList(props:any) {
  return (
    <RenderCards
      viewChange={props.viewChange}
      focusedFighter={props.focusedFighter}
      order={props.order}
      view={props.view}
      favorites={props.favorites}
      addFavorites={props.addFavorites}
      deleteFavorites={props.deleteFavorites}
      />
  );
}
