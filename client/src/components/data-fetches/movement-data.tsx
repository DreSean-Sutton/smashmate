import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Loading from '../loading';
import FetchDataFail from './fetch-data-fail';
import axios from 'axios';
import showHideData from '../../util/show-hide-data';
import './data-fetch.css';

interface MovementDataProps {
  currentFighter: string
}

export default function MovementData(props: MovementDataProps) {
  const [movements, setMovements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchFailed, setFetchFailed] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const controller = new AbortController();
    async function fetchDetailsData(currentFighter: string) {
      setIsLoading(true)
      const { status, data } = await axios.get(`https://the-ultimate-api.herokuapp.com/api/fighters/data/movements?fighter=${currentFighter}`, {
        signal: controller.signal,
        validateStatus: () => true
      });
      if (status !== 200) return setFetchFailed(true);
      setIsLoading(false);
      setMovements(data);
    }
    fetchDetailsData(props.currentFighter)
    return () => controller.abort();
  }, [props.currentFighter]);

  function handleShowHideData() {
    showHideData('movements');
  }

  if (isLoading) {
    return (
      <Loading />
    );
  }
  if (fetchFailed) {
    return (
      <FetchDataFail data={'Dodges/Rolls'} />
    );
  } else {

    const renderMovements = (movement: any) => {
      return (
        <React.Fragment key={movement.movementId}>
          <Col className='p-3'>
            <Card className='p-2 bg-light text-dark typical-box-shadow text-capitalize'>
              <Card.Title className='text-center fw-bold'>{movement.name}</Card.Title>
              <p className='mb-0 pt-1 border-top'>Active Frames: {movement.activeFrames}</p>
              <p className='mb-0 pt-1 border-top'>Total Frames: {movement.totalFrames}</p>
            </Card>
          </Col>
        </React.Fragment>
      );
    }
    const allMovements = movements.map(renderMovements);
    return (
      <>
        <Col onClick={handleShowHideData} xs={6} md={4} className='m-auto data-title secondary-theme-bg'>
          <h2 className='text-dark text-center fs-2 mt-3 mb-3 p-2 rounded'>Dodges/Rolls</h2>
        </Col>
        <Row id='movements' xs={1} sm={2} xl={3} className='rounded justify-content-center align-items-start p-1'>
          { allMovements }
        </Row>
      </>
    )
  }
}
