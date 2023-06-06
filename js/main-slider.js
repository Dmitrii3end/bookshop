import { getNumElement } from './help-function'

const images = document.querySelectorAll('.main__slider .slider__imgs img');
const images_container = document.querySelector('.slider__imgs');
let count = 0;
let width = 0;

let currentImg = 0;

function init() {
    width = document.querySelector('.main__slider').offsetWidth;
    images_container.style.width = width * images.length + 'px';
    images.forEach(img => {
        img.style.width = width + 'px';
    })
}

init();

window.addEventListener('resize', init);


document.querySelectorAll('.slider__dot').forEach(el => {
    el.addEventListener('click', function() {
        let nodePos = getNumElement(this);
        images_container.style.right = nodePos * width + 'px';
        current_slider_img(nodePos);
        currentImg = nodePos;
    })
})


const current_slider_img = nextProject => {
    let dots = document.querySelectorAll('.slider__dot');

    dots.forEach(el => el.classList.remove('slider__dot_active'));

    dots[nextProject].classList.add('slider__dot_active');
}


setInterval(() => {
    current_slider_img(refreshCurrent(currentImg + 1));
    images_container.style.right = currentImg * width + 'px';
}, 5000);


const refreshCurrent = next => {
    if (next < 0) {
        return currentImg = images.length - 1;
    }
    if (next > images.length - 1) {
        return currentImg = 0;
    }
    return currentImg = next;
}


export { init, refreshCurrent }