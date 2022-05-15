import React from 'react';
import Row from 'react-bootstrap/Row';
export default class FighterCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: [],
      cardCounter: 1
    };
  }

  componentDidMount() {
    fetch('https://api.kuroganehammer.com/api/characters?game=ultimate', {
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

  render() {
    let cardCounter = 0;
    const allCards = this.state.test.map(card => {
      cardCounter++;
      return (
        <>
          <Row key={card.OwnerId} className='card-column w-auto' data-card-id={cardCounter} data-owner-id={cardCounter + 1} data-card-name={card.DisplayName}>
            <div className='row character-card p-0'>
              <div className=''>
                <img className='character-card-img' src={`./images/smash-ultimate-sprites/${card.Name}.png`} alt={card.DisplayName} />
                <span className='character-card-number'></span>
                <h3 className='character-card-name'>{card.DisplayName}</h3>
              </div>
            </div>
          </Row>
        </>
      );
    });
    return (
      <div className="row content-layout" data-view='character-list'>
        { allCards }
      </div>
    );
  }
}
