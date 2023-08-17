import axios from "axios";

const API_KEY = "live_oRLnGlqccyIpfSobEeexEkHE0CvE6lZUDs8saHZPMlRqQVgKas0bSehet0gqxr4V";
axios.defaults.headers.common["x-api-key"] = API_KEY;

function fetchBreeds() {
    const breedsURL = "https://api.thecatapi.com/v1/breeds";

    return axios.get(breedsURL)
    .then(response => {

        if (response.status !== 200) {
            throw new Error(response.status);
        }
        return response.data      
    })
};


const url = 'https://api.thecatapi.com/v1';
function fetchCatByBreed(breedId) {
    const breedsSearchURL = "https://api.thecatapi.com/v1/images/search"
    const params = new URLSearchParams({
        breed_ids: breedId,
      });

    return axios.get(`${breedsSearchURL}?${params}`)
    .then(response => {
        if (response.status !== 200) {
            throw new Error(response.status);
        }
        return response.data
    })
      
};

export {fetchBreeds, fetchCatByBreed};


