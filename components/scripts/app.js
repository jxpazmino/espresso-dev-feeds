// bysite
(function() {


    var Firebase = require('firebase');

    var rootRef = new Firebase('https://scrap-dev-news.firebaseio.com/');

    function displayLastUpdateDate(snapshot) {
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var date = new Date(snapshot.val().lastupdate);
        var formattedDate = date.toDateString();
        var formattedTime = date.toTimeString();
        var updateField = document.getElementById("updatetime");
        updateField.innerHTML = formattedDate.slice(4, 10) + " @ " + formattedTime.slice(0, 5);
    }

    function removeLoadingMessage() {
        var h2 = document.getElementsByTagName("h2");
        document.body.removeChild(h2[0]);
    }

    function reverseSnapshot(snapshot) {
        var snapshotArray = [];
        snapshot.forEach(function(snap) {
            snapshotArray.push(snap.val());
        });
        return snapshotArray.reverse();
    }

    function compare(a, b) {
        if (a.millis < b.millis) return 1;
        else if (a.millis > b.millis) return -1;
        else return 0;
    }

    function fetchAll(snapshot) {
        var dataArray = reverseSnapshot(snapshot);

        var articles = [];

        for (var i = 0, len = dataArray.length; i < len; i++) {
            var site = dataArray[i];
            for (var article in site) {
                articles.push(site[article]);
            }
        }
        
        articles.sort(compare); // most recent data shows first
        
        for (var key in articles) {
            if (articles.hasOwnProperty(key)) {
                var articleData = articles[key];
                var siteTag = articleData.tag;

                var article = document.createElement("article");
                article.innerHTML = '<svg class="left" width="54" height="54" viewbox="0 0 200 200"><use xlink:href="#sym-' + siteTag + '"></use></svg>';

                var title = document.createElement("a");
                title.className = "title";
                title.innerHTML = articleData.title;
                title.setAttribute("href", articleData.url);
                title.setAttribute("target", "_blank");

                var time = document.createElement("time");
                var formattedDate = articleData.date.replace(/\//g, "-");
                time.innerHTML = formattedDate;
                time.setAttribute("datetime", formattedDate);

                article.appendChild(title);
                article.appendChild(time);

                var numComments = articleData.commentcount;
                if (numComments !== void 1) {
                    var comments = document.createElement("a");
                    if (numComments === 1) {
                        comments.innerHTML = numComments + " comment";
                    } else {
                        comments.innerHTML = numComments + " comments";
                    }
                    comments.className = "comments";
                    comments.setAttribute("href", articleData.commenturl);
                    comments.setAttribute("target", "_blank");
                    article.appendChild(comments);
                } else {
                    var nocomments = document.createElement("span");
                    nocomments.className = "comments";
                    nocomments.innerHTML = "&nbsp;"; //keep block formatting
                    article.appendChild(nocomments);
                }

                var content = document.getElementById("content");
                content.appendChild(article);
            }
        }


    }

    rootRef.child("settings").once("value", displayLastUpdateDate);
    rootRef.child("sites").once("value").then(fetchAll).then(removeLoadingMessage);


})();