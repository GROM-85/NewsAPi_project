import * as key from '../const';
import * as storage from '../storageLogic';
import { refs } from '../refs';
import { renderMarkup, clear } from '../renderMarkup';
import { navArray,toHideCategories } from '../navLogic/navLogic';
import { onloadToRead } from '../addToRead/addToRead';

refs.gallery.addEventListener('click', addToFavorite);
refs.accordion.addEventListener('click', addToFavorite);

export function addToFavorite(e) {
  const btnEl = e.target.closest('.favorite-btn');

  if (btnEl) {
    const cardId = btnEl.parentNode.parentNode.id;
    let collection = storage.loadFromLocal(key.KEY_COLLECTION);

    let favCard = collection.find(obj => obj.id === cardId);

    const favorites = storage.loadFromLocal(key.KEY_FAVORITE) || [];
    const currentPage = storage.loadFromLocal("currentPage") || 'Home';
    console.log(currentPage)

    if (btnEl.classList.contains('hidden-span')) {
      const updatedFavorites = favorites.filter(({ id }) => id !== cardId);
      storage.saveToLocal(key.KEY_FAVORITE, updatedFavorites);
      btnEl.classList.remove('hidden-span');

      if (currentPage === 'Favorite') {
        const cardItem = btnEl.closest('.card__item');
        cardItem.remove();
        if(updatedFavorites.length === 0){
          refs.gallery.insertAdjacentHTML("beforeend","<h2 class='fav-not-found'>Favorites are empty!</h2>");
        }
      }
    } else {
      favorites.push(favCard);
      storage.saveToLocal(key.KEY_FAVORITE, favorites);
      btnEl.classList.add('hidden-span');
    }
  }
}

refs.FavBtn.addEventListener('click', createFavorite);
refs.favBtnMob.addEventListener('click', createFavorite);

function createFavorite() {
  const favorites = storage.loadFromLocal(key.KEY_FAVORITE);
  clear(refs.gallery);
  clear(refs.accordion);
  refs.pageContainer.classList.remove("show");
  refs.notFoundEl.classList.add('hidden');

  if (favorites.length === 0) {
    refs.gallery.insertAdjacentHTML("beforeend","<h2 class='fav-not-found'>You haven't added anything to favorite!</h2>")
    return;
  }
  
  let markup = favorites.map(renderMarkup).join('');

  
  refs.gallery.innerHTML = markup;
  onloadToRead();
  Array.from(refs.gallery.children).forEach(item =>
    item.querySelector('.favorite-btn').classList.add('hidden-span')
  );
}

// ON LOAD
export function onloadFavorite(){
  let favCollection = storage.loadFromLocal(key.KEY_FAVORITE) || [];
  
  if (favCollection.length === 0) return;
  
  for(let obj of favCollection){
    if(!document.getElementById(`${obj.id}`))continue;
    let elem = document.getElementById(`${obj.id}`)
    let favBtn = elem.querySelector('.favorite-btn');
    favBtn.classList.add('hidden-span');
  };
}