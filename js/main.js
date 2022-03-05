/* eslint-disable no-unused-vars */
/* exported data */

let currentCharacterId = 1;
let currentBackgroundImgIndex = 0;
let backgroundImgIntervalId = null;

const $h1 = document.querySelector('h1');
const $characterList = document.querySelector('#character-list');
const $characterDetails = document.querySelector('#character-details');
const $backgroundImgs = document.querySelectorAll('.background-images');
const $homeButton = document.querySelector('#home-button');
const $frameDataSection = document.querySelector('#frame-data-section');
const $characterName = document.querySelector('#character-name');
const $characterImg = document.querySelector('#character-img');
const $heartDetails = document.querySelector('#heart-icon__details');
const $heartList = document.querySelector('#heart-icon__list');
const $noFavorites = document.querySelector('#no-favorites');
const $homeAnchor = document.querySelector('#home-anchor');

$characterList.addEventListener('click', handleShowCharacterDetails);
$heartDetails.addEventListener('click', handleFavoriting);
$heartList.addEventListener('click', handleHeartList);
$homeButton.addEventListener('click', handleShowCharacterList);
$homeAnchor.addEventListener('click', handleShowCharacterList);

function handleShowCharacterList(event) {
  $homeButton.classList.add('hidden');
  $noFavorites.classList.add('hidden');
  $characterDetails.classList.add('hidden');
  $characterList.classList.remove('hidden');
  $heartList.classList.remove('hidden');
  $heartDetails.classList.remove('favorited-heart');
  $frameDataSection.replaceChildren();
  data.currentCardIndex = null;
  data.currentCardOwnerId = null;
  data.currentCardName = null;
  data.currentCardDisplayName = null;
  const $cardColumns = document.querySelectorAll('.card-column');
  $h1.textContent = 'smash ultimate fighter list';
  for (let i = 0; i < $cardColumns.length; i++) {
    $cardColumns[i].classList.remove('hidden');
  }
  data.view = 'character-list';
}

function handleHeartList(event) {
  let favoriteCounter = 0;
  if (data.view === 'character-list') {

    const $cardColumns = document.querySelectorAll('.card-column');
    for (let i = 0; i < $cardColumns.length; i++) {
      if ($cardColumns[i].dataset.isFavorite === 'false') {
        $cardColumns[i].classList.add('hidden');
      } else {
        favoriteCounter++;
      }
    }
    if (favoriteCounter === 0) {
      $noFavorites.classList.remove('hidden');
    }

    $h1.textContent = 'favorite fighters';
    $heartList.classList.add('hidden');
    $homeButton.classList.remove('hidden');
    data.view = 'favorite-list';
  }
}

function handleFavoriting(event) {
  const $cardColumns = document.querySelectorAll('.card-column');
  if ($cardColumns[data.currentCardIndex - 1].dataset.isFavorite === 'true') {
    $cardColumns[data.currentCardIndex - 1].dataset.isFavorite = 'false';
    $heartDetails.classList.remove('favorited-heart');
  } else {
    $cardColumns[data.currentCardIndex - 1].dataset.isFavorite = 'true';
    $heartDetails.classList.add('favorited-heart');
  }
}

function handleShowCharacterDetails(event) {
  if (event.target.matches('#character-list')) {
    return;
  }
  $homeButton.classList.remove('hidden');
  $characterList.classList.add('hidden');
  $characterDetails.classList.remove('hidden');
  $heartList.classList.add('hidden');
  const $currentCardColumn = event.target.closest('.card-column');
  data.currentCardName = $currentCardColumn.closest('.card-column').getAttribute('data-card-name');
  data.currentCardIndex = $currentCardColumn.closest('.card-column').getAttribute('data-card-id') * 1;
  data.currentCardOwnerId = $currentCardColumn.closest('.card-column').getAttribute('data-card-owner-id') * 1;
  const $currentName = $currentCardColumn.querySelector('.character-card__name').textContent;
  $characterImg.src = `../images/smash-ultimate-sprites/${data.currentCardName}.png`;
  $characterImg.alt = data.currentCardName;
  $characterName.textContent = $currentName;
  if ($currentCardColumn.dataset.isFavorite === 'true') {
    $heartDetails.classList.add('favorited-heart');
  } else {
    $heartDetails.classList.remove('favorited-heart');

  }
  data.view = 'character-details';
  handleDataTable();
}

const handleCharacterList = () => {

  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.kuroganehammer.com/api/characters');
  xhr.responseType = 'json';
  xhr.addEventListener('load', () => {
    for (let i = 1; i < xhr.response.length; i++) {
      $characterList.appendChild(renderCharacterList(xhr.response[i]));
    }
    const xhr2 = new XMLHttpRequest();
    xhr2.open('GET', 'https://api.kuroganehammer.com/api/characters?game=ultimate');
    xhr2.responseType = 'json';
    xhr2.addEventListener('load', () => {
      for (let i = 1; i < xhr2.response.length; i++) {
        $characterList.appendChild(renderCharacterList(xhr2.response[i]));
      }
      var $characterCard = document.querySelectorAll('.character-card');
    });
    xhr2.send();
  });
  xhr.send();
};

handleCharacterList();

const renderCharacterList = entry => {
  const $cardColumn = document.createElement('div');
  const $characterCard = document.createElement('div');
  const $columnFull = document.createElement('div');
  const $characterCardImg = document.createElement('img');
  const $characterCardNum = document.createElement('span');
  const $characterCardName = document.createElement('h3');

  $cardColumn.className = 'card-column';
  $characterCard.className = 'row character-card';
  $columnFull.className = 'column-full';
  $characterCardImg.className = 'character-card__img';
  $characterCardNum.className = 'character-card__number';
  $characterCardName.className = 'character-card__name';
  $cardColumn.setAttribute('data-card-id', currentCharacterId);
  $cardColumn.setAttribute('data-card-owner-id', entry.OwnerId);
  $cardColumn.setAttribute('data-card-name', entry.Name);
  $cardColumn.setAttribute('data-is-favorite', false);
  $characterCardImg.src = `../images/smash-ultimate-sprites/${entry.Name}.png`;
  $characterCardImg.alt = entry.DisplayName;
  $characterCardName.textContent = entry.DisplayName;
  if (currentCharacterId < 10) {
    $characterCardNum.textContent = `0${currentCharacterId}`;
  } else {
    $characterCardNum.textContent = currentCharacterId;
  }

  $cardColumn.appendChild($characterCard);
  $characterCard.appendChild($columnFull);
  $columnFull.appendChild($characterCardImg);
  $columnFull.appendChild($characterCardNum);
  $columnFull.appendChild($characterCardName);
  currentCharacterId++;
  return $cardColumn;
};

const handleDataTable = () => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `https://api.kuroganehammer.com/api/characters/${data.currentCardOwnerId}/moves`);
  xhr.responseType = 'json';
  xhr.addEventListener('load', () => {
    for (let i = 0; i < xhr.response.length - 4; i++) {
      $frameDataSection.appendChild(renderDataTable(xhr.response[i]));
    }
  });
  xhr.send();
};

const renderDataTable = entry => {
  const $tableRow = document.createElement('tr');
  const $tableCol1 = document.createElement('td');
  const $tableCol2 = document.createElement('td');
  const $tableCol3 = document.createElement('td');

  $tableCol1.textContent = entry.Name;
  $tableCol2.textContent = entry.HitboxActive;
  $tableCol3.textContent = entry.FirstActionableFrame;

  $tableRow.appendChild($tableCol1);
  $tableRow.appendChild($tableCol2);
  $tableRow.appendChild($tableCol3);
  return $tableRow;
};

const handleImageSwap = () => {
  if (currentBackgroundImgIndex === $backgroundImgs.length - 2) {
    currentBackgroundImgIndex = 0;
  } else {
    currentBackgroundImgIndex++;
  }
  for (let i = 0; i < $backgroundImgs.length; i++) {
    if (currentBackgroundImgIndex === $backgroundImgs[i].getAttribute('data-carousel-index') * 1) {
      $backgroundImgs[i].classList.remove('hidden');
    } else {
      $backgroundImgs[i].classList.add('hidden');
    }
  }
  intervalTimer();
};

function intervalTimer() {
  clearInterval(backgroundImgIntervalId);
  backgroundImgIntervalId = setInterval(() => {
    handleImageSwap();
  }, 10000);
}

intervalTimer();
