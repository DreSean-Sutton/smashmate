import RenderCards from '../components/RenderCards';
import NoFavorites from '../components/NoFavorites';

interface favoritesListProps {
  favorites: object[]
  addFavorites: (param1: object | undefined) => void
  deleteFavorites: (param1: number) => void
}
export default function FavoritesList(props: favoritesListProps) {
  if(props.favorites.length === 0) {
    return (
      <NoFavorites />
    )
  }
  return (
    <RenderCards
      favorites={props.favorites}
      addFavorites={props.addFavorites}
      deleteFavorites={props.deleteFavorites}
      />
  );
}
