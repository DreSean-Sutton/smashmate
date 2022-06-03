import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Loading from './loading';
import FetchDataFail from './fetch-data-fail';

export default function MovementData(props) {
  const [movements, setMovements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchFailed, setFetchFailed] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://the-ultimate-api.herokuapp.com/api/fighters/data/movements?fighterId=${props.focusedFighter.fighterId}`, {
      method: 'GET',
      headers: {
        accept: 'application/json'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw Error(res.status);
        }
      })
      .then(json => {
        setMovements(json);
        setIsLoading(false);
      })
      .catch(err => {
        setFetchFailed(true);
        setIsLoading(false);
        console.error('fetch failed!', err);
      });
  }, [props.focusedFighter.fighterId]);

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

    const allMovements = movements.map(movement => {
      return (
        <React.Fragment key={movement.throwId}>
          <Col className='p-3'>
            <Card className='p-2 bg-light text-dark typical-box-shadow text-capitalize'>
              <Card.Title className='text-center fw-bold'>{movement.name}</Card.Title>
              <p className='mb-0 pt-1 border-top'>Active Frames: {movement.activeFrames}</p>
              <p className='mb-0 pt-1 border-top'>Total Frames: {movement.totalFrames}</p>
            </Card>
          </Col>
        </React.Fragment>
      );
    });
    return allMovements;
  }
}
