window.addEventListener('load', function () {
    'use strict';
    document.querySelector('.content').classList.add('fadeIn');
});

// When eventType happens to the eventElement, get the reactionElement and change its visible to "visible."
function unhideComponent(eventElement, eventType, reactionElement) {
    'use strict';
    document.getElementById(eventElement).addEventListener(eventType, function () {
        document.getElementById(reactionElement).style.visibility = "visible";
    });
}

// When eventType happens to the eventElement, get the reactionElement and change its visible to "hidden"
function hideComponent(eventElement, eventType, reactionElement) {
    'use strict';
    document.getElementById(eventElement).addEventListener(eventType, function () {
        document.getElementById(reactionElement).style.visibility = "hidden";
    });
}

//When user clicks on clickElement, scroll the scrollElement into view
function scrollAnElement(clickElement, scrollElement) {
    'use strict';
    document.querySelector(clickElement).addEventListener('click', function () {
        document.querySelector(scrollElement).scrollIntoView({behavior: 'smooth'});
    });
}

unhideComponent('burger', 'click', 'menu-overlay');
    
hideComponent('exit', 'click', 'menu-overlay');

scrollAnElement('.down', '.work');
