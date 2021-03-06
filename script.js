const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

var cities = [];

fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities = data)      //put json data into cities  array

function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi');      //regular expression
    return place.city.match(regex) || place.state.match(regex)
  });
}

function displayMatches() {
  var matchArray = findMatches(this.value, cities);
  var html = matchArray.map(place => {
    var regex = new RegExp(this.value, 'gi');
    var cityName = place.city.replace(regex, `<span class = "hl">${this.value}</span>`);    //text highlight
    var stateName = place.state.replace(regex, `<span class = "hl">${this.value}</span>`);
    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${place.population}</span>
      </li>
    `;
  }).join('');    //removes commas
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
