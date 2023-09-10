import { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hook';
import { selectFighterArray } from '../../features/fighters/fightersArraySlice';
import { useParams } from 'react-router-dom';
import MovesData from './MovesData';
import ThrowsData from './ThrowsData';
import MovementsData from './MovementsData';
import StatsData from './StatsData';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import './DataTables.css';

export default function DataTables(props: DataTablesProps) {

  const { currentDataType } = useParams();

  const dataComponents: any = {
  moves: <MovesData />,
  throws: <ThrowsData />,
  movements: <MovementsData />,
  stats: <StatsData />
};

const currentDataComponent: any = dataComponents[currentDataType];

  return (
    <Col className='test-col p-0'>
      { currentDataComponent }
    </Col>
  )
}
