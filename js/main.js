/* eslint-disable no-unused-vars */
/* exported data */

const $characterList = document.querySelector('#character-list');

const renderCharacterList = (entry, handleCharacterId) => {
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
  // 4, 13, 21, 25, 28, 60, 66
  if (entry.number < 10) {
    $characterCardNum.textContent = `0${handleCharacterId.currentNumber}`;
  } else {
    $characterCardNum.textContent = handleCharacterId.currentNumber;
  }
  if (entry.id === 30) {
    $characterCardName.textContent = 'game & watch';
  } else {
    $characterCardName.textContent = entry.name;
  }
  if ((handleCharacterId.currentNumber === 4 ||
    handleCharacterId.currentNumber === 13 ||
    handleCharacterId.currentNumber === 21 ||
    handleCharacterId.currentNumber === 25 ||
    handleCharacterId.currentNumber === 28 ||
    handleCharacterId.currentNumber === 60 ||
    handleCharacterId.currentNumber === 66) &&
    (handleCharacterId.ignoreDuplicateCounter === 0)) {
    handleCharacterId.ignoreDuplicateCounter++;
  } else {
    handleCharacterId.currentNumber++;
    handleCharacterId.ignoreDuplicateCounter = 0;
  }
  handleCharacterId.currentId++;
  $cardColumn.appendChild($characterCard);
  $characterCard.appendChild($columnFull);
  $columnFull.appendChild($characterCardImg);
  $columnFull.appendChild($characterCardNum);
  $columnFull.appendChild($characterCardName);
  return $cardColumn;
};

const handleCharacterList = () => {
  const handleCharacterId = {
    currentId: 1,
    currentNumber: 1,
    ignoreDuplicateCounter: 0
  };

  for (let i = 0; i < data.characters.length; i++) {
    $characterList.appendChild(renderCharacterList(data.characters[i], handleCharacterId));
  }
};

handleCharacterList();
