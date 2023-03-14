/* eslint-disable no-restricted-globals */
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hook';
import { selectFighterArray } from '../features/fighters/fightersArraySlice';
import { selectFavorites, addFavorites, deleteFavorites } from '../features/favorites/favoritingSlice';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import Searchbar from './Searchbar'
import './RenderCards.css';

interface EventProps {
  target?: any,
  matches?: any
}

export default function RenderCards() {

  const [searchbarOpened, setSearchbarOpened] = useState(false);
  const [searchbar, setSearchbar] = useState('');
  const fighterArray: any = useAppSelector(selectFighterArray);
  const favorites: any = useAppSelector(selectFavorites);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const allCards: any = document.querySelectorAll('.card-column');
    if(allCards.length === 0) return;
    const myRegex = new RegExp(`^${searchbar}`, 'i');
    const allCardsArray = Array.from(allCards);
    allCardsArray.map((card: any) => {
      const fighterElement = card.querySelector('.character-card');
      myRegex.test(fighterElement.dataset.cardDisplayName)
      ? card.classList.remove('d-none')
      : card.classList.add('d-none')
    })
  }, [searchbar])

  function handleShowDetails(event: EventProps) {
    if (event.target.matches('.fa-heart')) return;
    const characterCard = event.target.closest('#character-card').dataset;
    navigate(`/character-details/${characterCard.cardName}`);
  }

  function handleFavoriting(event: EventProps): void {
    const heart = event.target;
    const currentFighter = heart.closest('#character-card').dataset.cardName;
    favorites.fighterData.hasOwnProperty(currentFighter)
      ? dispatch(deleteFavorites(fighterArray.fighterData[currentFighter]))
      : dispatch(addFavorites(fighterArray.fighterData[currentFighter]));
  }

  function handleHearts(fighter: string): string {
    return favorites.fighterData.hasOwnProperty(fighter)
      ? 'card-heart-favorited'
      : '';
  }

  function noOneDigitNums(num: number) {
    return num < 10
      ? `0${num}`
      : num;
  }

  function homeOrFavorites() {
    const favRegex = new RegExp('favorites', 'g');
    if(favRegex.test(location.href)) {
      return favorites.fighterData;
    } else {
      return fighterArray.fighterData;
    }
  }

  function handleChangeSearchbar(search: string) {
    setSearchbar(search);
  }

  function searchIconOrSearchbar() {
    searchbarOpened
    ? setSearchbarOpened(false)
    : setSearchbarOpened(true);
  }

  const searchContents = searchbarOpened
    ? <Searchbar toggleSearchbar={searchIconOrSearchbar} changeSearchbar={handleChangeSearchbar} searchbarValue={searchbar} />
    : <i onClick={searchIconOrSearchbar} className="search-icon fa-solid fa-magnifying-glass" data-testid='search-icon'></i>

  const objValues = Object.values(homeOrFavorites())
  const allCards = objValues.map((card: any) => {
    return (
      <React.Fragment key={card.fighterId}>
        <Row className='card-column w-auto'>
          <div onClick={handleShowDetails} id='character-card' className='row character-card p-0' data-testid={card.fighter} data-card-fighter-id={card.fighterId} data-card-name={card.fighter} data-card-roster-id={card.rosterId} data-card-display-name={card.displayName}>
            <div>
              <img className='character-card-img' src={`./images/smash-ultimate-sprites/${card.fighter}.png`} alt={card.displayName} />
              <span className='character-card-number'>{noOneDigitNums(card.fighterId)}</span>
              <i data-testid={`${card.fighter}-heart`} onClick={handleFavoriting} className={`fa-solid fa-heart card-heart ${handleHearts(card.fighter)}`}></i>
              <h3 className='character-card-name'>{card.displayName}</h3>
            </div>
          </div>
        </Row>
      </React.Fragment>
    );
  });

  return (
    <>
      <Container fluid className='search-container d-flex justify-content-center'>
        { searchContents }
      </Container>
      <Container fluid={'lg'} className="row content-layout" data-view='character-list'>
        { allCards }
      </Container>
    </>
  );
}
