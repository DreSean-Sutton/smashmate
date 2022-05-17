import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export default function ThrowsData(props) {
  const [throws, setThrows] = useState([]);
  useEffect(() => {
    fetch(`https://the-ultimate-api.herokuapp.com/api/fighters/data/throws?fighterId=${props.id}`, {
      method: 'GET',
      headers: {
        accept: 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => {
        setThrows(json);
      })
      .catch(err => console.error('fetch failed!', err));
  }, [props.id]);
  console.log(throws);
}
