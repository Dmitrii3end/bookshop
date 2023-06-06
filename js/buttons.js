import { getAndShowBooks } from './loadbooks'

let bagShop = new Set();
let books = JSON.parse(localStorage.getItem('books'));
if (books && books.length > 0) {
    books.forEach(book => bagShop.add(book));

    let bag = document.querySelector('#shop-bag');

    bag.setAttribute('data-count', `${books.length}`);
}

document.querySelectorAll('.card__button').forEach(button => {
    button.addEventListener('click', buyBook);
})


function buyBook() {
    let book = this.getAttribute('data-book');

    addRemoveBook(book);

    swapBuyButton(this);

    shopBagShow();
}


const shopBagShow = () => {
    let bag = document.querySelector('#shop-bag');
    let countShopBag = bag.getAttribute('data-count');

    countShopBag !== '0' ? bag.classList.add('header__shop-bag') : bag.classList.remove('header__shop-bag');
}

shopBagShow();


document.querySelector('#load-more').addEventListener('click', () => {
    getAndShowBooks();
})


const swapBuyButton = button => {
    button.innerText = button.classList.contains('card__button_shop-bag') ? 'buy now' : 'in the cart';

    button.classList.toggle('card__button_shop-bag');
}


const addRemoveBook = book => {
    let bag = document.querySelector('#shop-bag');
    let countShopBag = bag.getAttribute('data-count');

    if (bagShop.has(book)) {
        bag.setAttribute('data-count', `${+countShopBag - 1}`);

        bagShop.delete(book);
    } else {
        bag.setAttribute('data-count', `${+countShopBag + 1}`);

        bagShop.add(book);
    }
}


window.addEventListener('beforeunload', () => {
    localStorage.setItem('books', JSON.stringify([...bagShop]));
});


export { buyBook, bagShop, swapBuyButton }