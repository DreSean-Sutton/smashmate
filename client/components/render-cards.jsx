import React from 'react';
import Row from 'react-bootstrap/Row';

export default class RenderCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fighterArray: [],
      favorites: []
    };
    this.noOneDigitNums = this.noOneDigitNums.bind(this);
    this.handleShowDetails = this.handleShowDetails.bind(this);
    this.handleFavoriting = this.handleFavoriting.bind(this);
  }

  componentDidMount() {

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
            fighterArray: json
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
            fighterArray: json
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
    const fighterId = Number(heart.closest('#character-card').dataset.cardFighterId);
    for (let i = 0; i < this.state.favorites.length; i++) {
      if (this.state.favorites[i] === fighterId) {
        this.state.favorites.splice(i, 1);
        heart.classList.remove('card-heart-favorited');
        return;
      }
    }
    this.setState({
      favorites: [...this.state.favorites, fighterId].sort((a, b) => a - b)
    });
    heart.classList.add('card-heart-favorited');
  }

  noOneDigitNums(num) {
    return num < 10
      ? `0${num}`
      : num;
  }

  render() {
    console.log(this.state.favorites);
    const allCards = this.state.fighterArray.map(card => {

      return (
        <React.Fragment key={card.fighterId}>
          <Row className='card-column w-auto'>
            <div onClick={this.handleShowDetails} data-card-fighter-id={card.fighterId} data-card-name={card.fighter} data-card-roster-id={card.rosterId} data-card-display-name={card.displayName} id='character-card' className='row character-card p-0'>
              <div className=''>
                <img className='character-card-img' src={`./images/smash-ultimate-sprites/${card.fighter}.png`} alt={card.fighter} />
                <span className='character-card-number'>{this.noOneDigitNums(card.fighterId)}</span>
                <i onClick={this.handleFavoriting} className={'fa-solid fa-heart card-heart'}></i>
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
