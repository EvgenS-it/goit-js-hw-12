import axios from 'axios';

export const API = {
  PIXABAY: {
    PATH: 'https://pixabay.com/api/',
    KEY: '44444020-42ceddb875011e5970bd122af',
    PER_PAGE: 15,
  },
};

export const fetchImages = async (searchQuery, page = 1) => {
  return await axios.get(API.PIXABAY.PATH, {
    params: {
      key: API.PIXABAY.KEY,
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: API.PIXABAY.PER_PAGE
    }
  });
};