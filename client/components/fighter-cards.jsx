import React from 'react';
import Row from 'react-bootstrap/Row';
export default class FighterCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: [],
      cardCounter: 1
    };
    this.noOneDigitNums = this.noOneDigitNums.bind(this);
  }

  componentDidMount() {
    fetch('https://the-ultimate-api.herokuapp.com/api/fighters', {
      method: 'GET',
      headers: {
        accept: 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => {
        this.setState({
          test: json
        });
      })
      .catch(err => console.error('Fetch failed!', err));
  }

  noOneDigitNums(num) {
    return num < 10
      ? `0${num}`
      : num;
  }

  render() {
    let cardCounter = 0;
    const allCards = this.state.test.map(card => {
      cardCounter++;
      return (
        <React.Fragment key={card.fighterId}>
          <Row className='card-column w-auto' data-card-id={cardCounter} data-card-name={card.fighter}>
            <div className='row character-card p-0'>
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
        { allCards }
      </div>
    );
  }
}
