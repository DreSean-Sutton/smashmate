/* eslint-disable no-unused-vars */
/* exported data */
let currentCharacterId = 1;
let currentBackgroundImgIndex = 0;
let backgroundImgIntervalId = null;

const $characterList = document.querySelector('#character-list');
const $backgroundImgs = document.querySelectorAll('.background-images');

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
    });
    xhr2.send();
  });
  xhr.send();
};

handleCharacterList();

function intervalTimer() {
  clearInterval(backgroundImgIntervalId);
  backgroundImgIntervalId = setInterval(() => {
    handleImageSwap();
  }, 10000);
}

intervalTimer();
