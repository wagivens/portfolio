"use strict";

window.addEventListener("load", () => {
  document.body.classList.add("fadeIn");
});

const DOMelements = {
  caseStudySection: document.querySelector('.case-study__section:first-of-type'),
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
  intersectionEntries.forEach(entry => {
    if (entry.isIntersecting || window.pageYOffset < entry.boundingClientRect.y) {
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