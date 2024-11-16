import { searchImages } from './js/pixabay-api';
import {
  createGalaryMatkup,
  clearGalleryContainer,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.search-form');
const loader = document.querySelector('.loader-wrapper');
const loadMoreBtn = document.querySelector('.load-more');
const endContent = document.querySelector('.end-content');

const url = new URL(window.location);
const searchParams = url.searchParams;
let query = searchParams.get('q');
const perPage = searchParams.get('per_page')
  ? searchParams.get('per_page')
  : 15;
const page = searchParams.get('page') ? searchParams.get('page') : 1;

if (query) {
  form.query.value = query;
  fetchImage(query, perPage, page);
} else {
  form.query.value = '';
}

form.addEventListener('submit', evt => {
  evt.preventDefault();

  loadMoreBtn.classList.add('hidden');

  const formData = new FormData(form);
  const formQuery = formData.get('query').trim();

  if (formQuery === query) {
    return;
  }

  if (formQuery.length < 1) {
    iziToast.error({
      title: 'Error',
      position: 'topRight',
      message: 'Query field cannot be empty!',
    });
    return;
  }

  if (formQuery !== query) {
    clearGalleryContainer();
    url.searchParams.delete('page');
  }

  url.searchParams.set('q', formQuery);
  url.searchParams.set('per_page', perPage);
  window.history.pushState({}, '', url);
  query = formQuery;

  fetchImage(formQuery, perPage);
});

loadMoreBtn.addEventListener('click', loadMore);

async function loadMore() {
  const gallaryItem = document.querySelector('.gallery-item');

  const { height: cardHeight } = gallaryItem.getBoundingClientRect();

  const page = searchParams.get('page')
    ? Number(searchParams.get('page')) + 1
    : 2;

  url.searchParams.set('page', page);
  window.history.pushState({}, '', url);

  await fetchImage(query, perPage, page);
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

async function fetchImage(query, perPage, page = 1) {
  loader.classList.add('show');

  try {
    const data = await searchImages(query, perPage, page);

    loader.classList.remove('show');



    if (data.hits.length < 1) {
      loadMoreBtn.classList.add('hidden');
      iziToast.error({
        title: 'Error',
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      loadMoreBtn.classList.remove('hidden');
    }

if (data.hits.length > 0 && page >= totalPages(data.totalHits, perPage)) {
  loadMoreBtn.classList.add('hidden');
  endContent.classList.remove('hidden');
} else {
  endContent.classList.add('hidden');
}

    createGalaryMatkup(data.hits);
  } catch (err) {
    loader.classList.remove('show');

    iziToast.error({
      title: 'Error',
      position: 'topRight',
      message: 'Failed to load images. Please try again!',
    });
  }
}

function totalPages(total, perPage) {
  return Math.ceil(total / perPage);
}
