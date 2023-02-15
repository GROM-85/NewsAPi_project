import { NewsAPI } from './API/fetchAPI';
import { refs } from './refs';
import { renderMarkup, clear, renderWeather } from './renderMarkup';
import * as key from './const';
import * as storage from './storageLogic';
import { onloadToRead } from './addToRead/addToRead';
import * as weather from './weather';
import { onloadFavorite } from './addToFavorites/addToFavorites';
import { hideLoader,showLoader } from './loader/loader';





const newsFetch = ApiService;

//listener update main page with popular news//
window.addEventListener('load', fetchByPopular);
refs.HomeBtn.addEventListener('click', fetchByPopular);
refs.homeBtnMob.addEventListener('click', fetchByPopular);

async function fetchByPopular() {
  showLoader();
  let imgUrl;
  const docs = await newsFetch.getPopularNews();
  let collectionByPopular = [];
  collectionByPopular = docs.map(result => {
    const { uri, section, title, abstract, published_date, url, media } =
      result;

    if (result.media[0] !== undefined) {
      imgUrl = result.media[0]['media-metadata'][2]['url'];
    } else {
      imgUrl = 'https://media4.giphy.com/media/h52OM8Rr5fLiZRqUBD/giphy.gif';
    }
    let newDateFormat = published_date.split('-');
    newDateFormat = newDateFormat.join('/');
    let obj = {
      imgUrl,
      title,
      text: abstract,
      date: newDateFormat,
      url,
      categorie: section,
      id: uri,
    };
    return obj;
  });
  storage.saveToLocal(key.KEY_COLLECTION, collectionByPopular.slice(0, 9));
  clear(refs.gallery);
  clear(refs.accordion);
  categoriesOnPageLoad();
  onloadToRead();
  onloadFavorite();
}

export function categoriesOnPageLoad() {
  let collection = storage.loadFromLocal(key.KEY_COLLECTION);
  let collectionByPopular;
  if (window.matchMedia('(max-width: 768px)').matches) {
    collection = collection.slice(0, 3);
  } else if (window.matchMedia('(max-width: 1280px)').matches) {
    collection = collection.slice(0, 3);
  } else if (window.matchMedia('(max-width: 1280px)').matches) {
    collection = collection.slice(0, 7);
  } else {
    collection = collection.slice(0, 8);
    collection = collection.slice(0, 8);
  }
  collectionByPopular = collection.map(renderMarkup).join(``);
  hideLoader();
  renderGallery(collectionByPopular);

  //weather.getGeoLocation();
  weather.renderDefaultWeather();
}
export function renderGallery(markup) {
  refs.gallery.insertAdjacentHTML(`beforeend`, markup);
}
//*********corect dateformat for the card*********** */
export function corectDate(date) {
  let newDateFormat = date.split('-');
  let maxElement = { index: length };

  newDateFormat.forEach((el, index) => {
    maxElement.index = index;
    maxElement.length = length;
  });
  newDateFormat[maxElement.index] = newDateFormat[maxElement.index].slice(0, 2);
  newDateFormat = newDateFormat.slice(0, 3);
  newDateFormat = newDateFormat.join('/');
  let newDateFormat = date.split('-');
  let maxElement = { index: length };

  newDateFormat.forEach((el, index) => {
    maxElement.index = index;
    maxElement.length = length;
  });
  newDateFormat[maxElement.index] = newDateFormat[maxElement.index].slice(0, 2);
  newDateFormat = newDateFormat.slice(0, 3);
  newDateFormat = newDateFormat.join('/');

  return newDateFormat;
}

//TODO
// export function categoriesOnResize() {
//   window.addEventListener('resize', e => {
//     let collection = storage.loadFromLocal(key.KEY_COLLECTION);
//     if (e.currentTarget.innerWidth <= 768) {
//       collection = collection.slice(0, 3);
//     } else if (e.currentTarget.innerWidth <= 1280) {
//       collection = collection.slice(0, 7);
//     } else {
//       collection = collection.slice(0, 8);
//     }
//     clear(refs.gallery);
//     let collectionByPopular = collection.map(renderMarkup).join(``);
//     renderGallery(collectionByPopular);

//     // weather.getGeoLocation();
//     weather.renderDefaultWeather();
//   });
// }
