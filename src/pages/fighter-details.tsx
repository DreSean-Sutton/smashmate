import React from 'react';
import FrameData from '../components/render-frame-data';

interface FighterDetailsProps {
  focusedFighter: FocusedFighterProps
};
interface FocusedFighterProps {
  fighter: string,
  fighterId: number,
  displayName: string,
  rosterId: number
};
export default function FighterDetails(props: FighterDetailsProps) {
  return (
    <FrameData focusedFighter={props.focusedFighter} />
  );
}
