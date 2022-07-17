import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom'

export default function Navbar(props: any) {

  return (
    <Container fluid className='bg-dark navbar-top'>
      <Row className='header-layout justify-content-end align-items-center'>
        <div className='text-start w-25'>
          <Link to='/'>
            <i className={'fa-solid fa-house-chimney house-icon text-light'}></i>
          </Link>
        </div>
        <div className='w-50 text-center '>
          <Link to='/'>
            <h1 className='d-inline text-light'>SmashMate</h1>
          </Link>
        </div>
        <div className='text-end w-25'>
          <Link to='/favorites'>
            <i className={'fa-solid fa-heart heart-icon-list'}></i>
          </Link>
        </div>
      </Row>
    </Container>
  );
}
