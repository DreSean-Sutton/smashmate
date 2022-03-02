/* eslint-disable no-unused-vars */
/* exported data */
let currentCharacterId = 0;
const $characterList = document.querySelector('#character-list');

const renderCharacterList = entry => {
  const $cardColumn = document.createElement('div');
  const $characterCard = document.createElement('div');
  const $columnFull = document.createElement('div');
  const $characterCardImg = document.createElement('img');
  const $characterCardNum = document.createElement('span');
  const $characterCardName = document.createElement('h3');

  $cardColumn.classList = 'card-column';
  $characterCard.classList = 'row character-card';
  $columnFull.classList = 'column-full';
  $characterCardImg.classList = 'character-card__img';
  $characterCardNum.classList = 'character-card__number';
  $characterCardName.classList = 'character-card__name';

  // STUFF BELOW WILL BE AFFECTED BY API
  $cardColumn.setAttribute('data-card-id', currentCharacterId);
  $characterCardImg.src = `../images/smash-ultimate-sprites/${entry.name}`;
  $characterCardImg.alt = entry.name;

  $cardColumn.appendChild($characterCard);
  $characterCard.appendChild($columnFull);
  $columnFull.appendChild($characterCardImg);
  $columnFull.appendChild($characterCardNum);
  $columnFull.appendChild($characterCardName);
  currentCharacterId++;
  return $cardColumn;
};

const handleCharacterList = characterListURL => {

  const xhr = new XMLHttpRequest();
  xhr.open('GET', characterListURL);
  xhr.responseType = 'json';
  xhr.addEventListener('load', () => {
    console.log('xhr status:', xhr.status);
    console.log('xhr response:', xhr.response);
    for (let i = 1; i < xhr.response.length; i++) {
      $characterList.appendChild(renderCharacterList(xhr.response[i]));
      console.log(xhr.response[i]);
    }
  });
  xhr.send();
};

handleCharacterList('https://api.kuroganehammer.com/api/characters');
handleCharacterList('https://api.kuroganehammer.com/api/characters?game=ultimate');
