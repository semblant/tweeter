/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/**
 *  Function that takes in the text of a tweet and escapes the text to protect from XSS.
 *
 * @param {String} tweetText - the tweet to escape
 * @returns
 *         the inner HTML of the section???
 */
const escapeChars = function (tweetText) {
  let section = document.createElement("section");
  section.appendChild(document.createTextNode(tweetText));
  return section.innerHTML;
};

 /**
   * Function takes a tweet object and returns the HTML for the object
   *
   * @param {Object} tweet - the tweet to create the HTML for
   *
   * @returns tweet in HTML format (<article>)
   */

 const createTweetElement = function(tweet) {
  /*
    In your createTweetElement function, you're directly assigning the values from the tweet object to variables. While this works, it might be cleaner to use destructuring to extract the values. For example, you could write:

    const { name: userName, avatars: userAvatar, handle: userHandle } = tweet.user;
    const { text: tweetContent } = tweet.content;
  */

  // Store info from the tweet
  const userName = tweet.user.name;
  const userAvatar = tweet.user.avatars;
  const userHandle = tweet.user.handle;
  const tweetContent = tweet.content.text;
  const tweetCreateDate = tweet.created_at;

  // Create HTML variable
  const tweetDetails = `<article class='tweet'>
      <header>
        <span class="tweet-name">
          <img class="avatar" src=${userAvatar}/> ${userName}
        </span>
        <h3>${userHandle}</h3>
      </header>
      <section class='tweet-text'>${escapeChars(tweetContent)}</section>
      <footer>
        <span> ${timeago.format(tweetCreateDate)}</span>
        <div class='tweet-icons'>
          <i name='retweet' class='fas fa-retweet'></i>
          <i name='flag' class='fas fa-flag'></i>
          <i name='heart' class='fas fa-heart'></i>
        </div>
      </footer>
    </article>`;
  return tweetDetails;
};

/**
*  Function passes each tweet in the database to createTweetElement() and appends the return value to the HTML container
*
* @param {Object} tweets - database of tweets
*/
const renderTweets = function(tweets) {
// Loop through each tweet in the DB
for (const $tweet of tweets) {
  const $tweetElement =  createTweetElement($tweet); // get HTML format of tweet
  $('.tweets-container').prepend($tweetElement); // append tweet in HTML
}
}


/**
 * Function that makes a request to '/', grabs the results and passes them to the renderTweets function
 */
const loadTweets = function() {
  $('.tweets-container').empty();
  $.get('/tweets')
  .then((tweets) => { // after successful get request
    renderTweets(tweets)
  })
  .catch((e) => { // catch any errors
    alert(e);
  })
}


/**
* Function that takes in a tweet and validates that it is less than 140 characters and is not blank.
*
* @param {string} tweet - the tweet to validate
* @returns
*        - false: tweet either is > 140 chars or is blank
*        - true: tweet is valid
*/
const validateTweet = function(tweet) {
  if (!tweet) {
    $('.blankError').slideDown(); // Show empty tweet error
    return;
  }
  if (tweet.length > 140) {
    $('.charError').slideDown(); // Show character limit error
    return;
  }
  $('.errorBox').slideUp(); // Hide previous errors
  return true; // Valid tweet
}


// Requests the tweets path to render tweets and handles tweet submission
$(document).ready(function() {
  // Add event listener to send tweet data to server on submit
  $('#tweet-form').on('submit', function(event) {
    event.preventDefault();

    // Get values from elements on the page
    const $form = $(this);
    const content = $form.find("textarea[name='text']").val();
    //console.log($form.serialize("textarea[name='text']")) // not sure how to use serialize()
    //const content = $form.serialize();
    const url = $form.attr("action");

    // Validation
    $('.errorBox').slideUp(); // Hide previous errors
    if (!validateTweet(content)) return;

    // Send the data using post
    $.post(url, { text: content }) // Larry suggests:  replace { text: content } with $form.serialize(). => doesn't work semantically?
    .catch((err) => {
      alert(err);
    })
    .done(() => {
      loadTweets(); // load newest tweet
    });
  });

  loadTweets();
});



