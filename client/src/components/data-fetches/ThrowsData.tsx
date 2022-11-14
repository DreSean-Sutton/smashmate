import React, { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import Loading from '../Loading';
import FetchDataFail from './FetchDataFail';
import fetchDetailsData from '../../lib/fetch-details-data';
import showHideData from '../../util/show-hide-data';
import { DataProps } from '../../util/types';
import './DataFetch.css';

export default function ThrowsData(props: DataProps) {
  const [throws, setThrows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchFailed, setFetchFailed] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      const { status, data } = await fetchDetailsData('throws', props.currentFighter);
      if (status !== 200) return setFetchFailed(true);
      setIsLoading(false);
      setThrows(data);
    }
    fetchData();
  }, [props.currentFighter]);

  function handleShowHideData() {
    showHideData('throws');
  }

  function checkNull(data:any) {
    return data === null
      ? '--'
      : data;
  }

  if (isLoading) {
    return (
      <Loading />
    );
  }
  if (fetchFailed) {
    return (
      <FetchDataFail data={'Grabs/Throws'} />
    );
  } else {
    const renderThrows = (grapple: any) => {
      return (
        <React.Fragment key={grapple.throwId}>
          <Col className='p-3'>
            <Card className='p-2 bg-light primary-theme-color typical-box-shadow text-capitalize'>
              <Card.Title className='text-center fw-bold'>{grapple.name}</Card.Title>
              <p className='mb-0 pt-1 border-top'>Damage: {checkNull(grapple.damage)}</p>
              <p className='mb-0 pt-1 border-top'>Active Frames: {grapple.activeFrames}</p>
              <p className='mb-0 pt-1 border-top'>Total Frames: {grapple.totalFrames}</p>
            </Card>
          </Col>
        </React.Fragment>
      );
    }
    const allThrows = throws.map(renderThrows);
    return(
      <>
        <Col onClick={handleShowHideData} xs={6} md={4} className='m-auto data-title secondary-theme-bg rounded'>
          <h2 className='text-dark text-center fs-2 mt-3 mb-3 p-2'>Grabs/Throws</h2>
        </Col>
        <Row id='throws' xs={1} sm={2} xl={3} className='rounded justify-content-center align-items-start p-1'>
          { allThrows }
        </Row>
      </>
    )
  }
}
