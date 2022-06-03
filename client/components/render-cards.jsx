import React from 'react';
import Row from 'react-bootstrap/Row';
import Loading from './loading';
export default class RenderCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fighterArray: [],
      isLoading: false
    };
    this.noOneDigitNums = this.noOneDigitNums.bind(this);
    this.handleShowDetails = this.handleShowDetails.bind(this);
    this.handleFavoriting = this.handleFavoriting.bind(this);
    this.handleHearts = this.handleHearts.bind(this);
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    });
    if (this.props.order) {
      return fetch('https://the-ultimate-api.herokuapp.com/api/fighters?orderByRosterId', {
        method: 'GET',
        headers: {
          accept: 'application/json'
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({
            fighterArray: json,
            isLoading: false
          });
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
          this.setState({
            fighterArray: json,
            isLoading: false
          });
        })
        .catch(err => console.error('Fetch failed!', err));
    }
  }

  handleShowDetails(event) {
    if (event.target.matches('.fa-heart')) return;
    const characterCard = event.target.closest('#character-card').dataset;
    this.props.focusedFighter({
      fighter: characterCard.cardName,
      fighterId: characterCard.cardFighterId,
      rosterId: characterCard.cardRosterId,
      displayName: characterCard.cardDisplayName
    });
    this.props.viewChange('characterDetails');
  }

  handleFavoriting(event) {
    const heart = event.target;
    const currentCard = heart.closest('#character-card').dataset;
    for (let i = 0; i < this.props.favorites.length; i++) {
      if (this.props.favorites[i].fighterId === Number(currentCard.cardFighterId)) {
        const data = this.props.favorites;
        data.splice(i, 1);
        this.props.deleteFavorites(data);
        // heart.classList.remove('card-heart-favorited');
        return;
      }
    }
    const fav = {
      fighter: currentCard.cardName,
      fighterId: Number(currentCard.cardFighterId),
      displayName: currentCard.cardDisplayName,
      rosterId: currentCard.cardRosterId
    };
    this.props.addFavorites(fav);
    // heart.classList.add('card-heart-favorited');
  }

  handleHearts(id) {
    for (const element of this.props.favorites) {
      if (id === element.fighterId) {
        return 'card-heart-favorited';
      }
    }
    return '';
  }

  checkView() {
    if (this.props.view === 'characterList' ||
    this.props.view === 'characterDetails') {
      return this.state.fighterArray;
    }
    return this.props.favorites;
  }

  noOneDigitNums(num) {
    return num < 10
      ? `0${num}`
      : num;
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Loading />
      );
    }
    const selectList = this.checkView();
    const allCards = selectList.map(card => {

      return (
        <React.Fragment key={card.fighterId}>
          <Row className='card-column w-auto'>
            <div onClick={this.handleShowDetails} data-card-fighter-id={card.fighterId} data-card-name={card.fighter} data-card-roster-id={card.rosterId} data-card-display-name={card.displayName} id='character-card' className='row character-card p-0'>
              <div className=''>
                <img className='character-card-img' src={`./images/smash-ultimate-sprites/${card.fighter}.png`} alt={card.displayName} />
                <span className='character-card-number'>{this.noOneDigitNums(card.fighterId)}</span>
                <i onClick={this.handleFavoriting} className={`fa-solid fa-heart card-heart ${this.handleHearts(card.fighterId)}`}></i>
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
}
