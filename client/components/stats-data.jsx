import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export default function StatsData(props) {
  const [stats, setStats] = useState([]);
  useEffect(() => {
    fetch(`https://the-ultimate-api.herokuapp.com/api/fighters/data/stats?fighterId=${props.id}`, {
      method: 'GET',
      headers: {
        accept: 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => {
        setStats(json);
      })
      .catch(err => console.error('fetch failed!', err));
  }, [props.id]);
  console.log(stats);
}
