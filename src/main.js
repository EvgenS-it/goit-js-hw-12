import { fetchImages } from './js/pixabay-api.js';
import { renderTemplate } from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('form.form-search');
const galleryEl = document.querySelector('.gallery');

const lightbox = new SimpleLightbox('.gallery a', {});

if (formEl) {
  formEl.addEventListener('submit', (event) => {
    event.preventDefault();

    const inputValue = formEl.elements.search.value;

    if (!inputValue) {
      iziToast.error({
        message: 'Please enter a search term',
        position: 'topRight',
        class: 'error',
        color: 'red',
      });
    } else {
      galleryEl.innerHTML = '';
      galleryEl.classList.add('is-load');

      fetchImages(inputValue)
        .then((data) => {
          galleryEl.classList.remove('is-load');
          const imagesHtml = [];

          if (data.total === 0) {
            iziToast.error({
              message: 'Sorry, there are no images matching your search query. Please try again!',
              position: 'topRight',
              class: 'error',
              color: 'red',
            });
          } else {
            data.hits.forEach((image) => {
              imagesHtml.push(renderTemplate(image));
            });

            galleryEl.innerHTML = imagesHtml.join('');
            lightbox.refresh();
          }
        })
        .catch((error) => {
          galleryEl.classList.remove('is-load');
          iziToast.error({
              message: `Sorry, something went wrong! ${error.message}`,
              position: 'topRight',
              class: 'error',
              color: 'red',
          });
        });

      formEl.reset();
    }
  });
}