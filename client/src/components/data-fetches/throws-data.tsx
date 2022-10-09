import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Loading from '../loading';
import FetchDataFail from './fetch-data-fail';
import axios from 'axios';
import showHideData from '../util/show-hide-data';
import './data-fetch.css';

interface ThrowsDataProps {
  currentFighter: string
}

export default function ThrowsData(props: ThrowsDataProps) {
  const [throws, setThrows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchFailed, setFetchFailed] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const controller = new AbortController()
    async function fetchDetailsData(currentFighter: string) {
      setIsLoading(true)
      const { status, data } = await axios.get(`https://the-ultimate-api.herokuapp.com/api/fighters/data/throws?fighter=${currentFighter}`, {
        signal: controller.signal,
        validateStatus: () => true
      });
      if (status !== 200) return setFetchFailed(true)
      setIsLoading(false)
      setThrows(data)
    }
    fetchDetailsData(props.currentFighter)
    return () => controller.abort()
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
            <Card className='p-2 bg-light text-dark typical-box-shadow text-capitalize'>
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
        <Col onClick={handleShowHideData} xs={6} md={4} className='m-auto data-title secondary-theme-bg'>
          <h2 className='text-dark text-center fs-2 mt-3 mb-3 p-2 rounded'>Grabs/Throws</h2>
        </Col>
        <Row id='throws' xs={1} sm={2} xl={3} className='rounded justify-content-center align-items-start p-1'>
          { allThrows }
        </Row>
      </>
    )
  }
}
