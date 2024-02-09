/* eslint-disable no-restricted-globals */
import { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation,
  Navigate
} from 'react-router-dom';
import { useAppSelector, useAppDispatch } from './app/hook';
import { selectUser } from './features/account/userSlice';
import { setFighterArray, selectFighterArray } from './features/fighters/fightersArraySlice';
import { setFavorites, selectFavorites } from './features/favorites/favoritingSlice';
import BackgroundCarousel from './components/BackgroundCarousel';
import SiteNavbar from './components/navbar/SiteNavbar';
import Home from './pages/Home';
import FighterDetails from './pages/FighterDetails';
import Favorites from './pages/Favorites';
import ErrorPage from './pages/ErrorPage';
import User from './features/account/User';
import Loading from './components/Loading';
import axios from 'axios';
import getFighters from './lib/fetch-fighters';

export default function App() {

  const user = useAppSelector(selectUser);
  const fighterArray = useAppSelector(selectFighterArray);
  const favorites = useAppSelector(selectFavorites);
  const [loading, setIsLoading]: any[] = useState(true);
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(user) {
      const getFavoritesQuery = { email: user.account.email };
      fetchData(getFavoritesQuery)
    } else {
      const favoriteItem: string | null = localStorage.getItem('favorites');
      if (favoriteItem && !Array.isArray(favoriteItem)) {
        dispatch(setFavorites(JSON.parse(favoriteItem)));
      }
    }
    async function fetchData(getFavoritesQuery: {email: string}) {
      const { favorites} = await handleGetFavorites(getFavoritesQuery);
      if(typeof favorites !== 'object' || !favorites || Array.isArray(favorites)) return;
      if (favorites.hasOwnProperty('length')) {
        if(!favorites.hasOwnProperty('fighterData')) {
          dispatch(setFavorites({ length: 0, fighterData: {} }))
        } else {
          dispatch(setFavorites(favorites));
        }
      }
    }
  }, [user]);

  useEffect(() => {
    if(user) {
      const uploadFavoritesQuery = {
        email: user.account.email,
        favorites: favorites
      }
      handleUploadFavorites(uploadFavoritesQuery);
    } else {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites, user]);

  useEffect(() => {
    if (window.location.pathname.includes('registration')) {
      return;
    }
    if(fighterArray.length === 0) {
      fetchFighters();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  async function fetchFighters() {
    setIsLoading(true);
    const result = await getFighters();
    const objResult: any = { length: 0, fighterData: {} };
    result.map((elem: any) => {
      objResult.fighterData[elem.fighter] = elem;
      objResult.length++;
    })
    dispatch(setFighterArray(objResult));
    setIsLoading(false);
  }

  async function handleUploadFavorites(query: any) {
    const url = '/api/favoriting/characters/upsert';
    const controller = new AbortController();
    const headers = {
      signal: controller.signal,
      validateStatus: () => true
    }
    try {
      const { status, data }: any = await axios.post(url, query, headers);
      if (status !== 201) throw new Error('favoriting failed!');
      return data;
    } catch (e: any) {
      return { error: e.message }
    }
  }

  async function handleGetFavorites(queryEmail: {email: string}) {
    const url = '/api/favoriting/characters/get';
    const controller = new AbortController()
    const header = {
      signal: controller.signal,
      validateStatus: () => true
    }
    try {
      const { status, data } = await axios.post(url, queryEmail, header);
      if (status !== 200) throw new Error('Fetch failed!');
      return data
    } catch (e: any) {
      return { error: e.message }
    }
  }

  if(loading) {
    return (
      <>
        <header className='mb-0'>
          <SiteNavbar />
        </header>
        <main className='bg-dark min-vh-100' style={{ paddingTop: '6rem' }}>
          <Loading />
        </main>
      </>
    );
  }
  return (
    <>
      <header>
        <SiteNavbar />
      </header>
      <main>
        <Routes>
          <Route path='/' element={
            <>
              <BackgroundCarousel />
              <Home />
            </>
          } />
          <Route path='/favorites' element={
            <>
              <BackgroundCarousel />
              <Favorites />
            </>
          } />
          <Route path='/character-details/:fighter/:currentDataType' element={
            <>
              <BackgroundCarousel />
              <FighterDetails />
            </>
          } />
          <Route path='/registration'>
            <Route path='create-account' element={
              <User />
            } />
            <Route path='sign-in' element={
              <User />
            } />
          </Route>
          <Route path='/error-page' element={
            <ErrorPage />
          } />
          <Route path='*' element={<Navigate to='/error-page' />} />
        </Routes>
      </main>
    </>
  );
}
