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
      currentId: null
    };
    this.handleViewChange = this.handleViewChange.bind(this);
    this.handleCurrentId = this.handleCurrentId.bind(this);
  }

  handleViewChange(newView) {
    this.setState({
      currentView: newView
    });
  }

  handleCurrentId(id) {
    this.setState({
      currentId: id
    });
  }

  render() {
    let view = null;
    if (this.state.currentView === 'characterList') {
      view =
        <>
          <BackgroundCarousel />
          <FighterList viewChange={this.handleViewChange} currentId={this.handleCurrentId} order={this.orderByRosterId} />;
        </>;
    } else if (this.state.currentView === 'favoritesList') {
      return;
    } else {
      view =
        <>
          <BackgroundCarousel />
          <FighterDetails currentId={ this.state.currentId } />
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
