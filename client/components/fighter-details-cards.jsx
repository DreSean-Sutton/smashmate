import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import MovesData from './moves-data';
import ThrowsData from './throws-data';
import MovementData from './movement-data';
import StatsData from './stats-data';

export default function FighterDetailsCards(props) {

  return (
    <Container className='fighter-details'>
      <Row className='justify-content-center'>
      <Image rounded={true} className='bg-light w-50' src='./images/smash-ultimate-sprites/inkling.png' style={{ zIndex: '0' }}></Image>
      </Row>
      <Row>
        <MovesData id={props.id} />
        <ThrowsData id={props.id} />
        <MovementData id={props.id} />
        <StatsData id={props.id} />
      </Row>
    </Container>
  );
}
