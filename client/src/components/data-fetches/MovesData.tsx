import React, { useState, useEffect } from 'react';
import Loading from '../Loading';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import FetchDataFail from './FetchDataFail';
import fetchDetailsData from '../../lib/fetch-details-data';
import showHideData from '../../util/show-hide-data';
import { DataProps } from '../../util/types';
import './DataFetch.css';

export default function MovesData(props: DataProps) {
  const [moves, setMoves] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchFailed, setFetchFailed] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      const { status, data } = await fetchDetailsData('moves', props.currentFighter);
      if (status !== 200) return setFetchFailed(true);
      setIsLoading(false);
      setMoves(data);
    }
    fetchData();
  }, [props.currentFighter]);

  function handleShowHideData() {
    showHideData('moves');
  }

  function checkNull(data: string | null) {
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
      <FetchDataFail data='Moves'/>
    );
  } else {
    interface MoveProps {
      name: string,
      damage: string,
      firstFrame: string,
      moveType: string,
      moveId: number,
      activeFrames: string,
      totalFrames: string
    }
    const renderMoves = (move: MoveProps): JSX.Element => {
      return (
        <React.Fragment key={move.moveId}>
          <Col className='p-3'>
            <Card className='p-2 bg-light text-dark typical-box-shadow text-capitalize'>
              <Card.Title className='text-center fw-bold primary-theme-color'>{move.name}</Card.Title>
              <p className='mb-0 pt-1 border-top'>First Frame: {checkNull(move.firstFrame)}</p>
              <p className='mb-0 pt-1 border-top'>Damage: {checkNull(move.damage)}</p>
              <p className='mb-0 pt-1 border-top'>Active Frames: {checkNull(move.activeFrames)}</p>
              <p className='mb-0 pt-1 border-top'>Total Frames: {checkNull(move.totalFrames)}</p>
              <p className='mb-0 pt-1 border-top'>Hitbox Type: {move.moveType}</p>
            </Card>
          </Col>
        </React.Fragment>
      );
    }
    const allMoves = moves.map(renderMoves);
    return (
      <>
        <Col onClick={handleShowHideData} xs={6} md={4} className='m-auto data-title secondary-theme-bg rounded'>
          <h2 className='text-dark text-center fs-2 mt-3 mb-3 p-2'>Moves</h2>
        </Col>
        <Row id='moves' xs={1} lg={2} xl={3} className='rounded justify-content-center align-items-start p-1'>
          { allMoves }
        </Row>
      </>
    )
  }
}
