import React from 'react';

import FighterDetailsCards from '../components/fighter-details-cards';
export default class FighterDetails extends React.Component {

  render() {
    return (
      <FighterDetailsCards id={this.props.id} />
    );
  }
}
