import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom'
interface NavbarProps {
  view: string,
  viewChange: (param1: string) => void
}
export default function Navbar(props: NavbarProps) {

  function toggleIcon(icon: string) {
    return props.view !== icon
      ? ''
      : 'hidden';
  }

  function handleShowList() {
    return props.viewChange('characterList');
  }

  function handleShowFavorites() {
    return props.viewChange('favoritesList');
  }

  return (
    <Container fluid className='bg-dark navbar-top'>
      <Row className='header-layout justify-content-end align-items-center'>
        <div className='text-start w-25'>
          <Link to='/'>
            <i onClick={handleShowList} className={`fa-solid fa-house-chimney house-icon text-light ${toggleIcon('characterList')}`}></i>
          </Link>
        </div>
        <div className='w-50 text-center '>
          <Link to='/'>
            <h1 onClick={handleShowList} className='d-inline text-light'>SmashMate</h1>
          </Link>
        </div>
        <div className='text-end w-25'>
          <Link to='/favorites'>
            <i onClick={handleShowFavorites} className={`fa-solid fa-heart heart-icon-list ${toggleIcon('favoritesList')}`}></i>
          </Link>
        </div>
      </Row>
    </Container>
  );
}
