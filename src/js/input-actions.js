import { refs } from './refs';

categoriesOnPageLoad();
refs.buttonEL.addEventListener('click', onInputShow);
function onInputShow(evt) {
  refs.inputEl.classList.add('form__input-show');
  refs.svgEl.classList.add('search__icon-show');
  refs.iconBtn.classList.add('icon__button-show');
  refs.buttonEL.classList.add('search__button-hidden');
}
function categoriesOnPageLoad() {
  if (window.matchMedia('(min-width: 769.98px)').matches) {
    refs.inputEl.classList.add('form__input-show');
    refs.svgEl.classList.add('search__icon-show');
    refs.iconBtn.classList.add('icon__button-show');
  }
}
window.addEventListener('resize', e => {
  if (e.target.innerWidth >= 767.9) {
    refs.inputEl.classList.add('form__input-show');
    refs.svgEl.classList.add('search__icon-show');
    refs.buttonEL.classList.add('search__button-hidden');
    refs.iconBtn.classList.add('icon__button-show');
    return;
  }
});
