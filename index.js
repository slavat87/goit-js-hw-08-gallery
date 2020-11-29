// Створи галерею з можливістю кліка по її елементах і перегляду повнорозмірного зображення в модальному вікні.
// Розбий завдання на кілька підзадач:
// Створення і рендер розмітки по масиву даних і наданим шаблоном.
// Реалізація делегування на галереї ul.js-gallery і отримання url великого зображення.
// Відкриття модального вікна при натисканні на елементі галереї.
// Підміна значення атрибута src елемента img.lightbox__image.
// Закриття модального вікна при натисканні на кнопку button[data-action="close-modal"].
// Очищення значення атрибута src елемента img.lightbox__image.Це необхідно   для того, щоб при наступному відкритті модального вікна,
//   поки вантажиться   зображення, ми не бачили попереднє.
// Посилання на оригінальне зображення повинне зберігатися в data - атрибуті source на елементі img,
//   і вказуватися в href посилання(це необхідно для доступності).

// Додатково
// Наступний функціонал не обов'язковий при здачі завдання, але буде хорошою практикою по роботі з подіями.
// Закриття модального вікна при натисканні на div.lightbox__overlay.
// Закриття модального вікна після натискання клавіші ESC.
// Перегортування зображень галереї у відкритому модальному вікні клавішами "вліво"   і "вправо".

import importItms from "./gallery-items.js";

const imgListRef = document.querySelector(".js-gallery");
const newGalleryCard = importItms
  .map(({ description, preview, original }) => {
    return `
  <li class = "gallery__item">
  <a class = "gallery__link" href = '${original}'> 
  <img class  ="gallery__image" src = '${preview}' data-source = '${original}' 
      alt = '${description}'/></a></li>`;
  })
  .join("");

imgListRef.innerHTML = newGalleryCard;
console.log(imgListRef);

const imgForModalData = document.querySelector(".gallery__image");
const imgForModal = document.querySelector("img.lightbox__image");
const closeModalRef = document.querySelector('[data-action="close-lightbox"]');
const openModalRef = document.querySelector(".js-lightbox");

const backDropRef = document.querySelector(".lightbox__overlay");

imgListRef.addEventListener("click", onOpenModal);
closeModalRef.addEventListener("click", onCloseModal);
backDropRef.addEventListener("click", onCloseModal);

function onOpenModal(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  openModalRef.classList.add("is-open");
  imgForModal.src = event.target.dataset.source;
  imgForModal.alt = event.target.alt;
  window.addEventListener("keydown", onESCpress);
}

function onCloseModal(event) {
  openModalRef.classList.remove("is-open");
  imgForModal.src = "";
  imgForModal.alt = "";
  window.removeEventListener("keydown", onESCpress);
}

function onESCpress(event) {
  if (event.code === "Escape") {
    onCloseModal();
  }
}
