import { buyBook, bagShop, swapBuyButton } from './buttons'

const API_KEY = 'AIzaSyD82GEkAlJssoQzK5Luo9mlydgD4VjVJTA';
const GET_COUNT_BOOKS = 6;
let currentStep = 0;
let currentSubject = document.querySelector('.categories__element_active').getAttribute('data-fullname');


const useRequestBooks = (subject, start, count) => {
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${subject}&printType=books&startIndex=${start}&maxResults=${count}&langRestrict=en&key=${API_KEY}`)
        .then((response) => {
            return response.json();
        })
        .then((json) => {

            return json['items'];
        })
        .catch(() => { console.log('error') });
}

const getAndShowBooks = async() => {
    let books = await useRequestBooks(currentSubject, currentStep * GET_COUNT_BOOKS, GET_COUNT_BOOKS);

    currentStep++;


    books.forEach((book) => {
        let img = book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail;
        if (img == undefined) img = '/imgs/place-holder.jpg';
        let authors = book.volumeInfo && book.volumeInfo.authors;
        authors == undefined ? authors = '' : authors = authors.join(', ');
        let title = book.volumeInfo.title;
        let description = book.volumeInfo.description;
        let averageRating = book.volumeInfo.averageRating;
        let ratingsCount = book.volumeInfo.ratingsCount;
        let saleability = book.saleInfo.saleability;
        let selfLink = book.selfLink;
        let cost = '';
        let costType = '';

        if (saleability === "FOR_SALE") {
            cost = book.saleInfo.retailPrice.amount;
            costType = book.saleInfo.retailPrice.currencyCode;
        }

        let newBook = showBooks(createCard(), img, authors, title, description, cost, costType, averageRating, ratingsCount, selfLink);

        document.querySelector('.cards').append(newBook);

        if (bagShop.has(selfLink)) {
            swapBuyButton(newBook.querySelector('.card__button'));
        }
    });
}


const showBooks = (element, img, authors, title, description, cost, costType, averageRating, ratingsCount, selfLink) => {
    let elementImage = element.querySelector('.card__image img');
    elementImage.src = img;

    let elementAuthors = element.querySelector('.card__author');
    elementAuthors.innerText = authors;

    let elementTitle = element.querySelector('.card__title');
    if (title) elementTitle.innerText = title;

    let elementDescription = element.querySelector('.card__info');
    if (description) elementDescription.innerText = description;

    let elementCost = element.querySelector('.card__cost');
    let fullCost = costType + cost;
    if (cost) elementCost.innerText = fullCost;

    let elementAverageRating = element.querySelector('.card__current-rating_active');
    if (averageRating) {
        element.querySelector('.card__rating').style.display = 'flex';
        elementAverageRating.style.width = averageRating / 5 * 100 + '%';
    }

    let elementRatingsCount = element.querySelector('.card__count-reviews');
    if (ratingsCount) elementRatingsCount.innerText = ratingsCount + ' review';

    let button = element.querySelector('.card__button');
    button.addEventListener('click', buyBook);
    button.setAttribute('data-book', `${selfLink}`);

    return element;
}


const createCard = () => {
    let card = document.createElement('div');
    card.className = 'cards__card';

    card.innerHTML = `
    <div class="card__image">
        <img src="" alt="book cover">
    </div>
    <div class="card__description">
        <div class="card__main-info">
            <div class="card__author"></div>

            <h3 class="card__title"></h3>

            <div class="card__rating">
                <div class="card__current-rating-stars">
                    <div class="card__current-rating">
                        <img src="/imgs/white-star.svg" alt="rating">
                        <img src="/imgs/white-star.svg" alt="rating">
                        <img src="/imgs/white-star.svg" alt="rating">
                        <img src="/imgs/white-star.svg" alt="rating">
                        <img src="/imgs/white-star.svg" alt="rating">
                    </div>
                    <div class="card__current-rating_active">
                        <img src="/imgs/yeloow-star.svg" alt="rating">
                        <img src="/imgs/yeloow-star.svg" alt="rating">
                        <img src="/imgs/yeloow-star.svg" alt="rating">
                        <img src="/imgs/yeloow-star.svg" alt="rating">
                        <img src="/imgs/yeloow-star.svg" alt="rating">
                    </div>
                </div>
                <div class="card__count-reviews"></div>
            </div>
        </div>

        <div class="card__info"></div>

        <div class="card__cost"></div>

        <button class="main__button card__button">buy now</button>
    </div>
    `;

    return card;
}

getAndShowBooks();

export { currentStep, currentSubject, useRequestBooks, getAndShowBooks, showBooks, createCard }