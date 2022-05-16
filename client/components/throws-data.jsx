// import React from 'react';

export default function ThrowsData(props) {
  fetch(`https://the-ultimate-api.herokuapp.com/api/fighters/data/throws?fighterId=${props.id}`, {
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
