import { NewsAPI } from './js/API/fetchAPI';
// import mobile-menu.js(dima naumets)
// import '../src/js/mobile-menu';
import '../src/js/input-actions';

const newsFetch = new NewsAPI();

// get categories 50 results
newsFetch.getCategories().then(console.log);

// get popular 20 results
newsFetch.getPopularNews().then(console.log);

// get news by query/date 10 results
newsFetch.query = 'apple';
newsFetch.getNewsByQuery().then(console.log);

// get by category name
newsFetch.getNewsByCategories().then(console.log);
