import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
export default function Navbar(props) {
  function toggleIcon(icon) {
    return props.view === icon
      ? 'hidden'
      : '';
  }

  return (
    <Container fluid className='bg-dark navbar-top'>
      <Row className='header-layout justify-content-end'>
        <div className='w-50 text-center'>
          <h1>smash ultimate fighter list</h1>
        </div>
        <div className='text-end w-25'>
          <i className={`fa-solid fa-house-chimney house-icon ${toggleIcon('characterList')}`}></i>
          <i className={`fa-solid fa-heart heart-icon-list ${toggleIcon('favoriteList')}`}></i>
        </div>
      </Row>
    </Container>
  );
}
