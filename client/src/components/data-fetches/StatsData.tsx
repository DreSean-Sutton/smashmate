import React, { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import Loading from '../Loading';
import FetchDataFail from './FetchDataFail';
import fetchDetailsData from '../../lib/fetch-details-data';
import showHideData from '../../util/show-hide-data';
import './DataFetch.css';

interface StatsDataProps {
  currentFighter: string
}

interface StatProps {
  name: string,
  statId: number,
  statValue: string
}

export default function StatsData(props: StatsDataProps): JSX.Element {
  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchFailed, setFetchFailed] = useState(false);

  async function fetchData() {
    setIsLoading(true);
    const { status, data } = await fetchDetailsData('stats', props.currentFighter);
    if (status !== 200) return setFetchFailed(true);
    setIsLoading(false);
    setStats(data);
  }

  useEffect(() => {
    fetchData();
  }, [props.currentFighter]);

  function handleShowHideData() {
    showHideData('stats');
  }

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
      <FetchDataFail data={'Stats'} />
    );
  } else {
    const renderStats = (stat: StatProps) => {
      return (
        <React.Fragment key={stat.statId}>
          <tr>
            <td>{stat.name}</td>
            <td>{checkNull(stat.statValue)}</td>
          </tr>
        </React.Fragment>
      );
    }
    const allStats = stats.map(renderStats);
    return (
      <table className='table table-striped table-bordered caption-top text-capitalize m-0' data-testid='stats-table'>
        <caption>{props.currentFighter}'s Stats</caption>
        <thead className='text-center'>
          <tr>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          { allStats }
        </tbody>
      </table>
    )
  }
}
