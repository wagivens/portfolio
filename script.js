"use strict";

window.addEventListener("load", () => {
  document.body.classList.add("fadeIn");
});

const DOMelements = {
  caseStudySection: document.querySelector('.case-study__section:nth-of-type(2)'),
  caseStudyImages: document.querySelectorAll('.main-image'),
  scrollToTop: document.querySelector('.scroll-to-top')
}

/* Intrapage Navigation Functionality: 
For each intrapage-nav__link, add a listener for a click event. When the
link is clicked, grab its text content and set it as the variable sectionID.
Lastly, use the sectionID to scroll the resepctive section into view. */
let intranavLinks = document.querySelectorAll('.intrapage-nav__link');
intranavLinks.forEach((link) => {
  link.addEventListener('click', () => {
    let sectionID = link.textContent;
    document.getElementById(sectionID).scrollIntoView({behavior: 'smooth'});
  });
});

// Scroll-to-Top Button
document.querySelector('.scroll-to-top').addEventListener('click', () => {
  document.querySelector('.intrapage-nav').scrollIntoView({behavior: 'smooth'});
});

// Setting up Intersection Observer for Image Lazy-Loading
const imageObserver = function(list) {
  let elementObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.visibility = 'visible';
        observer.unobserve(entry.target);
      }
    });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px'
    }
  );

  list.forEach(item => {
    elementObserver.observe(item);
  });
}

const sectionObserver = new IntersectionObserver(intersectionEntries => {
  /* We will pass something into sectionObserver.observe() and an
    intersectionObserverEntry will be created for each element and each will 
    be stored inside of the first parameter of our callback function (intersectionEntries). 
    If it's a node list or array, an intersectionObserverEntry will be created 
    for each element in it. If it's just one element, we only get back one 
    intersectionObserverEntry.
   */

  /* intersectionEntries will be an array, so if you want to access an element, you have to 
    specify an index (ex: intersectionEntries[0]).
  */
  intersectionEntries.forEach(entry => {
    if (!entry.isIntersecting) {
      DOMelements.scrollToTop.classList.add("hidden");
    } else {
      DOMelements.scrollToTop.classList.remove("hidden");
    }
  });
  }, {
    root: null,
    threshold: 0,
    rootMargin: "0px"
  }
);

// Observer for Image Lazy Loading
imageObserver(DOMelements.caseStudyImages);

// We want to observe the second Case Study Section
sectionObserver.observe(DOMelements.caseStudySection);