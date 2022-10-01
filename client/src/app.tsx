/* eslint-disable no-restricted-globals */
import { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import BackgroundCarousel from './components/background-carousel';
import SiteNavbar from './components/navbar';
import Home from './pages/home';
import FighterDetails from './pages/fighter-details';
import FavoritesList from './pages/favorites';
import Registration from './pages/registration';
import Profile from './pages/profile';
import Loading from './components/loading';
import axios from 'axios';

export default function App() {
  const [fighterArray, setfighterArray]: any[] = useState([]);
  const [favorites, setFavorites]: any[] = useState([]);
  const [loading, setIsLoading]: any[] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const favoriteItem: string | null = localStorage.getItem('favorites');
    if (favoriteItem) {
      setFavorites(JSON.parse(favoriteItem));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (!window.location.pathname.includes('favorites') &&
      window.location.pathname !== '/') {
      return;
    }
    if(fighterArray.length === 0) {
      fetchFighters();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  async function fetchFighters() {
    setIsLoading(true);
    try {
      const res = await axios.get('https://the-ultimate-api.herokuapp.com/api/fighters')
      if (res.status === 200) {
        setfighterArray(res.data);
      } else {
        throw Error(res.statusText);
      }
    } catch (e) {
      console.error('Fetch failed!', e);
    } finally {
      setIsLoading(false);
    }
  }

  function handleAddFavorites(fav: object | undefined) {
    const newFavorites: any[] = [...favorites, fav]
    setFavorites(newFavorites.sort((a: any, b: any) => (a.fighterId > b.fighterId) ? 1 : -1));
  }

  function handleDeleteFavorites(id: number): void {
    interface Fav {
      fighterId: number
    }
    if (favorites.length === 1) {
      setFavorites([]);
    }

    function filterFav(fav: Fav): number | undefined {
      if (fav.fighterId !== id) {
        return fav.fighterId
      }
    }
    setFavorites(favorites.filter(filterFav));
  }

  function handleSetUser(user: any) {
    setUser(user);
  }

  if(loading) {
    return (
      <>
        <header>
          <SiteNavbar
            user={user}
            setUser={handleSetUser}
          />
        </header>
        <main>
          <Loading />
        </main>
      </>
    );
  }
  return (
    <>
      <header>
        <SiteNavbar
          user={user}
          setUser={handleSetUser}
        />
      </header>
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <BackgroundCarousel />
              <Home
                fighterArray = {fighterArray}
                favorites = {favorites}
                addFavorites = {handleAddFavorites}
                deleteFavorites = {handleDeleteFavorites}
              />
            </>
          } />
          <Route path="/favorites" element={
            <>
              <BackgroundCarousel />
              <FavoritesList
                fighterArray = {fighterArray}
                favorites = {favorites}
                addFavorites = {handleAddFavorites}
                deleteFavorites = {handleDeleteFavorites}
              />
            </>
          } />
          <Route path='/character-details'>
            <Route path={':fighter'} element={
              <>
                <BackgroundCarousel />
                <FighterDetails
                  fighterArray={fighterArray}
                />
              </>
            } />
          </Route>
          <Route path='/registration'>
            <Route path="create-account" element={
              <Registration />
            } />
            <Route path="sign-in" element={
              <Registration
                setUser={handleSetUser}
              />
            } />
          </Route>
          <Route path='/profile' element={
            <Profile />
          } />
        </Routes>
      </main>
    </>
  );
}
