import CREDENTIALS from "./credentials.js";

("use strict");

const DOMelements = {
  handEmoji: document.querySelector(".handwave"),
  caseStudySection: document.querySelector(
    ".case-study__section:first-of-type"
  ),
  caseStudyImages: document.querySelectorAll(".main-image"),
  scrollToTop: document.querySelector(".scroll-to-top"),
};

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

setInterval(waveHand, 3000);

// Moving an image forward and backward based on scroll direction.
let transformXIncrement = 0;
let currentYPosition = window.pageYOffset;
// window.addEventListener('scroll', () => {
//   const image = DOMelements.msgsImage;
//   let newYPosition = window.pageYOffset;

//   // image.animate([
//   //   {transform: `translateX(${transformXIncrement++}px)`}
//   // ], 1);

//   // transformXIncrement++;
//   // currentYPosition = window.pageYOffset;

//   if (newYPosition < currentYPosition) {
//     image.style.transform = `translateX(${transformXIncrement--}px)`;
//     transformXIncrement--;
//     currentYPosition = window.pageYOffset;
//   }

//   if (newYPosition > currentYPosition) {
//     image.style.transform = `translateX(${transformXIncrement++}px)`;
//     transformXIncrement++;
//     currentYPosition = window.pageYOffset;
//   }
// })

/* Intrapage Navigation Functionality: 
For each intrapage-nav__link, add a listener for a click event. When the
link is clicked, grab its text content and set it as the variable sectionID.
Lastly, use the sectionID to scroll the resepctive section into view. */
let intranavLinks = document.querySelectorAll(".intrapage-nav__link");
intranavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    let sectionID = link.textContent;
    document.getElementById(sectionID).scrollIntoView({ behavior: "smooth" });
  });
});

// Scroll-to-Top Button
if (document.querySelector(".scroll-to-top"))
  document.querySelector(".scroll-to-top").addEventListener("click", () => {
    document
      .querySelector(".intrapage-nav")
      .scrollIntoView({ behavior: "smooth" });
  });

// Setting up Intersection Observer for Image Lazy-Loading
const imageObserver = function (list) {
  let elementObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.style.visibility = "visible";
        observer.unobserve(entry.target);
      });
    },
    {
      root: null,
      threshold: 0.1,
      rootMargin: "0px",
    }
  );

  list.forEach((item) => {
    elementObserver.observe(item);
  });
};

const sectionObserver = new IntersectionObserver(
  (intersectionEntries) => {
    intersectionEntries.forEach((entry) => {
      if (
        entry.isIntersecting ||
        window.pageYOffset < entry.boundingClientRect.y
      ) {
        DOMelements.scrollToTop.classList.add("hidden");
      } else {
        DOMelements.scrollToTop.classList.remove("hidden");
      }
    });
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "0px",
  }
);

// Observer for Image Lazy Loading
imageObserver(DOMelements.caseStudyImages);

// We want to observe the second Case Study Section
if (DOMelements.caseStudySection)
  sectionObserver.observe(DOMelements.caseStudySection);

// async function getTwitterUserID() {
//   try {
//     const getUserInfo = await fetch(
//       `${CREDENTIALS.API_URL}by/username/willgivensiv`,
//       {
//         headers: {
//           Authorization:
//             "Bearer AAAAAAAAAAAAAAAAAAAAAO%2FkQwEAAAAA3rQEpWBo%2Fnfzpybtk7kIZCyNxCg%3DCsSYVh93JLabK1ryWNijrf5p8P2rJw48LO7DCb0rUKDxMgDZw8",
//         },
//       }
//     )
//       .then((response) => response.json)
//       .then((data) => console.log(data));
//     if (getUserInfo.res.ok === "False") throw new Error(getUserInfo.error);
//   } catch (error) {
//     console.error(Error);
//   }
// }

// getTwitterUserID();

// console.log(CREDENTIALS);

// const getTwitterFeed = async function () {
//   let apiCall = await fetch(CREDENTIALS.API_URL);
// };

// function getUserInfo() {
//   let apiCall = fetch(`${CREDENTIALS.API_URL}by/username/willgivensiv`, {
//     headers: {
//       Authorization:
//         "Bearer AAAAAAAAAAAAAAAAAAAAAO%2FkQwEAAAAA3rQEpWBo%2Fnfzpybtk7kIZCyNxCg%3DCsSYVh93JLabK1ryWNijrf5p8P2rJw48LO7DCb0rUKDxMgDZw8",
//     },
//     method: "GET",
//   });

//   apiCall.then((response) => response.json).then((data) => console.log(data));
// }

// getUserInfo();
