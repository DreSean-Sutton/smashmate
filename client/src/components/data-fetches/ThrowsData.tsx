import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import Loading from '../Loading';
import FetchDataFail from './FetchDataFail';
import fetchDetailsData from '../../lib/fetch-details-data';
import showHideData from '../../util/show-hide-data';
import './DataFetch.css';

interface ThrowProps {
  name: string,
  damage: string,
  throwId: number,
  activeFrames: string,
  totalFrames: string
}

export default function ThrowsData() {
  const [throws, setThrows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchFailed, setFetchFailed] = useState(false);
  const { fighter } = useParams();

  async function fetchData() {
    setIsLoading(true);
    const { status, data } = await fetchDetailsData('throws', fighter);
    if (status !== 200) return setFetchFailed(true);
    setIsLoading(false);
    setThrows(data);
  }

  useEffect(() => {
    fetchData();
  }, [fighter]);

  function checkNull(data:any) {
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
      <FetchDataFail data={'Grabs/Throws'} />
    );
  } else {
    const renderThrows = (grapple: ThrowProps): JSX.Element => {
      return (
        <React.Fragment key={grapple.throwId}>
          <tr>
            <td>{grapple.name}</td>
            <td>{checkNull(grapple.damage)}</td>
            <td>{grapple.activeFrames}</td>
            <td>{grapple.totalFrames}</td>
          </tr>
        </React.Fragment>
      );
    }
    const allThrows = throws.map(renderThrows);
    return(
      <table className='table table-striped table-bordered caption-top text-capitalize m-0' data-testid='throws-table'>
        <caption className='fw-bold text-sm-center text-dark'>Throws</caption>
        <thead className='text-center'>
          <tr>
            <th>Name</th>
            <th>Damage</th>
            <th>Active Frames</th>
            <th>Total Frames</th>
          </tr>
        </thead>
        <tbody>
          { allThrows }
        </tbody>
      </table>
    )
  }
}
