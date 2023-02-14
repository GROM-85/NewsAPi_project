import * as key from '../const';
import * as storage from '../storageLogic';
import { refs } from '../refs';
import { renderMarkup, clear } from '../renderMarkup';

refs.gallery.addEventListener('click', addToFavorite);

export function addToFavorite(e) {
  const btnEl = e.target.closest('.favorite-btn');

  if (btnEl) {
    const cardId = btnEl.parentNode.parentNode.id;
    let collection = storage.loadFromLocal(key.KEY_COLLECTION);

    let favCard = collection.find(obj => obj.id === cardId);

    const favorites = storage.loadFromLocal(key.KEY_FAVORITE) || [];
    const currentPage = storage.loadFromLocal(key.KEY_CURRENT_PAGE) || 'Home';

    if (btnEl.classList.contains('hidden-span')) {
      const updatedFavorites = favorites.filter(({ id }) => id !== cardId);
      storage.saveToLocal(key.KEY_FAVORITE, updatedFavorites);
      btnEl.classList.remove('hidden-span');

      if (currentPage === 'Favorite') {
        const cardItem = btnEl.closest('.card__item');
        cardItem.remove();
      }
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
  if (!favorites) return;
  let markup = favorites.map(renderMarkup).join('');

  clear(refs.gallery);
  refs.gallery.innerHTML = markup;
  Array.from(refs.gallery.children).forEach(item =>
    item.querySelector('.favorite-btn').classList.add('hidden-span')
  );
}
