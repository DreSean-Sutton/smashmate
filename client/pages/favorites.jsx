import React from 'react';
import RenderCards from '../components/render-cards';

export default function FavoritesList(props) {
  return (
    <RenderCards
      viewChange={props.viewChange}
      focusedFighter={props.focusedFighter}
      order={props.order}
      view={props.view}
      />
  );
}
