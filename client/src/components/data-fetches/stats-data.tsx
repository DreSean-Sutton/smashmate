import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Loading from '../loading';
import FetchDataFail from './fetch-data-fail';
import axios from 'axios';

interface StatsDataProps {
  currentFighter: string
}
export default function StatsData(props: StatsDataProps) {
  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchFailed, setFetchFailed] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const controller = new AbortController()
    async function fetchDetailsData(currentFighter: string) {
      setIsLoading(true)
      const { status, data } = await axios.get(`https://the-ultimate-api.herokuapp.com/api/fighters/data/stats?fighter=${currentFighter}`, {
        signal: controller.signal,
        validateStatus: () => true
      });
      if (status !== 200) return setFetchFailed(true)
      setIsLoading(false)
      setStats(data)
    }
    fetchDetailsData(props.currentFighter)
    return () => controller.abort()
  }, [props.currentFighter]);

  if (isLoading) {
    return (
      <Loading />
    );
  }
  if (fetchFailed) {
    return (
      <FetchDataFail data={'Stats'} />
    );
  } else {
    const renderStats = (stat: any) => {
      return (
        <React.Fragment key={stat.statId}>
          <Col className='p-3 text-center'>
            <Card className='p-2 bg-light text-dark typical-box-shadow text-capitalize'>
              <Card.Title className='fw-bold'>{stat.name}</Card.Title>
              <p className='mb-0 pt-1 border-top'>{stat.statValue}</p>
            </Card>
          </Col>
        </React.Fragment>
      );
    }
    const allStats = stats.map(renderStats);
    return (
      <>
        <Col xs={6} md={4} className='m-auto'>
          <h2 className='text-center fs-2 mt-3 mb-3 p-2 bg-warning text-dark rounded'>Stats</h2>
        </Col>
        <Row xs={2} xl={3} className='rounded justify-content-center align-items-start p-1'>
          { allStats };
        </Row>
      </>
    )
  }
}
