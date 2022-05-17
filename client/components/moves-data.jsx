import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export default function MovesData(props) {
  const [moves, setMoves] = useState([]);
  useEffect(() => {
    fetch(`https://the-ultimate-api.herokuapp.com/api/fighters/data/moves?fighterId=${props.id}`, {
      method: 'GET',
      headers: {
        accept: 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => {
        setMoves(json);
      })
      .catch(err => console.error('fetch failed!', err));
  }, [props.id]);

  console.log(moves);

  const allMoves = moves.map(move => {
    return (
      <React.Fragment key={move.moveId}>
        <Col>
          <Card style={{ textTransform: 'capitalize' }} className='p-2 m-2 bg-light text-dark typical-box-shadow bold'>
            <Card.Title className='text-center'>{move.name}</Card.Title>
            <p className='mb-0 pb pt-1 border-top'>First Frame: {move.firstFrame}</p>
            <p className='mb-0 pb pt-1 border-top'>Damage: {move.damage}</p>
            <p className='mb-0 pb pt-1 border-top'>Active Frames: {move.activeFrames}</p>
            <p className='mb-0 pb pt-1 border-top'>Total Frames: {move.totalFrames}</p>
            <p className='mb-0 pb pt-1 border-top'>Hitbox Type: {move.moveType}</p>
          </Card>
        </Col>
      </React.Fragment>
    );
  });
  return allMoves;
}
