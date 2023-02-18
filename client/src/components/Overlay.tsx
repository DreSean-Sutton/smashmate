import React from 'react';
import './Overlay.css';

interface OverlayProps {
  toggleSearchbar: () => void;
}
export default function Overlay(props: OverlayProps) {

  function handleToggleSearchbar() {
    props.toggleSearchbar();
  }

  return (
    <div onClick={handleToggleSearchbar} className='overlay' data-testid='overlay'></div>
  )
}
