import { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hook';
import { selectFighterArray } from '../../features/fighters/fightersArraySlice';
import MovesData from './MovesData';
import ThrowsData from './ThrowsData';
import MovementsData from './MovementsData';
import StatsData from './StatsData';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import './DataTables.css';

interface DataTablesProps {
  currentFighter: string;
  currentDataType: string;
}

export default function DataTables(props: DataTablesProps) {

  const dataComponents: any = {
  moves: <MovesData currentFighter={props.currentFighter} />,
  throws: <ThrowsData currentFighter={props.currentFighter} />,
  movements: <MovementsData currentFighter={props.currentFighter} />,
  stats: <StatsData currentFighter={props.currentFighter} />
};

const currentDataComponent: any = dataComponents[props.currentDataType];

  return (
    <Col className='test-col p-0'>
      { currentDataComponent }
    </Col>
  )
}
