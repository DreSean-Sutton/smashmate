// import React from 'react';

export default function MovementData(props) {
  fetch(`https://the-ultimate-api.herokuapp.com/api/fighters/data/movements?fighterId=${props.id}`, {
    method: 'GET',
    headers: {
      accept: 'application/json'
    }
  })
    .then(res => res.json())
    .then(json => {
      console.log(json);

    })
    .catch(err => console.error('fetch failed!', err));
}
