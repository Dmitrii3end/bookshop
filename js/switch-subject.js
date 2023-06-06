document.querySelectorAll('.categories__element').forEach(element => {
    element.addEventListener('click', switchSubject);
})


function switchSubject() {
    document.querySelector('.categories__element_active').classList.remove('categories__element_active');

    this.classList.add('categories__element_active');

    currentStep = 0;

    currentSubject = this.getAttribute('data-fullname');

    document.querySelector('.cards').innerHTML = '';

    getAndShowBooks();
}

export { switchSubject }