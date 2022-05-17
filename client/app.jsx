import React from 'react';
import FighterList from './pages/fighter-list';
import FighterDetails from './pages/fighter-details';
import Navbar from './components/navbar';
import BackgroundCarousel from './components/background-carousel';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'characterList',
      orderByRosterId: false,
      focusedFighter: {}
    };
    this.handleViewChange = this.handleViewChange.bind(this);
    this.handleCurrentFighter = this.handleCurrentFighter.bind(this);
  }

  handleViewChange(newView) {
    this.setState({
      currentView: newView
    });
  }

  handleCurrentFighter(obj) {
    if (obj === null) {
      return this.setState({});
    }

    this.setState({
      focusedFighter: {
        fighter: obj.fighter,
        fighterId: obj.fighterId,
        rosterId: obj.rosterId,
        displayName: obj.displayName
      }
    });
  }

  render() {
    let view = null;
    if (this.state.currentView === 'characterList') {
      view =
        <>
          <BackgroundCarousel />
        <FighterList viewChange={this.handleViewChange} focusedFighter={this.handleCurrentFighter} order={this.orderByRosterId} />;
        </>;
    } else if (this.state.currentView === 'favoritesList') {
      return;
    } else {
      view =
        <>
          <BackgroundCarousel />
          <FighterDetails focusedFighter={ this.state.focusedFighter } />
        </>;
    }
    return (
      <>
        <header>
          <Navbar viewChange={this.handleViewChange} view={this.state.currentView} />
        </header>
        <main>
          { view }
        </main>
      </>
    );
  }
}
