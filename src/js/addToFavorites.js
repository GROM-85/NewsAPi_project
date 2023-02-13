import * as key from './const';
import * as storage from './storageLogic';
import getRefs from './refs';
import { cards } from '..';
import { renderMarkup, clear } from './renderMarkup';

const refs = getRefs();
refs.gallery.addEventListener('click', addToFavorite);

export function addToFavorite(e) {
  const btnEl = e.target.closest('.favorite-btn');

  if (btnEl) {
    // btnEl.classList.toggle('hidden-span');

    const cardId = btnEl.parentNode.parentNode.id;
    let collection = storage.loadFromLocal(key.KEY_COLLECTION);

    let favCard = collection.find(obj => obj.id === cardId);
    // console.log(favCard);

    const favorites = storage.loadFromLocal(key.KEY_FAVORITE) || [];

    // console.log(favorites);

    if (btnEl.classList.contains('hidden-span')) {
      const updatedFavorites = favorites.filter(id => id !== cardId);
      storage.saveToLocal(key.KEY_FAVORITE, updatedFavorites);
      btnEl.classList.remove('hidden-span');
      console.log(updatedFavorites);
    } else {
      favorites.push(favCard);
      storage.saveToLocal(key.KEY_FAVORITE, favorites);
      btnEl.classList.add('hidden-span');
    }
  }
}

refs.FavBtn.addEventListener('click', createFavorite);

function createFavorite() {
  const favorites = storage.loadFromLocal(key.KEY_FAVORITE);
  console.log(favorites);
  if (!favorites) return;
  let markup = favorites.map(renderMarkup).join('');

  clear(refs.gallery);
  refs.gallery.insertAdjacentHTML = markup;
}
