('use strict');

const DOMelements = {
  caseStudyVideos: document.querySelectorAll('.idea-box'),
};

/* Intrapage Navigation Functionality: 
For each intrapage-nav__link, add a listener for a click event. When the
link is clicked, grab its text content and set it as the variable sectionID.
Lastly, use the sectionID to scroll the resepctive section into view. */
let intranavLinks = document.querySelectorAll('.intrapage-nav__link');
intranavLinks.forEach((link) => {
  let sectionID = link.textContent;
  link.addEventListener('click', () => {
    document.getElementById(sectionID).scrollIntoView({ behavior: 'smooth' });
  });
  link.addEventListener('keypress', (e) => {
    if (e.code == 'Enter')
      document.getElementById(sectionID).scrollIntoView({ behavior: 'smooth' });
  });
});

// Scroll-to-Top Button
// if (DOMelements.scrollToTop)
//   DOMelements.scrollToTop.addEventListener('click', () => {
//     document
//       .querySelector('.intrapage-nav')
//       .scrollIntoView({ behavior: 'smooth' });
//     DOMelements.scrollToTop.addEventListener('keypress', (e) => {
//       if (e.code == 'Enter') {
//         e.preventDefault();
//         document
//           .querySelector('.intrapage-nav')
//           .scrollIntoView({ behavior: 'smooth' });
//       }
//     });
//   });

const caseStudyVidObserver = new IntersectionObserver(
  (intersectionEntries) => {
    intersectionEntries.forEach((entry) => {
      let DOMElement = entry.target;
      let container = DOMElement.firstElementChild;
      let video = container.firstElementChild;
      if (
        entry.isIntersecting
        // window.scrollY < entry.boundingClientRect.y
      ) {
        container.classList.remove('idea-box-blurred');
        video.play();
        // video.setAttribute('controls', '');
      } else {
        // video.removeAttribute('controls', '');
        container.classList.add('idea-box-blurred');
        video.pause();
      }
    });
  },
  {
    root: null,
    threshold: 0.75,
    rootMargin: '0px',
  }
);

DOMelements.caseStudyVideos.forEach((vid) => {
  caseStudyVidObserver.observe(vid);
});
