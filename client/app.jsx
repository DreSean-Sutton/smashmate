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
  }

  handleViewChange(newView) {
    this.setState({
      currentView: newView
    });
  }

  render() {
    let view = null;
    if (this.state.currentView === 'characterList') {
      view =
        <>
          <BackgroundCarousel />
          <FighterList viewChange={this.handleViewChange} />;
        </>;
    } else if (this.state.currentView === 'favoritesList') {
      return;
    } else {
      view =
        <>
          {/* <BackgroundCarousel /> */}
          <FighterDetails />
          <h1>This Worked 😲</h1>;
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
