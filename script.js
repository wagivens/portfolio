elements = {
    memoji: document.querySelector('.header-nav__memoji'),
    artifactCompetitors: document.querySelector('#competitors-img'),
    mobileView = window.matchMedia('(max-width: 7109px)'),
}

function randomMemoji() {
    let randomNumber = Math.ceil(Math.random() * 3);
    elements.memoji.setAttribute('src', `memoji/memoji-${randomNumber}.png`);
}

window.addEventListener('load', function () {
    document.body.classList.add('fadeIn');
});

elements.mobileView.addEventListener('change', function(){
    if (elements.mobileView.matches) {
        elements.artifactCompetitors.setAttribute('src','tixby/competitors.png');
    } else {
        elements.artifactCompetitors.setAttribute('src','tixby/competitors-mobile.png');
    }
})

randomMemoji();