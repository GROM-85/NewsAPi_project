// newsList - refs на li(card)
//

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
