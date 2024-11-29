import { loadTweets, validateTweet } from './helpers.js'

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Requests the tweets path to render tweets and handles tweet submission
$(document).ready(function() {
  // Add event listener to display tweet form on click of the 'Write a new tweet' arrows
  $('.fa-solid.fa-angles-down').on('click', function() {
    $('.tweet-form-section').slideToggle();
  })

  // Add event listener to display 'top of page' arrow on scroll
  // Store last scroll position
  let lastScrollTop = 0;

  $(window).on('scroll', () => {
    const currentScrollTop = $(window).scrollTop(); // store current scroll

    // Show/hide writeTweetContainer based on scroll direction
    if (currentScrollTop > lastScrollTop) {
      if ($('.writeTweetContainer').is(':visible')) {
        $('.writeTweetContainer').fadeOut(200); // Fade out (hide)
      }
    } else { // Scrolling up
      if (currentScrollTop <= 100) {
        if (!$('.writeTweetContainer').is(':visible')) {
          $('.writeTweetContainer').fadeIn('slow'); // Fade in (show)
        }
      }
    }
    // Update the last scroll position
    lastScrollTop = currentScrollTop;

    // Show/hide scrollUpButton based on scroll
    if (currentScrollTop > 0) {
      $('#scrollUpButton').show(); // show button if not at the top
    } else {
      $('#scrollUpButton').hide(); // hide the button if at the top
    }
  });

  // Add event listener to send tweet data to server on submit
  $('#tweet-form').on('submit', function(event) {
    event.preventDefault();
    $('.errorBox').slideUp(); // Hide previous errors

    // Get values from elements on the page
    const $form = $(this);
    const content = $form.find("textarea[name='text']").val();
    const url = $form.attr("action");

    // Validation
    if (!validateTweet(content)) return;

    // Send the data using post
    $.post(url, { text: content })
    .catch((err) => {
      alert(err);
    })
    .done(() => {
      $form.find("textarea[name='text']").val(""); // clear form
      loadTweets(); // load newest tweet
    });
  });
  loadTweets();
});



