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
