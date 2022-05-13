import React from 'react';
// import fetch from 'node-fetch';
// export default function FighterList(props) {
//   const [test, setTest] = useState(null);

//   fetch('https://api.kuroganehammer.com/api/characters?game=ultimate', {
//     // mode: 'no-cors',
//     method: 'GET',
//     headers: {
//       accept: 'application/json'
//     }
//   })
//     .then(res => res.json())
//     .then(json => {
//       // console.log(json);
//         <h1 key={json[0].OwnerId}>{json[0].DisplayName}</h1>;
//     })
//     .then(data => {
//       setTest(data);
//     })
//     .catch(err => console.error('Fetch failed!', err));
//   return (
//     <h1>{test}</h1>
//   );
// }

export default class FighterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: null
    };
  }

  render() {
    return (
      <h1>Testing</h1>
    );
  }
}
