import React, { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import Loading from '../Loading';
import FetchDataFail from './FetchDataFail';
import fetchDetailsData from '../../lib/fetch-details-data';
import showHideData from '../../util/show-hide-data';
import './DataFetch.css';

interface ThrowsDataProps {
  currentFighter: string
}

interface ThrowProps {
  name: string,
  damage: string,
  throwId: number,
  activeFrames: string,
  totalFrames: string
}

export default function ThrowsData(props: ThrowsDataProps) {
  const [throws, setThrows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchFailed, setFetchFailed] = useState(false);

  async function fetchData() {
    setIsLoading(true);
    const { status, data } = await fetchDetailsData('throws', props.currentFighter);
    if (status !== 200) return setFetchFailed(true);
    setIsLoading(false);
    setThrows(data);
  }

  useEffect(() => {
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
        <caption>{props.currentFighter}'s Throws</caption>
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
