// newsList - refs на li(card)

//  <li class="card__item">
// <div class="thumb" style="background-image=url("${newApiObject.media}")>
// <span class="thumb__item" >${newApiObject.nytdsection}</span>
<button type="button" data-action="favorite-btn" class="favorite-btn">
  Add to favorite
  <svg class="favorite-icon">
    <use href="../images/icons.svg#favorite"></use>
  </svg>
</button>;
// <img src="${newApiObject.media}"  alt="${newApiObject.title}" loading="lazy" />
// </a>
// </div>
// <div class="info">
// <h2 class="info__title">${newApiObject.title}</h2>
// <p class="info__text">${newApiObject.text}</p>
// <div class=info__meta>
// <p class="info__date">${newApiObject.date}</p>
// <a class="info__link" href="${newApiObject.url}">Read more</a>
// </div>
// </div>
// </li>`;
<svg class="mobile-btn__icon" width="40" height="40">
  <use href="./images/icons.svg#iconmenu"></use>
</svg>;

// let html = "";
//             if (data.meals) {
//                 data.meals.forEach(meal => {
//                     html += `
//                     <div class = "meal-item" data-id = "${meal.idMeal}">
//                         <div class = "meal-img">
//                             <img src = "${meal.strMealThumb}" alt = "food">
//                         </div>
//                         <div class = "meal-name">
//                             <h3>${meal.strMeal}</h3>
//                         </div>
//                         <div class = "meal-buttons">
//                             <button type="button" data-action='recipe-btn' class="recipe-btn">Get Recipe</button>
//                             <button type="button" data-action='favorite-btn' class="favorite-btn">Add to favorite</button>
//                         </div>
//                     </div>
//                 `;
//                 });

newsList.addEventListener('click', addToFavorite);

function addToFavorite(event) {
  // if (event.target.classList.contains)  якщо по класу
  if (event.target.dataset.action === 'favorite-btn') {
    // let newsItem = event.target.closest(dataset.id);
    // newsItem - це id-шнік, або інший параметр, по якому буде вибірка
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (event.target.classList.contains('removeFavorite - btn')) {
      const updatedFavorites = favorites.filter(id => id !== newsItem);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      event.target.textContent = 'Add to favorite';
      event.target.classList.remove('removeFavorite-btn');
    }
    {
      favorites.push(newsItem);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      event.target.textContent = 'Remove from favorite';
      event.target.classList.add('removeFavorite-btn');
      // removeFavorite-btn - це клас стилізації кнопки(fill сердечка)
    }
  }
}

function setFavoritesOnLoad(event) {
  // цю функцію потрібно викликати після рендера картки, тобто після newsList.innerHTML = markup
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites.forEach(id => {
    const ItemNew = document.querySelector(`[data-id=""${id}]`);
    const favoriteBtn = ItemNew.querySelector(`[data-action='favorite-btn']`);
    favoriteBtn.classList.add('removeFavorite-btn');
    favoriteBtn.textContent = 'Remove from favorite';
  });
}

newsList.addEventListener('click', addToFavorite);
