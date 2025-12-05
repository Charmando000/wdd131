/* main/app.js
   Dynamic renderer for country cards, favorites (localStorage) and interactive behaviors.
   - Uses objects, arrays, and array methods
   - Uses template literals exclusively for markup strings
   - Uses localStorage to remember favorites
*/

const countries = [
  {
    id: 'paraguay',
    title: 'Paraguay',
    summary: 'My home country. Born in Asunción and raised surrounded by traditional food and festivals.',
    img: 'images/paraguay.webp'
  },
  {
    id: 'argentina',
    title: 'Argentina',
    summary: 'I served a mission in Buenos Aires; I grew to love the people, the food and mate culture.',
    img: 'images/argentina.webp'
  },
  {
    id: 'brasil',
    title: 'Brazil',
    summary: 'I moved to Brazil and found new experiences, friendships and a new way of life.',
    img: 'images/brasil.webp'
  }
];

// Return array of favorite IDs from localStorage
function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  } catch (e) {
    return [];
  }
}

// Save favorites array to localStorage
function setFavorites(list) {
  localStorage.setItem('favorites', JSON.stringify(list));
}

// Check if a country is a favorite
function isFavorite(id) {
  const fav = getFavorites();
  return fav.includes(id);
}

// Toggle favorite state and re-render
function toggleFavorite(id) {
  let fav = getFavorites();
  if (fav.includes(id)) {
    fav = fav.filter(x => x !== id);
  } else {
    fav.push(id);
  }
  setFavorites(fav);
  renderCountryCards('#countries');
}

// Render country cards into a container
function renderCountryCards(selector) {
  const container = document.querySelector(selector);
  if (!container) return;

  container.innerHTML = countries.map(c => {
    const favText = isFavorite(c.id) ? 'Remove favorite' : 'Add favorite';
    const btnClass = isFavorite(c.id) ? 'fav active' : 'fav';
    return `
      <article class="country-card" id="card-${c.id}">
        <img loading="lazy" src="${c.img}" alt="${c.title}">
        <div class="card-body">
          <h3>${c.title}</h3>
          <p>${c.summary}</p>
          <p>
            <a href="${c.id}.html">Read more</a>
            <button class="${btnClass}" data-id="${c.id}" aria-pressed="${isFavorite(c.id)}">${favText}</button>
          </p>
        </div>
      </article>`;
  }).join('');

  // Add a small indicator if user has favorites
  const favs = getFavorites();
  const indicatorId = 'favIndicator';
  let indicator = document.getElementById(indicatorId);
  if (!indicator) {
    indicator = document.createElement('div');
    indicator.id = indicatorId;
    indicator.style.fontSize = '0.9rem';
    indicator.style.marginTop = '0.5rem';
    container.parentNode.insertBefore(indicator, container);
  }
  indicator.textContent = favs.length ? `Saved favorites: ${favs.length}` : '';
}

// Event delegation for favorite buttons
document.addEventListener('click', (e) => {
  const btn = e.target.closest('button.fav');
  if (!btn) return;
  const id = btn.dataset.id;
  if (!id) return;
  toggleFavorite(id);
});

// On load, render cards
document.addEventListener('DOMContentLoaded', () => {
  renderCountryCards('#countries');
});
