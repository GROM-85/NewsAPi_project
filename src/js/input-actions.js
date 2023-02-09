const buttonEL = document.querySelector('.js-button-search');
const inputEl = document.querySelector('.form__input-close');
const svgEl = document.querySelector('.search__icon-hidden');
console.log(svgEl);

buttonEL.addEventListener('click', onInputShow);

function onInputShow(evt) {
  inputEl.classList.add('form__input-show');
  svgEl.classList.add('search__icon-show');
  buttonEL.classList.add('search__button-hidden');
}
