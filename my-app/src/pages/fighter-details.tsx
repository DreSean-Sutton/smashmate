import React from 'react';
import FrameData from '../components/render-frame-data';
export default function FighterDetails(props:any) {
  return (
    <FrameData focusedFighter={props.focusedFighter} />
  );
}
