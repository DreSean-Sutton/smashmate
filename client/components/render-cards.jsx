import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';

export default function RenderCards(props) {

  const [fighterArray, setFighterArray] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (props.order) {
      return fetch('https://the-ultimate-api.herokuapp.com/api/fighters?orderByRosterId', {
        method: 'GET',
        headers: {
          accept: 'application/json'
        }
      })
        .then(res => res.json())
        .then(json => {
          setFighterArray(json);
        })
        .catch(err => console.error('Fetch failed!', err));

    } else {
      return fetch('https://the-ultimate-api.herokuapp.com/api/fighters', {
        method: 'GET',
        headers: {
          accept: 'application/json'
        }
      })
        .then(res => res.json())
        .then(json => {
          setFighterArray(json);
        })
        .catch(err => console.error('Fetch failed!', err));
    }
  }, [props.order]);

  function handleShowDetails(event) {
    if (event.target.matches('.fa-heart')) return;
    const characterCard = event.target.closest('#character-card').dataset;
    props.focusedFighter({
      fighter: characterCard.cardName,
      fighterId: characterCard.cardFighterId,
      rosterId: characterCard.cardRosterId,
      displayName: characterCard.cardDisplayName
    });
    props.viewChange('characterDetails');
  }

  function handleFavoriting(event) {
    const heart = event.target;
    const currentCard = heart.closest('#character-card').dataset;
    for (let i = 0; i < favorites.length; i++) {
      if (favorites[i].fighterId === Number(currentCard.cardFighterId)) {
        const data = favorites;
        data.splice(i, 1);
        setFavorites(data);
        heart.classList.remove('card-heart-favorited');
        return;
      }
    }
    props.favoritesList([...props.favorites, {
      fighter: currentCard.cardName,
      fighterId: Number(currentCard.cardFighterId),
      displayName: currentCard.cardDisplayName,
      rosterId: currentCard.cardRosterId
    }].sort((a, b) => (a.fighterId > b.fighterId) ? 1 : -1));
    heart.classList.add('card-heart-favorited');
  }

  function checkView() {
    return props.view === 'characterList'
      ? fighterArray
      : favorites;
  }

  function noOneDigitNums(num) {
    return num < 10
      ? `0${num}`
      : num;
  }
  const selectList = checkView();

  const allCards = selectList.map(card => {

    return (
        <React.Fragment key={card.fighterId}>
          <Row className='card-column w-auto'>
            <div onClick={handleShowDetails} data-card-fighter-id={card.fighterId} data-card-name={card.fighter} data-card-roster-id={card.rosterId} data-card-display-name={card.displayName} id='character-card' className='row character-card p-0'>
              <div className=''>
                <img className='character-card-img' src={`./images/smash-ultimate-sprites/${card.fighter}.png`} alt={card.fighter} />
                <span className='character-card-number'>{noOneDigitNums(card.fighterId)}</span>
                <i onClick={handleFavoriting} className={'fa-solid fa-heart card-heart'}></i>
                <h3 className='character-card-name'>{card.displayName}</h3>
              </div>
            </div>
          </Row>
        </React.Fragment>
    );
  });
  return (
      <div className="row content-layout" data-view='character-list'>
        {allCards}
      </div>
  );
}
