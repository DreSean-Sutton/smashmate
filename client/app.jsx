import React, { useState } from 'react';
import Home from './pages/home';
import FighterDetails from './pages/fighter-details';
import FavoritesList from './pages/favorites';
import Navbar from './components/navbar';
import BackgroundCarousel from './components/background-carousel';
export default function App(props) {

  const [currentView, setCurrentView] = useState('characterList');
  const [orderByRosterId, setOrderByRosterId] = useState(false);
  const [focusedFighter, setFocusedFighter] = useState({});
  const [favorites, setFavorites] = useState([]);

  function handleViewChange(newView) {
    setCurrentView(newView);
  }

  function handleCurrentFighter(obj) {
    if (obj === null) {
      return setFocusedFighter({});
    }

    setFocusedFighter({
      fighter: obj.fighter,
      fighterId: obj.fighterId,
      rosterId: obj.rosterId,
      displayName: obj.displayName
    });
  }

  function handleFavoritesList(fav) {
    setFavorites([...favorites, fav]);
  }

  let view = null;
  if (currentView === 'characterList') {
    view =
        <>
          <BackgroundCarousel />
        <Home view={currentView} viewChange={handleViewChange} focusedFighter={handleCurrentFighter} order={orderByRosterId} />;
        </>;
  } else if (currentView === 'favoritesList') {
    view =
        <>
          <BackgroundCarousel />
          <FavoritesList favorites={favorites} favoritesList={handleFavoritesList} view={currentView} viewChange={handleViewChange} focusedFighter={handleCurrentFighter} order={orderByRosterId} />;
        </>;
  } else {
    view =
        <>
          <BackgroundCarousel />
          <FighterDetails focusedFighter={focusedFighter} />
        </>;
  }
  return (
    <>
      <header>
        <Navbar viewChange={handleViewChange} view={currentView} />
      </header>
      <main>
        { view }
      </main>
    </>
  );
}
