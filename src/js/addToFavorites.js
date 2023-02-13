import * as key from './const';
import * as storage from './storageLogic';

const cardList = document.querySelector('.g');
// const btnEl = document.querySelector(".favorite-btn");

cardList.addEventListener('click', addToFavorite);

function addToFavorite(e) {
  const btnEl = e.target.closest('.favorite-btn');
  if (!btnEl) return;
  btnEl.classList.toggle('hidden-span');
  //   console.log(btnEl);
  const cardId = btnEl.parentNode.id;
  //   console.log(btnId);
  let collection = storage.loadFromLocal(key.KEY_COLLECTION);
  let favCard = collection.find(obj => obj.id === cardId);
  // const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const favorites = storage.loadFromLocal(key.KEY_FAVORITE);
  //   console.log(favorites);
  if (!btnEl.classList.contains('hidden-span')) {
    const updatedFavorites = favorites.filter(id => id !== cardId);
    // localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    storage.saveToLocal(key.KEY_FAVORITE, updatedFavorites);
  } else {
    favorites.push(cardId);
    // localStorage.setItem('favorites', JSON.stringify(favorites));
    storage.saveToLocal(key.KEY_FAVORITE, favorites);
  }
}
function setFavoritesOnLoad() {
  // цю функцію потрібно викликати після рендера картки, тобто після newsList.innerHTML = markup
  // const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const favorites = storage.loadFromLocal(key.KEY_FAVORITE);
  favorites.forEach(id => {
    const itemNew = document.querySelector(`#${id}`);
    const favoriteBtn = itemNew.querySelector('.favorite-btn');
    favoriteBtn.classList.add('hidden-span');
  });
}
