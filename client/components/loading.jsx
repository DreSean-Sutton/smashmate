import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export default function Loading(props) {
  return (
    <Container>
      <Row className='justify-content-center align-items-center spinner-layout'>
        <Spinner animation='border' role='status' varient='danger' />
        <span className='visually-hidden'>Loading...</span>
      </Row>
    </Container>
  );
}
