// create a style sheet
let styleSheet = document.head.appendChild(document.createElement("style")).sheet;

// get rotating title containerm and number of children
let rotatingTitleContainer = document.getElementById("rotating-title-container");
let numTitles = rotatingTitleContainer.children.length;

// set seconds per title
let secondsPerTitle = 3;

// percentage of seconds per title that is held (0-1, reccomended 0.5)
let titleHoldPercent = 0.5;
let titleHold = (100 / numTitles) * titleHoldPercent;

// percentage of seconds per title that is held (0-1, reccomended 0.5)
let test = 0.1;
let titleBouncePercent = (100 / numTitles) * test;
// % of title height to translate up for bounce (0-100)
let titleBounceTranslateY = 1.5;

// create keyframes rule
let keyframesRule = `
  @keyframes rotateTitles {

    /* Title */
    0% {
      transform: translateY(0%);
    }

    /* Title Hold */
    ${titleHold}% {
      transform: translateY(0%);
    }`;

// dynamically create steps for keyframes
for (let i = 1; i < numTitles; i++) {
  keyframesRule += `
    /* Title Bounce */
    ${(i * 100) / numTitles - titleBouncePercent}% {
      transform: translateY(${-100 * i - titleBounceTranslateY}%);
    }

    /* Title */
    ${(i * 100) / numTitles}% {
      transform: translateY(${-100 * i}%);
    }

    /* Title Hold */
    ${(i * 100) / numTitles + titleHold}% {
      transform: translateY(${-100 * i}%);
    }
    `;
}

// finish keyframes rule
keyframesRule += `
    /* Title Bounce */
    ${100 - titleBouncePercent}% {
      transform: translateY(${-100 * numTitles - titleBounceTranslateY}%);
    }

    /* Title */
    100% {
      transform: translateY(${-100 * numTitles}%);
    }
  }`;

console.log(keyframesRule);

// insert keyframes into stylesheet
styleSheet.insertRule(keyframesRule, styleSheet.cssRules.length);

// set animation for each title, dynamically setting duration based on number of titles
for (let child of rotatingTitleContainer.children) {
  child.style.animation = `rotateTitles ${numTitles * secondsPerTitle}s infinite ease-in-out`;
}

// duplicate first title to end of container so loop is continuous
let firstTitle = rotatingTitleContainer.firstElementChild;
let duplicatedTitle = firstTitle.cloneNode(true);
rotatingTitleContainer.appendChild(duplicatedTitle);

// SVG ANIMATION //////////////////////////////////////////////////////

// // set path lengths to 1 so they all go at the same speed
// document.querySelectorAll(".svg-title > path").forEach((path) => {
//   path.setAttribute("pathLength", 1);
// });

// // settings for trace intersection observer viewport
// let traceOptions = {
//   // sets viewport as container
//   root: null,
//   // changes size of the viewport detecting intersections
//   rootMargin: "0px",
//   // % of the element that needs to be visible to trigger animation
//   threshold: 1,
// };

// // animate svg on entering viewport
// let svgTraceObserver = new IntersectionObserver((entries) => {
//   entries.forEach((entry) => {
//     // if entering viewport
//     if (entry.isIntersecting) {
//       // animate
//       svgTitleTrace(entry.target.id);
//     }
//   });
// }, traceOptions);
// // observe each target with class .svg-title
// document.querySelectorAll(".svg-title").forEach((element) => {
//   svgTraceObserver.observe(element);
// });

// // settings for erase intersection observer viewport
// let eraseOptions = {
//   // sets viewport as container
//   root: null,
//   // changes size of the viewport detecting intersections
//   rootMargin: "0px",
//   // % of the element that needs to be visible to trigger animation
//   threshold: 0.25,
// };

// // erase svg if outside viewport
// let svgEraseObserver = new IntersectionObserver((entries) => {
//   entries.forEach((entry) => {
//     // if outside viewport
//     if (entry.isIntersecting == false) {
//       // reset animation
//       let paths = document.querySelectorAll("#" + entry.target.id + " > path");
//       paths.forEach((path) => {
//         // reset animation for each path
//         path.style.animation = "undraw 0ms";
//       });
//     }
//   });
// }, eraseOptions);
// // observe each target with class .svg-title
// document.querySelectorAll(".svg-title").forEach((element) => {
//   svgEraseObserver.observe(element);
// });

// // start name trace
// function svgTitleTrace(id) {
//   // select svg path layers
//   let layer1 = document.querySelectorAll("#" + id + " > .layer1");
//   let layer2 = document.querySelectorAll("#" + id + " > .layer2");
//   // set speed for trace
//   let traceSpeed = 2;
//   // set delay between svg paths
//   let pathDelay = 10;
//   // set delay for second layer trace
//   let layerDelay = 100;
//   // set initial delay
//   let delayCounter = 0;
//   // iterate through first layer
//   layer1.forEach((path) => {
//     // define speed for each path
//     let length = path.getTotalLength() * traceSpeed;
//     // set animation for each path
//     path.style.animation = "draw " + length + "ms ease-out forwards " + delayCounter + "ms";
//     // increase delay for each path
//     delayCounter = delayCounter + length + pathDelay;
//   });
//   // reset delay for second layer
//   delayCounter = 0 + layerDelay;
//   // iterate through second layer
//   layer2.forEach((path) => {
//     // define speed for each path
//     let length = path.getTotalLength() * traceSpeed;
//     // set animation for each path
//     path.style.animation = "draw " + length + "ms ease-out forwards " + delayCounter + "ms";
//     // increase delay for each path
//     delayCounter = delayCounter + length + pathDelay;
//   });
// }
