import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
export default function Navbar(props) {

  function toggleIcon(icon) {
    return props.view !== icon
      ? ''
      : 'hidden';
  }
  function handleViewChange() {
    props.viewChange('characterList');
  }

  return (
    <Container fluid className='bg-dark navbar-top'>
      <Row className='header-layout justify-content-end align-items-center'>
        <div className='text-start w-25'>
          <i onClick={handleViewChange} className={`fa-solid fa-house-chimney house-icon ${toggleIcon('characterList')}`}></i>
        </div>
        <div className='w-50 text-center'>
          <h1>smash ultimate fighter list</h1>
        </div>
        <div className='text-end w-25'>
          <i className={`fa-solid fa-heart heart-icon-list ${toggleIcon('characterDetails')}`}></i>
        </div>
      </Row>
    </Container>
  );
}
