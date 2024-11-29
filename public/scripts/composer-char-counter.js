$(document).ready(function() {
  // Add event listener to update the character counter on input
  $("#tweet-form").on('input', function() {
    const maxChar = 140;
    const charsTyped = $("#tweet-text").val().length; // Get current text from textarea element
    let remainingChars = maxChar - charsTyped;

    // Update the output element with remaining character count
    const $counter = $(this).find(".counter"); // Access output element in DOM
    $counter.val(remainingChars);

    // Change Colour based on remaining characters
    if (remainingChars < 0) {
      $counter.css("color", "red");
    } else {
      $counter.css("color", "#a49e96");
    }
  });
});

