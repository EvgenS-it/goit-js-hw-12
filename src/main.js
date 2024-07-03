import { fetchImages } from './js/pixabay-api.js';
import { API } from './js/pixabay-api.js';
import { renderTemplate } from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('form.form-search');
const galleryEl = document.querySelector('.gallery');
const moreImgsBtnEl = document.querySelector('.more-imgs-btn');
const inputSearchEl = document.querySelector('.field-input_search');

const lightbox = new SimpleLightbox('.gallery a', {});
let page = 1;
let pages = 1;

function requestImages(searchQuery, isFirstLoad = true) {
  if(isFirstLoad) {
    page = 1;
  }

  fetchImages(searchQuery, page)
    .then((response) => {
      const { hits, totalHits } = response.data;

      galleryEl.classList.remove('is-load');
      const imagesHtml = [];

      if (totalHits === 0) {
        moreImgsBtnEl.classList.add('is-hidden');
        iziToast.error({
          message: 'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          color: 'red',
        });
        pages = 1;
        formEl.reset();
        return;
      }

      pages = Math.ceil(totalHits / API.PIXABAY.PER_PAGE);

      if(pages < page) {
        moreImgsBtnEl.classList.add('is-hidden');
        iziToast.error({
          message: 'We\'re sorry, but you\'ve reached the end of search results.',
          position: 'topRight',
          color: 'red',
        });

        return;
      }

      page += 1;

      hits.forEach((image) => {
        imagesHtml.push(renderTemplate(image));
      });

      if(isFirstLoad) {
        galleryEl.innerHTML = imagesHtml.join('');
      } else {
        galleryEl.insertAdjacentHTML('beforeend', imagesHtml.join(''));

        const itemGalleryHeight = galleryEl.querySelector('.item');

        window.scrollBy({
          top: itemGalleryHeight.getBoundingClientRect().height * 2,
          behavior: 'smooth',
        });
      }

      if(pages > 1) {
        moreImgsBtnEl.classList.remove('is-hidden');
      }

      if(page > pages) {
        moreImgsBtnEl.classList.add('is-hidden');
      }

      lightbox.refresh();
    })
    .catch((error) => {
      console.log(error);
      galleryEl.classList.remove('is-load');
      iziToast.error({
        message: `Sorry, something went wrong! ${error.message}`,
        position: 'topRight',
        color: 'red',
      });
    });
}

if (formEl) {
  formEl.addEventListener('submit', (event) => {
    event.preventDefault();
    moreImgsBtnEl.classList.add('is-hidden');

    const inputSearchValue = inputSearchEl.value;

    if (!inputSearchValue) {
      iziToast.error({
        message: 'Please enter a search term',
        position: 'topRight',
        color: 'red',
      });
    } else {
      galleryEl.innerHTML = '';
      galleryEl.classList.add('is-load');

      requestImages(inputSearchValue);
    }
  });
}

if(moreImgsBtnEl) {
  moreImgsBtnEl.addEventListener('click', () => {
    const inputSearchValue = inputSearchEl.value;
    requestImages(inputSearchValue, false);
  });
}