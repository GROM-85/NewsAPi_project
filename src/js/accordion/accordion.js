import * as key from '../const';
import { onloadToRead, toggleToRead } from '../addToRead/addToRead';
import * as storage from '../storageLogic';
import * as render from '../renderMarkup';
import { refs } from '../refs';
import { onloadFavorite } from '../addToFavorites/addToFavorites';


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
  let arrow = e.target.firstElementChild;
  console.dir(arrow)
  arrow.classList.toggle("up")
  content.classList.toggle('slide');
});
//========================
// CREATE ACCORDION
//========================
refs.ReadBtn.addEventListener('click', createAccord);
refs.readBtnMob.addEventListener('click', createAccord);

function createAccord() {
  let readCollection = storage.loadFromLocal(key.KEY_READ) || [];

  if (readCollection.length === 0) {
    render.clear(refs.gallery);
    render.clear(refs.accordion);
    refs.notFoundEl.classList.add('hidden');
    refs.pageContainer.classList.remove("show");
    refs.accordion.insertAdjacentHTML("beforeend","<h2 class='read-not-found' >You haven't read any article</h2>")
    return;
  }

// //========================
// //SORT BY DATE
// //========================

// let sortedCollection = readCollection.sort(
//   (objA, objB) => Number(Object.keys(objB)[0]) - Number(Object.keys(objA)[0])
// );

let markup = [];
readCollection.forEach(obj => {
  const {date, collection} = obj;
  
  let accordMarkup = collection.map(render.renderMarkup).join('');
  markup.push(
    `<div class="accord__container">${render.renderAccordion(
      date
    )}<div class="accord__content">${accordMarkup}</div></div>`
  );
  
});
render.clear(refs.gallery);
render.clear(refs.accordion);
refs.pageContainer.classList.remove("show");
refs.notFoundEl.classList.add('hidden');
refs.accordion.insertAdjacentHTML('beforeend', markup.join(''));
onloadFavorite();
onloadToRead();
}
