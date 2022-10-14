import RenderCards from '../components/RenderCards';

interface HomeProps {
  deleteFavorites: (param1: number) => void
}
export default function Home(props: HomeProps) {
  return (
    <RenderCards
      deleteFavorites={props.deleteFavorites}
      />
  );
}
