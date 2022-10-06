import RenderCards from '../components/render-cards';

interface favoritesListProps {
  fighterArray: any[]
  favorites: object[]
  addFavorites: (param1: object | undefined) => void
  deleteFavorites: (param1: number) => void
}
export default function FavoritesList(props: favoritesListProps) {
  // if(props.favorites.length === 0) {
  //   return(
  //     <h1>This worked! 😲</h1>
  //   )
  // }
  return (
    <RenderCards
      fighterArray={props.fighterArray}
      favorites={props.favorites}
      addFavorites={props.addFavorites}
      deleteFavorites={props.deleteFavorites}
      />
  );
}
