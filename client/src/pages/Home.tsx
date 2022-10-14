import RenderCards from '../components/RenderCards';

interface HomeProps {
  addFavorites: (param1: object | undefined) => void
  deleteFavorites: (param1: number) => void
}
export default function Home(props: HomeProps) {
  return (
    <RenderCards
      addFavorites={props.addFavorites}
      deleteFavorites={props.deleteFavorites}
      />
  );
}
