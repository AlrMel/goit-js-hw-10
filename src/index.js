import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import Notiflix from 'notiflix';
import './css/styles.css';

const select = document.querySelector('.breed-select');
const loader = document.querySelector(".loader")
const error = document.querySelector(".error")
const catInfo = document.querySelector(".cat-info")

loader.textContent = '';
error.classList.add('is-hidden');


fetchBreeds()
  .then(breeds => markupBreeds(breeds))
  .catch(() => {
    loader.classList.add('is-hidden');
    Notiflix.Notify.failure(error.textContent);
  });

const markupBreeds = breeds => {
  select.classList.remove('is-hidden');
  const optionsMarkup = breeds
    .map(breed => {
      return `<option value="${breed.id}">${breed.name}</option>`;
    })
    .join('');
  select.innerHTML = optionsMarkup;
};

const markupCatInfo = arrCats => {
  if (!arrCats) {
    return Notiflix.Notify.warning(`Ooops! Try reloading the page!`)
  }

  const showInfoAboutCat = arrCats
    .map(({ url, breeds }) => {
      const { name, description, temperament } = breeds[0];

      return `
        <img src="${url}" alt="${name}" width="500" height="300" class="img-settings"/>
      <div class="desc-wrapper">
        <h2>${name}</h2>
        <p class="description">${description}</p>
        <p class="temperament"><b>Temperament: </b>${temperament}</p>
      </div>`;
    })
    .join('');
  catInfo.innerHTML = showInfoAboutCat;
};

function onSelectCat(e) {
  loader.classList.remove('is-hidden');
  catInfo.classList.add('is-hidden');
  const catId = e.target.value;

  fetchCatByBreed(catId)
    .then(data => {
      setTimeout(() => {
        markupCatInfo(data);
      }, 0);
    })
    .catch(() => {
      Notiflix.Notify.failure(error.textContent);
    })
}

select.addEventListener('change', onSelectCat);


