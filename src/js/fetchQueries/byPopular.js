import { ApiService, NewsAPI } from '../API/fetchAPI';
import { refs } from '../refs';
import { renderMarkup, clear} from '../renderMarkup';
import * as key from '../const';
import * as storage from '../storageLogic';
import { onloadToRead } from '../addToRead/addToRead';
import * as weather from '../weather';
import { onloadFavorite } from '../addToFavorites/addToFavorites';
import { hideLoader,showLoader } from '../loader/loader';
import { paginationByPopular } from '../pagination/paginationByPopular';
import { removeEventListeners } from './removeListeners';


//render first page with popular news
window.addEventListener('load',() => {
  fetchByPopular();
  // remove listeners
  removeEventListeners();
} );

refs.HomeBtn.addEventListener('click', () => {
  fetchByPopular();
  // remove listeners
  removeEventListeners();
});
refs.homeBtnMob.addEventListener('click', () => {
  fetchByPopular();
  removeEventListeners();
});


//=============
// fecth by popular
//=============
async function fetchByPopular() {
  
  showLoader();
  // load popular news
  ApiService.lastAction.searchBy = "popular";
  const docs = await ApiService.getPopularNews();
  let collectionByPopular = [];
  collectionByPopular = docs.map(result => {
    const { uri, section, title, abstract, published_date, url, media } =
      result;
    let imgUrl;
    if (result.media[0] !== undefined) {
      imgUrl = result.media[0]['media-metadata'][2]['url'];
    } else {
      imgUrl = 'https://media4.giphy.com/media/h52OM8Rr5fLiZRqUBD/giphy.gif';
    }

    let newDateFormat = formatDate(published_date);
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
  
  storage.saveToLocal(key.KEY_COLLECTION, collectionByPopular);
  clear(refs.gallery);
  clear(refs.accordion);
  refs.notFoundEl.classList.add('hidden');
  popularOnPageLoad();
  paginationByPopular(collectionByPopular.length);
  setTimeout(()=> {
    refs.pageContainer.classList.add("show");
  },500)
  
}

export function popularOnPageLoad() {
  let collection = storage.loadFromLocal(key.KEY_COLLECTION);
  let collectionByPopular;
  if (window.matchMedia('(max-width: 768px)').matches) {
    collection = collection.slice(0, 3);
  } else if (window.matchMedia('(max-width: 1280px)').matches) {
    collection = collection.slice(0, 7);
  } else {
    collection = collection.slice(0, 8);
  }
  collectionByPopular = collection.map(renderMarkup).join(``);
  
  renderGallery(collectionByPopular);
  
  //weather.getGeoLocation();
}

export async function renderGallery(markup) {
  let weatherMarkup = await weather.renderDefaultWeather();
  hideLoader();
  refs.gallery.insertAdjacentHTML(`beforeend`,weatherMarkup +  markup);
  onloadToRead();
  onloadFavorite();
}


export function formatDate(date) {
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

