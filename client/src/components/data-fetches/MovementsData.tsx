import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Loading from '../Loading';
import FetchDataFail from './FetchDataFail';
import fetchDetailsData from '../../lib/fetch-details-data';
import showHideData from '../../util/show-hide-data';
import './DataFetch.css';
import { RouteParams } from '../../util/types';

interface MovementProps {
  name: string,
  movementId: number,
  activeFrames: string,
  totalFrames: string
}

export default function MovementsData() {
  const [movements, setMovements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchFailed, setFetchFailed] = useState(false);
  const { fighter } = useParams<keyof RouteParams>() as RouteParams;

  async function fetchData() {
    setIsLoading(true);
    const { status, data } = await fetchDetailsData('movements', fighter);
    if(status !== 200) return setFetchFailed(true);
    setIsLoading(false);
    setMovements(data);
  }

  useEffect(() => {
    fetchData();
  }, [fighter]);

  function checkNull(data: string | null) {
    return data
      ? data
      : '--';
  }

  if (isLoading) {
    return (
      <Loading />
    );
  }
  if (fetchFailed) {
    return (
      <FetchDataFail data={'Dodges/Rolls'} />
    );
  } else {

    const renderMovements = (movement: MovementProps): JSX.Element => {
      return (
        <React.Fragment key={movement.movementId}>
          <tr>
            <td>{movement.name}</td>
            <td>{checkNull(movement.activeFrames)}</td>
            <td>{checkNull(movement.totalFrames)}</td>
          </tr>
        </React.Fragment>
      );
    }
    const allMovements = movements.map(renderMovements);
    return (
      <table className='table table-striped table-bordered caption-top text-capitalize m-0' data-testid='movements-table'>
        <caption className='fw-bold text-sm-center text-dark'>Movements</caption>
        <thead className='text-center'>
          <tr>
            <th>Name</th>
            <th>Active Frames</th>
            <th>Total Frames</th>
          </tr>
        </thead>
        <tbody>
          { allMovements }
        </tbody>
      </table>
    )
  }
}
