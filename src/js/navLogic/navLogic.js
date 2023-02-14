import * as key from '../const';
import { refs } from '../refs';
import * as storage from '../storageLogic';
import * as render from '../renderMarkup';

// import in index.js

refs.nav.addEventListener('click', e => {
  let curr = e.target.parentNode;
  let list = e.currentTarget.children;
  clearNavCurrent(list);
  curr.classList.add('current-list__item');
  storage.saveToLocal(key.KEY_CURRENT_PAGE, curr.textContent);
  toHideCategories(curr.textContent);
});

export function clearNavCurrent(root) {
  Array.from(root).forEach(elem => {
    if (elem.classList.contains('current-list__item'))
      elem.classList.remove('current-list__item');
  });
}
const navArray = ['Favorite', 'Read'];
function toHideCategories(currentPage) {
  if (navArray.includes(currentPage)) {
    refs.categoriesContainer.classList.add('hidden-categories');
  } else {
    refs.categoriesContainer.classList.remove('hidden-categories');
  }
}
