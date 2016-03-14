(function() {
    var url_scrape = 'https://scrap-dev-news.firebaseio.com/sites.json';
    var request;
    var items;

    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
    } else {
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }

    request.open('GET', url_scrape, true);
    request.onreadystatechange = function() {
        if((request.readyState===4) && (request.status===200)) {
            items = JSON.parse(request.responseText);
        }
    }
    request.send();
    
    
    console.log("items", items);
    
})();