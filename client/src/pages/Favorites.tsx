import RenderCards from '../components/RenderCards';
import NoFavorites from '../components/NoFavorites';
import { useAppSelector } from '../app/hook';
import { selectFavorites } from '../features/favorites/favoritingSlice';
interface favoritesListProps {
  deleteFavorites: (param1: number) => void
}
export default function FavoritesList(props: favoritesListProps) {

  const favorites = useAppSelector(selectFavorites);

  if(favorites.length === 0) {
    return (
      <NoFavorites />
    )
  }
  return (
    <RenderCards
      deleteFavorites={props.deleteFavorites}
      />
  );
}
