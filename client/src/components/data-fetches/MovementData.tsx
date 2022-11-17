import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Loading from '../Loading';
import FetchDataFail from './FetchDataFail';
import fetchDetailsData from '../../lib/fetch-details-data';
import showHideData from '../../util/show-hide-data';
import { DataProps } from '../../util/types';
import './DataFetch.css';

export default function MovementData(props: DataProps) {
  const [movements, setMovements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchFailed, setFetchFailed] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      const { status, data } = await fetchDetailsData('movements', props.currentFighter);
      if(status !== 200) return setFetchFailed(true);
      setIsLoading(false);
      setMovements(data);
    }
    fetchData();
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
            <Card className='p-2 bg-light primary-theme-color typical-box-shadow text-capitalize'>
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
        <Col onClick={handleShowHideData} xs={6} md={4} className='m-auto data-title secondary-theme-bg rounded'>
          <h2 className='text-dark text-center fs-2 mt-3 mb-3 p-2'>Dodges/Rolls</h2>
        </Col>
        <Row id='movements' xs={1} sm={2} xl={3} className='rounded justify-content-center align-items-start p-1'>
          { allMovements }
        </Row>
      </>
    )
  }
}
