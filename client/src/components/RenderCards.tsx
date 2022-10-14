/* eslint-disable no-restricted-globals */
import React from 'react';
import { useState } from 'react';
import { useAppSelector } from '../app/hook';
import { selectFighters } from '../features/fighters/fightersSlice';
import CardSelectModal from './CardSelectModal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './RenderCards.css';

interface MyProps {
  addFavorites: (param1: object) => void
  deleteFavorites: (param1: number) => void
  fighterArray: any[]
  favorites: any[]
}

interface FighterProps {
  fighter: string,
  fighterId: number | null,
  displayName: string,
  rosterId: number | null
};
interface EventProps {
  target?: any,
  matches?: any
}
export default function RenderCards(props: MyProps) {

  const focusedFighterInitialState: FighterProps = {
    fighter: '',
    fighterId: null,
    displayName: '',
    rosterId: null
  }

  const fighters = useAppSelector(selectFighters);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [focusedFighter, setFocusedFighter]: any = useState(focusedFighterInitialState);

  function handleShowModal(event: any) {
    if (event.target.matches('.fa-heart')) return;
    const characterCard = event.target.closest('#character-card').dataset;
    setFocusedFighter({
      fighter: characterCard.cardName,
      fighterId: Number(characterCard.cardFighterId),
      rosterId: Number(characterCard.cardRosterId),
      displayName: characterCard.cardDisplayName
    })
    setModalIsOpen(true);
  }

  function handleCloseModal(event: any) {
    if(event.target.matches('.character-card-modal')) {
      setModalIsOpen(false);
    }
  }
  function handleFavoriting(event: EventProps) {
    const heart = event.target;
    const currentCard = heart.closest('#character-card').dataset;
    for (let i = 0; i < props.favorites.length; i++) {
      if (props.favorites[i].fighterId === Number(currentCard.cardFighterId)) {
        return props.deleteFavorites(props.favorites[i].fighterId);
      }
    }
    const fav: FighterProps = {
      fighter: currentCard.cardName,
      fighterId: Number(currentCard.cardFighterId),
      displayName: currentCard.cardDisplayName,
      rosterId: Number(currentCard.cardRosterId)
    };
    props.addFavorites(fav);
  }

  function handleHearts(id: number): string {
    for (const element of props.favorites) {
      const fighterId = element.fighterId
      if (id === fighterId) {
        return 'card-heart-favorited';
      }
    }
    return '';
  }

  function noOneDigitNums(num: number) {
    return num < 10
      ? `0${num}`
      : num;
  }
  function homeOrFavorites() {

    const favRegex = new RegExp('favorites', 'g');
    if(favRegex.test(location.href)) {
      return props.favorites;
    } else {
      return fighters;
    }
  }
  const allCards = homeOrFavorites().map((card: any) => {
    return (
      <React.Fragment key={card.fighterId}>
        <Row className='card-column w-auto'>
          <div onClick={handleShowModal} className='row character-card p-0' data-card-fighter-id={card.fighterId} data-card-name={card.fighter} data-card-roster-id={card.rosterId} data-card-display-name={card.displayName} id='character-card'>
            <div className=''>
              <img className='character-card-img' src={`./images/smash-ultimate-sprites/${card.fighter}.png`} alt={card.displayName} />
              <span className='character-card-number'>{noOneDigitNums(card.fighterId)}</span>
              <i onClick={handleFavoriting} className={`fa-solid fa-heart card-heart ${handleHearts(card.fighterId)}`}></i>
              <h3 className='character-card-name'>{card.displayName}</h3>
            </div>
          </div>
        </Row>
      </React.Fragment>
    );
  });
  return (
    <Container fluid={'lg'} onClick={handleCloseModal} className="row content-layout" data-view='character-list'>
      <CardSelectModal modal={modalIsOpen} focusedFighter={focusedFighter} />
      { allCards }
    </Container>
  );
}
