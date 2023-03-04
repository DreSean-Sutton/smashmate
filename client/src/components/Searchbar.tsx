import { useEffect, useRef } from 'react';
import Overlay from './Overlay';
import './Searchbar.css';

interface SearchbarProps {
  toggleSearchbar: () => void;
  changeSearchbar: (search: string) => void;
}

export default function Searchbar(props: SearchbarProps) {

  function handleChangeSearchbar(event: any) {
    props.changeSearchbar(event.target.value);
  }

  function handleKeydown(event: any) {
    if(event.key === 'Enter') {
      props.toggleSearchbar();
    }
  }

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <Overlay toggleSearchbar={props.toggleSearchbar} />
      <form className='searchbar d-flex justify-content-center mt-sm-2' data-testid='searchbar'>
        <input onChange={handleChangeSearchbar} onKeyDown={handleKeydown}  ref={inputRef} type="text" placeholder='search' className='text-center' />
      </form>
    </>
  )
}
