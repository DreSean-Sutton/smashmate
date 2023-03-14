import React from 'react';
import './Overlay.css';

interface OverlayProps {
  toggleSearchbar: () => void;
}
export default function Overlay(props: OverlayProps) {

  return (
    <div onClick={props.toggleSearchbar} className='overlay' data-testid='overlay'></div>
  )
}
