import React from 'react';
import Row from 'react-bootstrap/Row';
export default class FighterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fighterArray: []
    };
    this.noOneDigitNums = this.noOneDigitNums.bind(this);
    this.handleShowDetails = this.handleShowDetails.bind(this);
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
    const characterCard = event.target.closest('#character-card').dataset;
    this.props.focusedFighter({
      fighter: characterCard.cardName,
      fighterId: characterCard.cardFighterId,
      rosterId: characterCard.cardRosterId,
      displayName: characterCard.cardDisplayName
    });
    this.props.viewChange('characterDetails');
  }

  noOneDigitNums(num) {
    return num < 10
      ? `0${num}`
      : num;
  }

  render() {
    const allCards = this.state.fighterArray.map(card => {
      return (
        <React.Fragment key={card.fighterId}>
          <Row className='card-column w-auto'>
            <div onClick={this.handleShowDetails} data-card-fighter-id={card.fighterId} data-card-name={card.fighter} data-card-roster-id={card.rosterId} data-card-display-name={card.displayName} id='character-card' className='row character-card p-0'>
              <div className=''>
                <img className='character-card-img' src={`./images/smash-ultimate-sprites/${card.fighter}.png`} alt={card.fighter} />
                <span className='character-card-number'>{this.noOneDigitNums(card.fighterId)}</span>
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
