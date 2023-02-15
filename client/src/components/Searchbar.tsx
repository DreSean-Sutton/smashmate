import Overlay from './Overlay';
import './Searchbar.css';

interface SearchbarProps {
  toggleSearchbar: () => void;
}

export default function Searchbar(props: SearchbarProps) {
  return (
    <>
      <Overlay toggleSearchbar={props.toggleSearchbar} />
      <form className='searchbar d-flex justify-content-center mt-sm-2'>
        <input type="text" placeholder='search' className='text-center' />
      </form>
    </>
  )
}
