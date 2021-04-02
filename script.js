"use strict";

window.addEventListener("load", () => {
  document.body.classList.add("fadeIn");
});

/* Intrapage Navigation Functionality: 
For each intrapage-nav__link, add a listener for a click event. When the
link is clicked, grab its text content and set it as the variable sectionID.
Lastly, use the sectionID to scroll the resepctive section into view.
*/
let intranavLinks = document.querySelectorAll('.intrapage-nav__link');

intranavLinks.forEach((link) => {
  link.addEventListener('click', () => {
    let sectionID = link.textContent;
    document.getElementById(sectionID).scrollIntoView({behavior: 'smooth'});
  });
});
