import { NewsAPI } from './API/fetchAPI';
import getRefs from './refs';
import { renderMarkup, clear, renderWether } from './renderMarkup';
import * as key from './const';
import * as storage from './storageLogic';
import * as newsCard from './newsCard';
import format from 'date-fns/format';
import { addToFavorite, setFavoritesOnLoad } from './addToFavorites';

const newsFetch = new NewsAPI();
const refs = getRefs();

refs.filter.addEventListener(`submit`, filterQuery);

async function filterQuery(e) {
  e.preventDefault();

  let date = format(Date.now(), 'yyyyMMdd');

  newsFetch.resetPage();

  newsFetch.query = refs.filterInput.value;

  const { docs, meta } = await newsFetch.getNewsByQuery();

  let collectionByQuery = [];
  collectionByQuery = docs.map(result => {
    const { abstract, pub_date, uri, url, multimedia, section_name, headline } =
      result;
    console.log('result', result);
    if (multimedia) {
      imgUrl = 'https://www.nytimes.com/' + multimedia[2]['url'];
      console.log(imgUrl);
    } else {
      imgUrl =
        'https://www.shutterstock.com/image-photo/canadian-national-flag-overlay-false-260nw-1720481365.jpg';
    }

    const newDateFormat = corectDate(pub_date);

    let obj = {
      imgUrl,
      title: headline.main,
      text: abstract,
      date: newDateFormat,
      url,
      categorie: section_name,
      id: uri,
    };
    return obj;
  });

  clear(refs.gallery);

  storage.saveToLocal(key.KEY_COLLECTION, collectionByQuery.slice(0, 9));

  categoriesOnPageLoadGallery();
  categoriesOnResizeGallery();
}
function categoriesOnResizeGallery() {
  window.addEventListener('resize', e => {
    let collection = storage.loadFromLocal(key.KEY_COLLECTION);
    if (e.currentTarget.innerWidth <= 768) {
      collection = collection.slice(0, 3);
    } else if (e.currentTarget.innerWidth <= 1280) {
      collection = collection.slice(0, 7);
    } else {
      collection = collection.slice(0, 8);
    }
    clear(refs.gallery);
    collectionByPopular = collection.map(renderMarkup).join(``);
    renderGallery(collectionByPopular);

    wetherRender();
  });
}
function categoriesOnPageLoadGallery() {
  let collection = storage.loadFromLocal(key.KEY_COLLECTION);
  let collectionByPopular;
  if (window.matchMedia('(max-width: 768px)').matches) {
    collection = collection.slice(0, 3);
    //   collectionByPopular = collection.map(renderMarkup).join(``);
    //   renderGallery(collectionByPopular);
  } else if (window.matchMedia('(max-width: 1280px)').matches) {
    collection = collection.slice(0, 7);
  } else {
    collection = collection.slice(0, 8);
  }
  collectionByPopular = collection.map(renderMarkup).join(``);
  renderGallery(collectionByPopular);
  wetherRender();
}

function renderGallery(markup) {
  refs.gallery.insertAdjacentHTML(`beforeend`, markup);
  refs.gallery.addEventListener('click', addToFavorite);
}
//*******renderedWether******************* */
function wetherRender() {
  if (window.matchMedia('(min-width: 1279.98px)').matches) {
    replacedItem = refs.gallery.childNodes[1];
    console.log(replacedItem);
    const markup = renderWether();
    replacedItem.insertAdjacentHTML(`afterend`, markup);
  } else if (window.matchMedia('(min-width: 767.98px)').matches) {
    replacedItem = refs.gallery.firstElementChild;
    const markup = renderWether();
    replacedItem.insertAdjacentHTML(`afterend`, markup);
  } else {
    replacedItem = refs.gallery.firstElementChild;
    const markup = renderWether();
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
