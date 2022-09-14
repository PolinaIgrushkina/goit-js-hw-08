// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

// Подключение библиотеки
import SimpleLightbox from "simplelightbox";
// Дополнительный импорт стилей
import "simplelightbox/dist/simple-lightbox.min.css";


//Создание div-контейнера, в который будем добавлять карточки картинкок
const divContainerEl = document.querySelector('.gallery');

//Создание разметки
const markup = createMarkup(galleryItems);
  
function createMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return`
    <a class="gallery__item" href="${original}">
      <img class="gallery__image" src="${preview}" alt="${description}"/>
    </a>`})
    .join("");
}

//Добавляем разметку в ul-контейнер
divContainerEl.innerHTML = markup;

//Открытие модального окна с опциями через библиотеку SimpleLightbox
const lightbox = new SimpleLightbox(".gallery a", {captionsData: "alt", captionDelay: 250,});
