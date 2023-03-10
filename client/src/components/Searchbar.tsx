import { useEffect, useRef } from 'react';
import Overlay from './Overlay';
import './Searchbar.css';

interface SearchbarProps {
  changeSearchbar: (search: string) => void;
  searchbarValue: string;
  toggleSearchbar: () => void;
}

export default function Searchbar(props: SearchbarProps) {

  const inputRef: any = useRef<HTMLInputElement>(null);

  console.log(inputRef.current?.value);
  useEffect(() => {
    if(inputRef.current?.value === '') {
      inputRef.current.value = props.searchbarValue;
    }
    inputRef.current?.focus();
  }, []);

  function handleOnClick() {
    inputRef.current?.focus();
  }

  function handleChangeSearchbar(event: any) {
    props.changeSearchbar(event.target.value);
  }

  function handleKeydown(event: any) {
    if(event.key === 'Enter') {
      props.toggleSearchbar();
    }
  }


  return (
    <>
      <Overlay toggleSearchbar={props.toggleSearchbar} />
      <form className='searchbar d-flex justify-content-center mt-sm-2' data-testid='searchbar'>
        <input onClick={handleOnClick} onChange={handleChangeSearchbar} onKeyDown={handleKeydown}  ref={inputRef} type="text" placeholder='search' className='text-center' />
      </form>
    </>
  )
}
