import React, { useState, useEffect } from 'react';
import Loading from './loading';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import FetchDataFail from './fetch-data-fail';

interface MovesDataProps {
  focusedFighter: FocusedFighter
}
interface FocusedFighter {
  fighterId: number
}
export default function MovesData(props: MovesDataProps) {
  const [moves, setMoves] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchFailed, setFetchFailed] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      try {
        const res = await fetch(`https://the-ultimate-api.herokuapp.com/api/fighters/data/moves?fighterId=${props.focusedFighter.fighterId}`, {
          method: 'GET',
          headers: {
            accept: 'application/json'
          }
        });
        if (res.ok) {
          const json = await res.json();
          setMoves(json);
        } else {
          throw Error();
        }
      } catch (e) {
        setFetchFailed(true);
        console.error('fetch failed!', e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [props.focusedFighter.fighterId]);

  function checkNull(data: any) {
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
    const renderMoves = (move: any): JSX.Element => {
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
