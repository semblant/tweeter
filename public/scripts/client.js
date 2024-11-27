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
  $(window).on('scroll', () => {
    const currentScrollTop = $(window).scrollTop();

    // Show/hide writeTweetContainer based on scroll direction
    if (currentScrollTop > 0) {
      $('.writeTweetContainer').slideUp(); // scrolling down
    } else {
      $('.writeTweetContainer').slideDown(); // scrolling up
    }

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
    //console.log($form.serialize("textarea[name='text']")) // not sure how to use serialize()
    //const content = $form.serialize();
    const url = $form.attr("action");

    // Validation
    if (!validateTweet(content)) return;

    // Send the data using post
    $.post(url, { text: content }) // Larry suggests:  replace { text: content } with $form.serialize(). => doesn't work semantically?
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



