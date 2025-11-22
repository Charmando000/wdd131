const menuButton = document.querySelector("#menu");
const navMenu = document.querySelector(".navigation");

menuButton.addEventListener("click", () => {
  navMenu.classList.toggle("open");

  if (navMenu.classList.contains("open")) {
    menuButton.textContent = "✖";
  } else {
    menuButton.textContent = "☰";
  }
});

const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;


// Temple Data

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
];

function CreateTempleCards(filteredTemples) {
  const container = document.querySelector('.gallery');
  if (!container) return;
  container.innerHTML = '';

  filteredTemples.forEach((temple) => {
    const card = document.createElement('article');
    card.className = 'temple-card';

    const name = document.createElement('h3');
    name.textContent = temple.templeName;

    const img = document.createElement('img');
    img.src = temple.imageUrl;
    img.alt = `${temple.templeName} Temple`;
    img.loading = 'lazy';
    img.className = 'temple-image';

    const loc = document.createElement('p');
    loc.innerHTML = `<span class="label">Location:</span> ${temple.location}`;

    const dedicated = document.createElement('p');
    dedicated.innerHTML = `<span class="label">Dedicated:</span> ${temple.dedicated}`;

    const area = document.createElement('p');
    area.innerHTML = `<span class="label">Size:</span> ${temple.area.toLocaleString()} sq ft`;

    card.appendChild(name);
    card.appendChild(img);
    card.appendChild(loc);
    card.appendChild(dedicated);
    card.appendChild(area);

    container.appendChild(card);
  });
}

function getYearFromDedicated(dedicatedStr) {
  const parts = dedicatedStr.split(',');
  const year = parseInt(parts[0]);
  return isNaN(year) ? null : year;
}

function filterTemples(filter) {
  let result = [];
  switch (filter) {
    case 'old':
      result = temples.filter(t => {
        const y = getYearFromDedicated(t.dedicated);
        return y !== null && y < 1900;
      });
      break;
    case 'new':
      result = temples.filter(t => {
        const y = getYearFromDedicated(t.dedicated);
        return y !== null && y > 2000;
      });
      break;
    case 'large':
      result = temples.filter(t => t.area > 90000);
      break;
    case 'small':
      result = temples.filter(t => t.area < 10000);
      break;
    case 'home':
    default:
      result = temples.slice();
      break;
  }

  CreateTempleCards(result);
}

document.querySelectorAll('.navigation a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const filter = link.dataset.filter || 'home';
    filterTemples(filter);
    if (navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      menuButton.textContent = '☰';
    }
  });
});

CreateTempleCards(temples);