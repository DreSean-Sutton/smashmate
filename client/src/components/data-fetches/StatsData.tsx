import React, { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import Loading from '../Loading';
import FetchDataFail from './FetchDataFail';
import fetchDetailsData from '../../lib/fetch-details-data';
import showHideData from '../../util/show-hide-data';
import './DataFetch.css';

interface StatsDataProps {
  currentFighter: string
}

interface StatProps {
  name: string,
  statId: number,
  statValue: string
}

export default function StatsData(props: StatsDataProps): JSX.Element {
  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchFailed, setFetchFailed] = useState(false);

  async function fetchData() {
    setIsLoading(true);
    const { status, data } = await fetchDetailsData('stats', props.currentFighter);
    if (status !== 200) return setFetchFailed(true);
    setIsLoading(false);
    setStats(data);
  }

  useEffect(() => {
    fetchData();
  }, [props.currentFighter]);

  function handleShowHideData() {
    showHideData('stats');
  }

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
    const renderStats = (stat: StatProps) => {
      return (
        <React.Fragment key={stat.statId}>
          <Col className='p-3 text-center'>
            <Card className='p-2 bg-light primary-theme-color typical-box-shadow text-capitalize'>
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
        <Col onClick={handleShowHideData} xs={6} md={4} className='m-auto data-title secondary-theme-bg rounded'>
          <h2 className='text-dark text-center fs-2 mt-3 mb-3 p-2'>Stats</h2>
        </Col>
        <Row id='stats' xs={1} sm={2} xl={3} className='rounded justify-content-center align-items-start p-1'>
          { allStats };
        </Row>
      </>
    )
  }
}
