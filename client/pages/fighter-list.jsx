import React from 'react';
import FighterCards from '../components/fighter-cards';

export default class FighterList extends React.Component {

  render() {
    return (
      <FighterCards viewChange={this.props.viewChange} />
    );
  }
}
