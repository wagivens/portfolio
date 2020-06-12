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

unhideComponent('burger', 'click', 'menu-overlay');
    
hideComponent('exit', 'click', 'menu-overlay');