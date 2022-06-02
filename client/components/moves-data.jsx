import React, { useState, useEffect } from 'react';
import Loading from './loading';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export default function MovesData(props) {
  const [moves, setMoves] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://the-ultimate-api.herokuapp.com/api/fighters/data/moves?fighterId=${props.focusedFighter.fighterId}`, {
      method: 'GET',
      headers: {
        accept: 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => {
        setMoves(json);
        setIsLoading(false);
      })
      .catch(err => console.error('fetch failed!', err));
  }, [props.focusedFighter.fighterId]);

  function checkNull(data) {
    return data === null
      ? '--'
      : data;
  }
  if (isLoading) {
    return (
      <Loading />
    );
  }
  const allMoves = moves.map(move => {
    return (
      <React.Fragment key={move.moveId}>
        <Col className='p-3'>
          <Card className='p-2 bg-light text-dark typical-box-shadow text-capitalize'>
            <Card.Title className='text-center fw-bold'>{move.name}</Card.Title>
            <p className='mb-0 pb pt-1 border-top'>First Frame: {checkNull(move.firstFrame)}</p>
            <p className='mb-0 pb pt-1 border-top'>Damage: {checkNull(move.damage)}</p>
            <p className='mb-0 pb pt-1 border-top'>Active Frames: {checkNull(move.activeFrames)}</p>
            <p className='mb-0 pb pt-1 border-top'>Total Frames: {checkNull(move.totalFrames)}</p>
            <p className='mb-0 pb pt-1 border-top'>Hitbox Type: {move.moveType}</p>
          </Card>
        </Col>
      </React.Fragment>
    );
  });
  return allMoves;
}
