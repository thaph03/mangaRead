'use strict';

class Manga {
  constructor(
    title = 'Unknown',
    author = 'Unknown',
    link = 'Unknown',
    chapters = '0',
    isRead = false
  ) {
    this.title = title;
    this.author = author;
    this.link = link;
    this.chapters = chapters;
    this.isRead = isRead;
  }
}

class mangaRead {
  constructor() {
    this.manga = [];
  }
  isDuplicate(newManga) {
    return this.manga.some((manga) => manga.title === newManga.title);
  }

  addMangaRead(newManga) {
    if (this.isDuplicate(newManga)) {
      alert('Similar manga title is already added! Please pick another titles');
    } else {
      return this.manga.push(newManga);
    }
  }

  removeMangaRead(removedManga) {
    return (this.manga = this.manga.filter(
      (manga) => manga.title !== removedManga.title
    ));
  }
}

const mangaLibrary = new mangaRead();

//
const addManga = document.querySelector('.add-button');
const entryModal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
//
const mangaReadForm = document.getElementById('addMangaForm');

// UI interactive

const setModal = () => {
  entryModal.classList.add('active');
  overlay.classList.add('active');
};

const closeModal = () => {
  entryModal.classList.remove('active');
  overlay.classList.remove('active');
};

const openModal = () => {
  addManga.addEventListener('click', () => {
    setModal();
  });
};

const exitModal = () => {
  overlay.addEventListener('click', () => {
    closeModal();
  });
};
//

//create card
const gridCards = document.querySelector('.grid-cards');

const render = (newManga) => {
  const mangaCard = document.createElement('div');
  mangaCard.classList.add('manga-card');
  gridCards.appendChild(mangaCard);

  const mangaArt = document.createElement('div');
  mangaArt.classList.add('art');
  mangaCard.appendChild(mangaArt);
  mangaArt.style.backgroundImage = `url(${newManga.link})`;

  const mangaTitles = document.createElement('h2');
  mangaTitles.classList.add('manga-titles');
  mangaCard.appendChild(mangaTitles);
  mangaTitles.textContent = newManga.title;

  const mangaAuthor = document.createElement('h3');
  mangaAuthor.classList.add('manga-author');
  mangaCard.appendChild(mangaAuthor);
  mangaAuthor.textContent = newManga.author;

  const mangaChapters = document.createElement('h3');
  mangaChapters.classList.add('manga-chapters');
  mangaCard.appendChild(mangaChapters);
  mangaChapters.textContent = ` ${newManga.chapters} chapters`;

  const cardButtons = document.createElement('div');
  cardButtons.classList.add('card-buttons');
  mangaCard.appendChild(cardButtons);

  const cardButtonRead = document.createElement('button');
  cardButtonRead.classList.add('btn1', 'btn-read');
  cardButtonRead.type = 'submit';

  if (newManga.isRead === true) {
    cardButtonRead.textContent = 'Read';
  } else {
    cardButtonRead.classList.add('notRead');
    cardButtonRead.textContent = 'Not Read';
  }
  cardButtonRead.addEventListener('click', () => {
    const cases = cardButtonRead.textContent;
    switch (cases) {
      case 'Read':
        cardButtonRead.classList.add('notRead');
        cardButtonRead.textContent = 'Not Read';
        break;
      case 'Not Read':
        cardButtonRead.classList.remove('notRead');
        cardButtonRead.textContent = 'Read';
        break;
      default:
        console.log('no cases matched!');
    }
  });
  cardButtons.appendChild(cardButtonRead);

  const cardButtonRemoved = document.createElement('button');
  cardButtonRemoved.classList.add('btn1', 'btn-remove');
  cardButtonRemoved.textContent = 'Remove';
  cardButtonRemoved.type = 'submit';
  cardButtonRemoved.addEventListener('click', () => {
    gridCards.removeChild(mangaCard);
    mangaLibrary.removeMangaRead(newManga);
  });
  cardButtons.appendChild(cardButtonRemoved);
};
//
const getMangaInput = () => {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const link = document.getElementById('link').value;
  const chapters = document.getElementById('chapters').value;
  const isRead = document.getElementById('isRead').checked;

  return new Manga(title, author, link, chapters, isRead);
};

const getInput = () => {
  mangaReadForm.addEventListener('submit', (event) => {
    event.preventDefault();
    closeModal();

    const newManga = getMangaInput();
    mangaLibrary.addMangaRead(newManga);
    const isObjectInArray = mangaLibrary.manga.includes(newManga);

    if (isObjectInArray) {
      render(newManga);
    }
  });
};

const main = () => {
  openModal();
  exitModal();
  getInput();
};

main();
