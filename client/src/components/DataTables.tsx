import { useEffect, useState } from 'react';
import { useAppSelectoor } from '../app/hook';
import { selectFighterArray } from '../features/fighters/fightersArraySlice';
import MovesData from './data-fetches/MovesData';
import ThrowsData from './data-fetches/ThrowsData';
import MovementData from './data-fetches/MovementData';
import StatsData from './data-fetches/StatsData';

interface DataTablesProps {
  currentFighter: string
}

export default function DataTables(props: DataTablesProps) {
  return (
    <>
      <MovesData currentFighter={props.currentFighter} />
      <ThrowsData currentFighter={props.currentFighter} />
      <MovementData currentFighter={props.currentFighter} />
      <StatsData currentFighter={props.currentFighter} />
    </>
  )
}
