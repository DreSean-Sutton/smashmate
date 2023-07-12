import React, { useState, useEffect } from 'react';
import Loading from '../Loading';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import FetchDataFail from './FetchDataFail';
import fetchDetailsData from '../../lib/fetch-details-data';
import showHideData from '../../util/show-hide-data';
import './DataFetch.css';

interface MovesDataProps {
  currentFighter: string
}

interface MoveProps {
  name: string,
  damage: string,
  firstFrame: string,
  moveType: string,
  moveId: number,
  activeFrames: string,
  totalFrames: string
}

export default function MovesData(props: MovesDataProps) {
  const [moves, setMoves] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchFailed, setFetchFailed] = useState(false);

  async function fetchData() {
    setIsLoading(true);
    const { status, data } = await fetchDetailsData('moves', props.currentFighter);
    if (status !== 200) return setFetchFailed(true);
    setIsLoading(false);
    setMoves(data);
  }

  useEffect(() => {
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
    const renderMoves = (move: MoveProps): JSX.Element => {
      return (
        <React.Fragment key={move.moveId}>
          <tr>
            <td>{move.name}</td>
            <td>{checkNull(move.firstFrame)}</td>
            <td>{checkNull(move.damage)}</td>
            <td>{checkNull(move.activeFrames)}</td>
            <td>{checkNull(move.totalFrames)}</td>
            <td>{move.moveType}</td>
          </tr>
        </React.Fragment>
      );
    }
    const allMoves = moves.map(renderMoves);
    return (
      <table className='table table-striped table-bordered caption-top text-capitalize m-0' data-testid='moves-table'>
        <caption>{props.currentFighter}'s Moves</caption>
        <thead className='text-center'>
          <tr>
            <th>Name</th>
            <th>First Frame</th>
            <th>Damage</th>
            <th>Active Frames</th>
            <th>Total Frames</th>
            <th>Hitbox Type</th>
          </tr>
        </thead>
        <tbody>
          { allMoves }
        </tbody>
      </table>
    )
  }
}
