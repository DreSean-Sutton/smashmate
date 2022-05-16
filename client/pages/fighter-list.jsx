import React from 'react';
import FighterListCards from '../components/fighter-list-cards';

export default class FighterList extends React.Component {

  render() {
    return (
      <FighterListCards viewChange={this.props.viewChange} />
    );
  }
}
