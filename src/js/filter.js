import { NewsAPI } from './API/fetchAPI';
import { refs } from './refs';
import { renderMarkup, clear, renderWeather } from './renderMarkup';
import { corectDate } from './newsCard';
import * as weather from './weather';
import * as key from './const';
import * as storage from './storageLogic';
import { addToFavorite, onloadFavorite } from './addToFavorites/addToFavorites';
import { onloadToRead } from './addToRead/addToRead';
import { clearNavCurrent } from './navLogic/navLogic';

const newsFetch = new NewsAPI();

refs.filter.addEventListener(`submit`, filterQuery);

async function filterQuery(e) {
  let imgUrl;
  e.preventDefault();
  newsFetch.resetPage();
  //повертає значення з імпуту
  const form = e.currentTarget.elements.searchArt.value;
  // не здійснює пошук, якщо нічого не введено
  if (!form) {
    return;
  }
  newsFetch.query = form;
  const { docs, meta } = await newsFetch.getNewsByQuery();
  //якщо не знайдено даних по запиту, вертає NOT A FOUND

  if (docs.length === 0) {
    if (refs.notFoundEl.classList.contains('hidden')) {
      refs.notFoundEl.classList.remove('hidden');
    }
    clear(refs.gallery);
  } else {
    if (!refs.notFoundEl.classList.contains('hidden')) {
      refs.notFoundEl.classList.add('hidden');
    }

    let collectionByQuery = [];

    collectionByQuery = docs.map(result => {
      const {
        abstract,
        pub_date,
        uri,
        web_url,
        multimedia,
        section_name,
        headline,
      } = result;

      if (multimedia.length !== 0) {
        imgUrl = 'https://www.nytimes.com/' + multimedia[2]['url'];
      } else {
        imgUrl = 'https://media4.giphy.com/media/h52OM8Rr5fLiZRqUBD/giphy.gif';
      }

      const newDateFormat = corectDate(pub_date);
      let obj = {
        imgUrl,
        title: headline.main,
        text: abstract,
        date: newDateFormat,
        url: web_url,
        categorie: section_name,
        id: uri,
      };
      return obj;
    });

    clear(refs.gallery);
    clear(refs.accordion);
    clearNavCurrent(refs.nav.children);
    refs.HomeBtn.parentNode.classList.add('current-list__item');
    storage.saveToLocal(key.KEY_COLLECTION, collectionByQuery.slice(0, 9));

  categoriesOnPageLoadGallery();
}
}

function categoriesOnPageLoadGallery() {
  let collection = storage.loadFromLocal(key.KEY_COLLECTION);
  let collectionByPopular;
  if (window.matchMedia('(max-width: 768px)').matches) {
    collection = collection.slice(0, 3);
    //   collectionByPopular = collection.map(renderMarkup).join(``);
    //   renderGallery(collectionByPopular);
  } else if (window.matchMedia('(max-width: 1280px)').matches) {
    collection = collection.slice(0, 8);
  } else {
    collection = collection.slice(0, 9);
  }
  collectionByPopular = collection.map(renderMarkup).join(``);
  renderGallery(collectionByPopular);
  onloadToRead();
  onloadFavorite();
  //   weather.renderDefaultWeather();
}
function renderGallery(markup) {
  refs.gallery.insertAdjacentHTML(`beforeend`, markup);
  refs.gallery.addEventListener('click', addToFavorite);
}
//*******renderedWether******************* */
function weatherRender() {
  let replacedItem;
  if (window.matchMedia('(min-width: 1279.98px)').matches) {
    replacedItem = refs.gallery.childNodes[1];
    console.log(replacedItem);
    const markup = renderWeather();
    replacedItem.insertAdjacentHTML(`afterend`, markup);
  } else if (window.matchMedia('(min-width: 767.98px)').matches) {
    replacedItem = refs.gallery.firstElementChild;
    const markup = renderWeather();
    replacedItem.insertAdjacentHTML(`afterend`, markup);
  } else {
    replacedItem = refs.gallery.firstElementChild;
    const markup = renderWeather();
    replacedItem.insertAdjacentHTML(`beforebegin`, markup);
  }
}
function corectDate(date) {
  let newDateFormat = date.split('-');
  let maxElement = { index: length };

  newDateFormat.forEach((el, index) => {
    maxElement.index = index;
    maxElement.length = length;
    console.log(el.length, index);
  });
  newDateFormat[maxElement.index] = newDateFormat[maxElement.index].slice(0, 2);
  newDateFormat = newDateFormat.slice(0, 3);
  newDateFormat = newDateFormat.join('/');

  return newDateFormat;
}
//************************ *//
