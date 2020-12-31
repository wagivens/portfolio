elements = {
    memoji: document.querySelector('.header-nav__memoji')
}

function randomMemoji() {
    let randomNumber = Math.ceil(Math.random() * 3);
    elements.memoji.setAttribute('src', `memoji/memoji-${randomNumber}.png`);
}

window.addEventListener('load', function () {
    document.body.classList.add('fadeIn');
});

randomMemoji();