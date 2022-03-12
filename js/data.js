/* exported data */
// debugger;
let data = {
  view: 'character-list',
  currentCardIndex: null,
  currentCardOwnerId: null,
  currentCardName: null,
  test: null,
  duplicateCharacterList: [],
  favorites: []
};

window.addEventListener('beforeunload', handleLocalStorage);

function handleLocalStorage(event) {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', dataJSON);
}

var previousdataJSON = localStorage.getItem('javascript-local-storage');
if (previousdataJSON !== null) {
  data = JSON.parse(previousdataJSON);
}
