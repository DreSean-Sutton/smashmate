import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Loading from './loading';

export default function StatsData(props) {
  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://the-ultimate-api.herokuapp.com/api/fighters/data/stats?fighterId=${props.focusedFighter.fighterId}`, {
      method: 'GET',
      headers: {
        accept: 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => {
        setStats(json);
        setIsLoading(false);
      })
      .catch(err => console.error('fetch failed!', err));
  }, [props.focusedFighter.fighterId]);

  if (isLoading) {
    return (
      <Loading />
    );
  }
  const allStats = stats.map(stat => {
    return (
      <React.Fragment key={stat.throwId}>
        <Col className='p-3 text-center'>
          <Card className='p-2 bg-light text-dark typical-box-shadow text-capitalize'>
            <Card.Title className='fw-bold'>{stat.name}</Card.Title>
            <p className='mb-0 pb pt-1 border-top'>{stat.statValue}</p>
          </Card>
        </Col>
      </React.Fragment>
    );
  });
  return allStats;
}
