var $ = require('jquery');
var url_scraper = 'https://scrap-dev-news.firebaseio.com/sites.json',
    url_reddit_webdev = 'https://www.reddit.com/r/webdev.json',
    url_reddit_firebase = 'https://www.reddit.com/r/firebase.json';

var scraper = $.getJSON(url_scraper);
var reddit_webdev =$.getJSON(url_reddit_webdev);

$.when(scraper, reddit_webdev).done(function(scraper,reddit_webdev) {
    console.log(scraper[0]);
    console.log(reddit_webdev[0].data.children);
});