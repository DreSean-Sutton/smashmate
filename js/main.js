/* eslint-disable no-unused-vars */
/* exported data */
const $characterList = document.querySelector('#character-list');
// const $test = document.querySelector('#test');

// $test.alt = data.characters.bayonetta.name;

const renderCharacterList = entry => {
  // debugger;
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

  $characterCardImg.src = `../images/smash-ultimate-sprites/${entry.imgURL}`;
  if (entry.number < 10) {
    $characterCardNum.textContent = `0${entry.number}`;
  } else {
    $characterCardNum.textContent = entry.number;
  }
  $characterCardName.textContent = entry.name;

  $cardColumn.appendChild($characterCard);
  $characterCard.appendChild($columnFull);
  $columnFull.appendChild($characterCardImg);
  $columnFull.appendChild($characterCardNum);
  $columnFull.appendChild($characterCardName);
  return $cardColumn;
};
