import React, { useState, useEffect } from 'react';
import Loading from '../loading';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import FetchDataFail from './fetch-data-fail';
import axios from 'axios';

interface MovesDataProps {
  currentFighter: string
}

export default function MovesData(props: MovesDataProps) {
  const [moves, setMoves] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchFailed, setFetchFailed] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const controller = new AbortController()
    async function fetchDetailsData(currentFighter: string) {
      setIsLoading(true)
      const { status, data } = await axios.get(`https://the-ultimate-api.herokuapp.com/api/fighters/data/moves?fighter=${currentFighter}`, {
        signal: controller.signal,
        validateStatus: () => true
      });
      if (status !== 200) return setFetchFailed(true)
      setIsLoading(false)
      setMoves(data)
    }
    fetchDetailsData(props.currentFighter)
    return () => controller.abort()
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
        <Col id='moves' xs={6} md={4} className='m-auto'>
          <h2 className='text-center fs-2 mt-3 mb-3 p-2 bg-warning text-dark rounded'>Moves</h2>
        </Col>
        <Row xs={1} md={2} xl={3} className='rounded justify-content-center align-items-start p-1'>
          { allMoves }
        </Row>
      </>
    )
  }
}
