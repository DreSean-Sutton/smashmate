import RenderCards from '../components/RenderCards';

interface HomeProps {
  favorites: object[]
  addFavorites: (param1: object | undefined) => void
  deleteFavorites: (param1: number) => void
}
export default function Home(props: HomeProps) {
  return (
    <RenderCards
      favorites={props.favorites}
      addFavorites={props.addFavorites}
      deleteFavorites={props.deleteFavorites}
      />
  );
}
