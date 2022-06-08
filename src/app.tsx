import React, { useState, useEffect } from 'react';
import Home from './pages/home';
import FighterDetails from './pages/fighter-details';
import FavoritesList from './pages/favorites';
import Navbar from './components/navbar';
import BackgroundCarousel from './components/background-carousel';
export default function App() {

  const [currentView, setCurrentView] = useState('characterList');
  const [focusedFighter, setFocusedFighter] = useState({});
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const itemName: any = localStorage.getItem('favorites')
    const favorites: any = JSON.parse(itemName);
    if (favorites) {
      setFavorites(favorites);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  function handleViewChange(newView: string) {
    setCurrentView(newView);
  }

  function handleCurrentFighter(obj: any) {
    if (obj === null) {
      setFocusedFighter({});
      return;
    }
    setFocusedFighter(obj);
  }

  function handleAddFavorites(fav: object | undefined) {
    const newFavorites: any = [...favorites, fav]
    setFavorites(newFavorites.sort((a: any, b: any) => (a.fighterId > b.fighterId) ? 1 : -1));
  }

  function handleDeleteFavorites(id: [] | object[]) {
    if (favorites.length === 1) {
      setFavorites([]);
      return;
    }
    function filter(fav: any) {
      return fav.fighterId !== id
    }
    setFavorites(favorites.filter(filter));
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
