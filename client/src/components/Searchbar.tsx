import Overlay from './Overlay';
import './Searchbar.css';

export default function Searchbar() {
  return (
    <>
      <Overlay />
      <form className='searchbar d-flex justify-content-center mt-sm-2'>
        <input type="text" placeholder='search' className='text-center' />
      </form>
    </>
  )
}
