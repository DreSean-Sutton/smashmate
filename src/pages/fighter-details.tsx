import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import MovesData from '../components/moves-data';
import ThrowsData from '../components/throws-data';
import MovementData from '../components/movement-data';
import StatsData from '../components/stats-data';

interface FighterDetailsProps {
  focusedFighter: FocusedFighterProps
};
interface FocusedFighterProps {
  fighter: string,
  fighterId: number,
  displayName: string,
  rosterId: number
};
export default function FighterDetails(props: FighterDetailsProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Container className='frame-data-backdrop pt-4 pb-4 fighter-details' data-view='characterDetails'>
        <Row className='justify-content-center'>
          <Col xs={8} md={6} xl={5} className='fighter-details-img mb-5 p-2 bg-light typical-box-shadow rounded' style={{ zIndex: '0' }}>
            <Image rounded={true} src={`./images/smash-ultimate-sprites/${props.focusedFighter.fighter}.png`} />
          </Col>
        </Row>
        <Col xs={6} md={4} className='m-auto typical'>
          <h2 className='text-center fs-2 mt-3 mb-3 p-2 bg-warning text-dark rounded'>Moves</h2>
        </Col>
        <Row xs={1} md={2} xl={3} className='rounded justify-content-center p-1'>
          <MovesData focusedFighter={props.focusedFighter} />
        </Row>
        <Col xs={6} md={4} className='m-auto typical'>
          <h2 className='text-center fs-2 mt-3 mb-3 p-2 bg-warning text-dark rounded'>Grabs/Throws</h2>
        </Col>
        <Row xs={1} md={2} xl={3} className='rounded justify-content-center p-1'>
          <ThrowsData focusedFighter={props.focusedFighter} />
        </Row>
        <Col xs={6} md={4} className='m-auto typical'>
          <h2 className='text-center fs-2 mt-3 mb-3 p-2 bg-warning text-dark rounded'>Dodges/Rolls</h2>
        </Col>
        <Row xs={1} md={2} xl={3} className='rounded justify-content-center p-1'>
          <MovementData focusedFighter={props.focusedFighter} />
        </Row>
        <Col xs={6} md={4} className='m-auto typical'>
          <h2 className='text-center fs-2 mt-3 mb-3 p-2 bg-warning text-dark rounded'>Stats</h2>
        </Col>
        <Row xs={2} xl={3} className='rounded justify-content-center p-1'>
          <StatsData focusedFighter={props.focusedFighter} />
        </Row>
      </Container>
    </>
  );
}
