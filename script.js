("use strict");

const DOMelements = {
  handEmoji: document.querySelector(".handwave"),
  caseStudySection: document.querySelector(
    ".case-study__section:first-of-type"
  ),
  caseStudyImages: document.querySelectorAll(".main-image"),
  scrollToTop: document.querySelector(".scroll-to-top"),
}

function waveHand() {
  DOMelements.handEmoji.animate(
    [
      { transform: "rotateZ(0deg)" },
      { transform: "rotateZ(30deg)" },
      { transform: "rotateZ(0deg)" },
      { transform: "rotateZ(30deg)" },
      { transform: "rotateZ(0deg)" },
    ],
    1000
  );
}

if (DOMelements.handEmoji != null)
{
  setInterval(waveHand, 3000);
}

/* Intrapage Navigation Functionality: 
For each intrapage-nav__link, add a listener for a click event. When the
link is clicked, grab its text content and set it as the variable sectionID.
Lastly, use the sectionID to scroll the resepctive section into view. */
let intranavLinks = document.querySelectorAll(".intrapage-nav__link");
intranavLinks.forEach((link) => {
  let sectionID = link.textContent;
  link.addEventListener("click", () => {
    document.getElementById(sectionID).scrollIntoView({ behavior: "smooth" });
  });
  link.addEventListener("keypress", (e) => {
    if(e.code == 'Enter')
      document.getElementById(sectionID).scrollIntoView({ behavior: "smooth" });
  });
});

// Scroll-to-Top Button
if (DOMelements.scrollToTop)
  DOMelements.scrollToTop.addEventListener("click", () => {
    document
      .querySelector(".intrapage-nav")
      .scrollIntoView({ behavior: "smooth" });
  DOMelements.scrollToTop.addEventListener('keypress', (e) => {
    if (e.code == 'Enter')
    {
      e.preventDefault();
      document
        .querySelector(".intrapage-nav")
        .scrollIntoView({ behavior: "smooth" });
    }
  });
});

const sectionObserver = new IntersectionObserver(
  (intersectionEntries) => {
    intersectionEntries.forEach((entry) => {
      if (
        entry.isIntersecting ||
        window.pageYOffset < entry.boundingClientRect.y
      ) {
        DOMelements.scrollToTop.classList.add("hidden");
        intranavLinks.item(0).focus();
      } else {
        DOMelements.scrollToTop.classList.remove("hidden");
        DOMelements.scrollToTop.focus();
      }
    });
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "0px",
  }
);

// We want to observe the second Case Study Section
if (DOMelements.caseStudySection)
  sectionObserver.observe(DOMelements.caseStudySection);
