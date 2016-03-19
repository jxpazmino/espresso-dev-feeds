// sidemenu1
(function() {
    var millisNow = new Date().getTime();
    var Firebase = require('firebase'),
        rootRef = new Firebase('https://scrap-dev-news.firebaseio.com/');

    function displayLastUpdateDate(snapshot) {
        var date = new Date(snapshot.val().lastupdate),
            formattedDate = date.toDateString(),
            formattedTime = date.toTimeString(),
            updateField = document.getElementById("updatetime");
        updateField.innerHTML = "// Updated: " + formattedDate.slice(0, 10) + " @ " + formattedTime.slice(0, 5);
    }

    function toggleLoadingMsg() {
        var h2 = document.getElementsByTagName("h2");
        h2[0].style.display === "none" ? h2[0].style.display = "block" : h2[0].style.display = "none";
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

    function getTimeAgo(millisArticle) {
        var millisDif = Math.abs(millisNow - millisArticle);
        var minutes = Math.floor(millisDif / 1000 / 60);
        var hours = Math.floor(minutes / 60);
        var days = Math.floor(hours / 24);
        var months = Math.floor(days / 30);
        var years = Math.floor(months / 12);

        var timeAgo;
        if (years > 0) {
            timeAgo = (years === 1) ? "a year ago" : years + " years ago";
        } else if (months > 0) {
            timeAgo = (months === 1) ? "a month ago" : months + " months ago";
        } else if (days > 0) {
            timeAgo = (days === 1) ? "a day ago" : days + " days ago";
        } else if (hours > 0) {
            timeAgo = (hours === 1) ? "an hour ago" : hours + " hours ago";
        } else if (minutes > 0) {
            timeAgo = (minutes === 1) ? "a minute ago" : minutes + " minutes ago";
        } else {
            timeAgo = "now";
        }
        return timeAgo;
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
                var articleData = articles[key],
                    siteTag = articleData.tag,
                    numComments = articleData.commentcount,
                    articleMillis = articleData.millis,
                    content = document.getElementById("content"),
                    article = document.createElement("article"),
                    title = document.createElement("a"),
                    time = document.createElement("time");

                article.innerHTML = '<svg class="left" width="54" height="54" viewbox="0 0 200 200" style="fill:blue"><use xlink:href="#sym-' + siteTag + '" style="fill:blue"></use></svg>';

                title.className = "title";
                title.innerHTML = articleData.title;
                title.setAttribute("href", articleData.url);
                title.setAttribute("target", "_blank");

                time.innerHTML = getTimeAgo(articleMillis);
                time.setAttribute("datetime", articleMillis);

                article.appendChild(title);
                article.appendChild(time);

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

                content.appendChild(article);
            } //if
        } //for
    } //fetchAll


    rootRef.child("sites").once("value")
        .then(fetchAll)
        .then(function() {
            rootRef.child("settings").once("value", displayLastUpdateDate);
            toggleLoadingMsg();
        });
    
    
    // window.addEventListener("keydown", function(e){
    //     if(e.which == 77 || e.keyCode == 77) {
    //         e.preventDefault();
    //         var checkbox = document.getElementById("toggle");
    //         var checked = checkbox.getAttribute("checked");
    //         console.log(checked);
    //         if(checked==="checked") {
    //             checkbox.removeAttribute("checked");
    //         } else {
    //             checkbox.setAttribute("checked", "checked");
    //         }
    //     }
    // });
    
    // var menu = document.getElementsByTagName("label");
    // menu[0].addEventListener("click", function() {
    //     var checkbox = document.getElementById("toggle");
    //     var checked = checkbox.getAttribute("checked");
    //     console.log(checked);
    //     if(checked==="checked") {
    //         checkbox.removeAttribute("checked");
    //     } else {
    //         checkbox.setAttribute("checked", "checked");
    //     }
    // });
})();



