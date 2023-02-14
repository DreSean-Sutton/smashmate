import React from 'react';
import { Container } from 'react-bootstrap';
import './Searchbar.css';

export default function Searchbar() {
  return (
    <form className='search-bar d-flex justify-content-center'>
      <input type="text" placeholder='search' className='text-center' />
    </form>
  )
}
