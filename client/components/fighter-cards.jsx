import React from 'react';

// export default function FighterCards(props) {
//   return (
//     fetch('https://api.kuroganehammer.com/api/characters?game=ultimate', {
//     // mode: 'no-cors',
//       method: 'GET',
//       headers: {
//         accept: 'application/json'
//       }
//     })
//       .then(res => res.json())
//       .then(json => {
//       // console.log(json);
//         return (<h1>{json[0].DisplayName}</h1>);
//       })
//       .catch(err => console.error('Fetch failed!', err))
//   );
// }

export default class FighterCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: []
    };
    // this.testFunction = this.testFunction.bind(this);
  }

  componentDidMount() {
    fetch('https://api.kuroganehammer.com/api/characters?game=ultimate', {
      // mode: 'no-cors',
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
    const allCards = this.state.test.map(card => {
      return (
        <>
          <h1 key={card.OwnerId}>{card.DisplayName}</h1>
        </>
      );
    });
    // this.testFunction();
    // console.log(this.state.test);
    return (
      <ul>
        {allCards}
      </ul>
      // <h1>{this.testFunction()}</h1>
    );
  }
}
