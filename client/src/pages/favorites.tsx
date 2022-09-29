import RenderCards from '../components/render-cards';

interface favoritesListProps {
  fighterArray: any[]
  favorites: object[]
  addFavorites: (param1: object | undefined) => void
  deleteFavorites: (param1: number) => void
}
export default function FavoritesList(props: favoritesListProps) {
  return (
    <RenderCards
      fighterArray={props.fighterArray}
      favorites={props.favorites}
      addFavorites={props.addFavorites}
      deleteFavorites={props.deleteFavorites}
      />
  );
}
