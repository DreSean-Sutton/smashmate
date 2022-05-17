import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export default function ThrowsData(props) {
  const [throws, setThrows] = useState([]);
  useEffect(() => {
    fetch(`https://the-ultimate-api.herokuapp.com/api/fighters/data/throws?fighterId=${props.currentId}`, {
      method: 'GET',
      headers: {
        accept: 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => {
        setThrows(json);
      })
      .catch(err => console.error('fetch failed!', err));
  }, [props.currentId]);

  function checkNull(data) {
    return data === null
      ? '--'
      : data;
  }

  const allThrows = throws.map(grapple => {
    return (
      <React.Fragment key={grapple.throwId}>
        <Col className='p-3'>
          <Card className='p-2 bg-light text-dark typical-box-shadow text-capitalize'>
            <Card.Title className='text-center fw-bold'>{grapple.name}</Card.Title>
            <p className='mb-0 pb pt-1 border-top'>Damage: {checkNull(grapple.damage)}</p>
            <p className='mb-0 pb pt-1 border-top'>Active Frames: {grapple.activeFrames}</p>
            <p className='mb-0 pb pt-1 border-top'>Total Frames: {grapple.totalFrames}</p>
          </Card>
        </Col>
      </React.Fragment>
    );
  });
  return allThrows;
}
