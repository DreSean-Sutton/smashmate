import React from 'react';
import FrameData from '../components/render-frame-data';

interface FighterDetailsProps {
  focusedFighter: object
};
export default function FighterDetails(props: FighterDetailsProps) {
  return (
    <FrameData focusedFighter={props.focusedFighter} />
  );
}
