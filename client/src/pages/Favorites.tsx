import RenderCards from '../components/RenderCards';
import NoFavorites from '../components/NoFavorites';
import { useAppSelector } from '../app/hook';
import { selectFavorites } from '../features/favorites/favoritingSlice';

export default function FavoritesList() {

  const favorites = useAppSelector(selectFavorites);

  if(favorites.length === 0) {
    return (
      <NoFavorites />
    )
  }
  return (
    <RenderCards />
  );
}
