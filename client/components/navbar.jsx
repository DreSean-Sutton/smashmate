import React from 'react';

export default function Navbar(props) {
  function toggleIcon(icon) {
    return props.view === icon
      ? 'hidden'
      : '';
  }

  return (
    <div className='container navbar-top'>
      <div className='row header-layout'>
        <div className='column-full'>
          <div className='row justify-center'>
            <div className='column-three-quarter'>
              <h1>smash ultimate fighter list</h1>
            </div>
          </div>
        </div>
        <div className='column-one-quarter'>
          <i className={`fa-solid fa-house-chimney house-icon ${toggleIcon('characterList')}`}></i>
          <i className={`fa-solid fa-heart heart-icon-list ${toggleIcon('favoriteList')}`}></i>
        </div>
      </div>
    </div>
  );
}
