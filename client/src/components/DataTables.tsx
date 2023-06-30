import { useEffect, useState } from 'react';
import { useAppSelectoor } from '../app/hook';
import { selectFighterArray } from '../features/fighters/fightersArraySlice';
import MovesData from './data-fetches/MovesData';
import ThrowsData from './data-fetches/ThrowsData';
import MovementData from './data-fetches/MovementData';
import StatsData from './data-fetches/StatsData';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import './DataTables.css';

interface DataTablesProps {
  currentFighter: string
}

export default function DataTables(props: DataTablesProps) {
  return (
    <Col className='test-col p-0'>
      <MovesData currentFighter={props.currentFighter} />
    </Col>
  )
}
