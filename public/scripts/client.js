/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Test / driver code (temporary). Eventually will get this from the server.
// Fake data taken from initial-tweets.json
const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


$(document).ready(function() {
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
    const todayDate = Date.now();
    const dateDiff = Math.floor((todayDate - tweetCreateDate) / (86400000));

    // Create HTML variable
    const $tweet = `<article class='tweet'>
        <header>
          <span class="tweet-name">
            <img class="avatar" src=${userAvatar}/> ${userName}
          </span>
          <h3>${userHandle}</h3>
        </header>
        <section class='tweet-text'>${tweetContent}</section>
        <footer>
          <span> ${dateDiff} days ago </span>
          <div class='tweet-icons'>
            <i name='retweet' class='fas fa-retweet'></i>
            <i name='flag' class='fas fa-flag'></i>
            <i name='heart' class='fas fa-heart'></i>
          </div>
        </footer>
      </article>`;
    return $tweet;
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
  renderTweets(tweetData)

  // Add event listener to send tweet data to server on submit
  $('#tweet-form').on('submit', function(event) {
    event.preventDefault();
    $(this).serialize();

    // Get values from elements on the page
    const $form = $(this);
    const content = $form.find("textarea[name='text']").val();
    const url = $form.attr("action");

    // Send the data using post
    $.post(url, { text: content });

  });
});




