import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';

export default function Loading(props: object) {
  return (
    <Container>
      <Row className='justify-content-center align-items-center spinner-layout'>
        <Spinner animation='border' role='status' variant='warning' />
        <span className='visually-hidden'>Loading...</span>
      </Row>
    </Container>
  );
}
