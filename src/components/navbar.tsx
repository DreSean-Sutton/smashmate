import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
export default function Navbar(props: any) {

  function toggleIcon(icon: string) {
    return props.view !== icon
      ? ''
      : 'hidden';
  }

  function handleShowList() {
    props.viewChange('characterList');
  }

  function handleShowFavorites() {
    props.viewChange('favoritesList');
  }

  return (
    <Container fluid className='bg-dark navbar-top'>
      <Row className='header-layout justify-content-end align-items-center'>
        <div className='text-start w-25'>
          <i onClick={handleShowList} className={`fa-solid fa-house-chimney house-icon ${toggleIcon('characterList')}`}></i>
        </div>
        <div className='w-50 text-center'>
          <h1>SmashMate</h1>
        </div>
        <div className='text-end w-25'>
          <i onClick={handleShowFavorites} className={`fa-solid fa-heart heart-icon-list ${toggleIcon('favoritesList')}`}></i>
        </div>
      </Row>
    </Container>
  );
}
