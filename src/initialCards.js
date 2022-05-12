const image1 = new URL('../images/cards/card__photo-1.jpg', import.meta.url);
const image2 = new URL('../images/cards/card__photo-2.jpg', import.meta.url);
const image3 = new URL('../images/cards/card__photo-3.jpg', import.meta.url);
const image4 = new URL('../images/cards/card__photo-4.jpg', import.meta.url);
const image5 = new URL('../images/cards/card__photo-5.jpg', import.meta.url);
const image6 = new URL('../images/cards/card__photo-6.jpg', import.meta.url);

// Массив с начальными карточками
export const initialCards = [
  {
    name: 'Карачаевск',
    imageLink: image1,
  },
  {
    name: 'Гора Эльбрус',
    imageLink: image2,
  },
  {
    name: 'Домбай',
    imageLink: image3,
  },
  {
    name: 'Челябинск',
    imageLink: image4,
  },
  {
    name: 'Ивановская область',
    imageLink: image5,
  },
  {
    name: 'Шерегеш',
    imageLink: image6,
  },
];
