import RenderCards from '../components/render-cards';
import NoFavorites from '../components/no-favorites';

interface favoritesListProps {
  fighterArray: any[]
  favorites: object[]
  addFavorites: (param1: object | undefined) => void
  deleteFavorites: (param1: number) => void
}
export default function FavoritesList(props: favoritesListProps) {
  if(props.favorites) {
    return (
      <NoFavorites />
    )
  }
  return (
    <RenderCards
      fighterArray={props.fighterArray}
      favorites={props.favorites}
      addFavorites={props.addFavorites}
      deleteFavorites={props.deleteFavorites}
      />
  );
}
