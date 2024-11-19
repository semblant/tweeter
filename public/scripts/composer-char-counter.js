$(document).ready(function() {
  console.log('working!')

  // Select the form element
  const tweetForm = document.querySelector("#tweet-form");

  // Add event listener to update the character counter on input
  tweetForm.addEventListener('input', function(event) {
  event.preventDefault();

  const maxChar = 140;
  const charsTyped = event.target.value; // Get current text from textarea element
  const outputElement = this.elements.counter // Access output element in DOM
  let remainingChars = maxChar - charsTyped.length;

  // Update the output element with remaining character count
  outputElement.value = remainingChars;

  // Change Colour based on remaining characters
  if (remainingChars < 0 ) {
    outputElement.style.color = "red";
  } else {
    outputElement.style.color = "#a49e96"
  }

  });
});

