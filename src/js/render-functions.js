import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export const createGalaryMatkup = images => {
  const galleryMarkup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        views,
        likes,
        comments,
        downloads,
      }) => {
        return `
        <li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
            <img
              class="gallery-image"
              src="${webformatURL}"
              alt="${tags}"
            />
            <ul class="gallery-info">
              <li class="gallery-item-info">
                <p class="info-item-title">
                Likes
                </p>
                <p class="info-item-value">
                  ${likes}
                </p>
              </li>
              <li class="gallery-item-info">
                <p class="info-item-title">
                  Views
                </p>
                <p class="info-item-value">
                  ${views}
                </p>
              </li>
              <li class="gallery-item-info">
                <p class="info-item-title">
                  Comments
                </p>
                <p class="info-item-value">
                  ${comments}
                </p>
              </li>
              <li class="gallery-item-info">
                <p class="info-item-title">
                  Downloads
                </p>
                <p class="info-item-value">
                  ${downloads}
                </p>
              </li>
            </ul>
          </a>
        </li>
      `;
      }
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);
  gallery.refresh();
};

export const clearGalleryContainer = () => {
  galleryContainer.innerHTML = '';
};
