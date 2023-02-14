import * as key from '../const';
import { onloadToRead, toggleToRead } from '../addToRead/addToRead';
import * as storage from '../storageLogic';
import * as render from '../renderMarkup';
import { refs } from '../refs';

refs.gallery.addEventListener('click', toggleToRead);

//========================
// ACCORDION  fold/unfold
//========================
refs.accordion.addEventListener('click', e => {
  if (!e.target.matches('.accord__arrow')) return;
  console.log(e.target.parentNode.parentNode.parentNode);
  let content =
    e.target.parentNode.parentNode.parentNode.querySelector('.accord__content');
  console.log(content);
  let arrow = e.target;
  if (e.target.matches('.js-down')) {
    arrow.nextElementSibling.hidden = !arrow.nextElementSibling.hidden;
  } else {
    arrow.previousElementSibling.hidden = !arrow.previousElementSibling.hidden;
  }
  arrow.hidden = !arrow.hidden;
  content.classList.toggle('slide');
});
//========================
// CREATE ACCORDION
//========================
refs.ReadBtn.addEventListener('click', createAccord);

function createAccord() {
  let readCollection = storage.loadFromLocal(key.KEY_READ) || [];

//========================
//SORT BY DATE
//========================

let sortedCollection = readCollection.sort(
  (objA, objB) => Number(Object.keys(objB)[0]) - Number(Object.keys(objA)[0])
);

let markup = [];
sortedCollection.forEach(obj => {
  console.log(obj);
  for (let [date, objArr] of Object.entries(obj)) {
    let accordMarkup = objArr.map(render.renderMarkup).join('');
    markup.push(
      `<div class="accord__container">${render.renderAccordion(
        date
      )}<div class="accord__content">${accordMarkup}</div></div>`
    );
  }
});
render.clear(refs.gallery);
render.clear(refs.accordion);
refs.accordion.insertAdjacentHTML('beforeend', markup.join(''));

onloadToRead();
}
