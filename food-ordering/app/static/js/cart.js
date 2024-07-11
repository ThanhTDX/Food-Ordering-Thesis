let iconCart = document.querySelector('.icon-cart');
let closeBtn = document.querySelector('.cartTab .closeBtn');
let body = document.querySelector('body');

iconCart.addEventListener('click', () => {
    body.classList.toggle('activeTabCart');
})

closeBtn.addEventListener('click', () => {
    body.classList.toggle('activeTabCart');
})