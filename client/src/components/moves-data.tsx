import React, { useState, useEffect } from 'react';
import Loading from './loading';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import FetchDataFail from './fetch-data-fail';
import { fetchDetailsData } from '../lib/fetch-details-data';
import axios from 'axios';

interface MovesDataProps {
  currentFighter: string | undefined
}

export default function MovesData(props: MovesDataProps) {
  const [moves, setMoves] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchFailed, setFetchFailed] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchDetailsData(props.currentFighter).then(res => {
      if(res.status === 200) {
        setMoves(res.data);
      } else {
        setFetchFailed(true);
      }
      setIsLoading(false);
    });
  }, [props.currentFighter]);

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
              <Card.Title className='text-center fw-bold'>{move.name}</Card.Title>
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
        { allMoves }
      </>
    )
  }
}
