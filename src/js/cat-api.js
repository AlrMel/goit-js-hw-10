import axios from "axios";
import Notiflix from "notiflix";
const API_KEY = "live_oRLnGlqccyIpfSobEeexEkHE0CvE6lZUDs8saHZPMlRqQVgKas0bSehet0gqxr4V";
axios.defaults.headers.common["x-api-key"] = API_KEY;


function fetchBreeds() {
    const breedsURL = "https://api.thecatapi.com/v1/breeds";

Notiflix.Loading.standard('Loading...', {
    backgroundColor: 'rgba(0,0,0,0.8)',
  });
  
    return axios.get(breedsURL)
    .then(response => {

        if (response.status !== 200) {
            throw new Error(response.status);
        }
        return response.data      
    })
    .finally(() => Notiflix.Loading.remove());
};


const url = 'https://api.thecatapi.com/v1';
function fetchCatByBreed(breedId) {
    const breedsSearchURL = "https://api.thecatapi.com/v1/images/search"
    const params = new URLSearchParams({
        breed_ids: breedId,
      });

      Notiflix.Loading.standard('Loading...', {
        backgroundColor: 'rgba(0,0,0,0.8)',
      });

    return axios.get(`${breedsSearchURL}?${params}`)
    .then(response => {
        if (response.status !== 200) {
            throw new Error(response.status);
        }
        return response.data
    })
    .finally(() => Notiflix.Loading.remove());      
};

export {fetchBreeds, fetchCatByBreed};


