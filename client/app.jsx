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
      setFocusedFighter({});
      return;
    }
    setFocusedFighter(obj);
  }

  function handleAddFavorites(fav) {
    setFavorites([...favorites, fav].sort((a, b) => (a.fighterId > b.fighterId) ? 1 : -1));
  }

  function handleDeleteFavorites(fav) {
    if (fav.length === 0) {
      setFavorites([]);
      return;
    }
    setFavorites(fav);
  }

  let view = null;
  if (currentView === 'characterList') {
    view =
        <>
          <BackgroundCarousel />
          <Home
            view={currentView}
            viewChange={handleViewChange}
            focusedFighter={handleCurrentFighter}
            order={orderByRosterId}
            favorites={favorites}
            addFavorites={handleAddFavorites}
            deleteFavorites={handleDeleteFavorites}
          />;
        </>;
  } else if (currentView === 'favoritesList') {
    view =
        <>
          <BackgroundCarousel />
          <FavoritesList
            view={currentView}
            viewChange={handleViewChange}
            focusedFighter={handleCurrentFighter}
            order={orderByRosterId}
            favorites={favorites}
            addFavorites={handleAddFavorites}
            deleteFavorites={handleDeleteFavorites}
          />;
        </>;
  } else if (currentView === 'characterDetails') {
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
