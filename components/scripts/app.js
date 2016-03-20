// sidemenu1
(function() {
    var allArticlesLoadedAndSorted;
    function displayLastUpdateDate(snapshot) {
        var date = new Date(snapshot.val().lastupdate),
            formattedDate = date.toDateString(),
            formattedTime = date.toTimeString(),
            updateField = document.getElementById("updatetime");
        updateField.innerHTML = "Last Update: " + formattedDate.slice(0, 10) + " @ " + formattedTime.slice(0, 5);
    }

    function showLoadingMsg(el) {
        var h2 = el || document.getElementsByTagName("h2");
        h2[0].style.display = "inline-block";
    }

    function hideLoadingMsg(el) {
        var h2 = el || document.getElementsByTagName("h2");
        h2[0].style.display = "none";
    }

    function toggleSideNav() {
        var checkbox = document.getElementById("toggle");
        var checked = checkbox.getAttribute("checked");
        if (checked === "checked") {
            return checkbox.removeAttribute("checked");
        } else {
            return checkbox.setAttribute("checked", "checked");
        }
    }

    function reverseSnapshot(snapshot) {
        var snapshotArray = [];
        snapshot.forEach(function(snap) {
            snapshotArray.push(snap.val());
        });
        return snapshotArray.reverse();
    }

    

    function getTimeAgo(millisArticle) {
        var millisDif = Math.abs(millisNow - millisArticle),
            minutes = Math.floor(millisDif / 1000 / 60),
            hours = Math.floor(minutes / 60),
            days = Math.floor(hours / 24),
            months = Math.floor(days / 30),
            years = Math.floor(months / 12),
            timeAgo;

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

    function postContent(articles) {
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
            } //if hasOwnProperty
        } //for
    }

    function fetchSite(id) {
        var articles = [], key;
        if(id==='reddit') {
            for(key in allArticlesLoadedAndSorted) {
                if(allArticlesLoadedAndSorted[key].tag.charAt(0)==='r') {
                    articles.push(allArticlesLoadedAndSorted[key]);
                }
            }
        } else if (id==='all') {
            articles = allArticlesLoadedAndSorted;
        } else {
            for(key in allArticlesLoadedAndSorted) {
                if(allArticlesLoadedAndSorted[key].tag===id) {
                    articles.push(allArticlesLoadedAndSorted[key]);
                }
            }
        }
        postContent(articles);
    }

    function fetchAllSites(snapshot) {
        var dataArray = snapshot.val();
        var articles = [];
        for(var tag in dataArray) {
            var site = dataArray[tag];
            for (var article in site) {
                articles.push(site[article]);
            }
        }
        allArticlesLoadedAndSorted = articles.sort(function (a, b) {
            if (a.millis < b.millis) return 1;
            else if (a.millis > b.millis) return -1;
            else return 0;
        });
        // show articles with most engagement first
        allArticlesLoadedAndSorted = articles.sort(function (a, b) {
            if (a.commentcount < b.commentcount) return 1;
            else if (a.commentcount > b.commentcount) return -1;
            else return 0;
        });
        postContent(articles);
    }
    
    function loadAllContent() {
        rootRef.child("sites").once("value")
        .then(fetchAllSites)
        .then(function() {
            rootRef.child("settings").once("value", displayLastUpdateDate);
            hideLoadingMsg();
        });
    }

    var millisNow = new Date().getTime(),
        Firebase = require('firebase'),
        rootRef = new Firebase('https://scrap-dev-news.firebaseio.com/'),
        menu = document.getElementsByTagName("label"),
        li = document.getElementsByTagName("li");


    menu[0].addEventListener("click", function() {
        var checkbox = document.getElementById("toggle");
        var checked = checkbox.getAttribute("checked");
        if (checked === "checked") {
            checkbox.removeAttribute("checked");
        } else {
            checkbox.setAttribute("checked", "checked");
        }
    });

    for (var i = 0, len = li.length; i < len; i++) {
        li[i].addEventListener("click", function() {
            var id = this.getAttribute("id");
            toggleSideNav();
            var content = document.getElementById("content");
            content.innerHTML = "";
            fetchSite(id);
        });
    }

    window.addEventListener("keydown", function(e) {
        //space bar toggle sidebar menu
        if (e.which == 32 || e.keyCode == 32) {
            e.preventDefault();
            var checkbox = document.getElementById("toggle");
            var checked = checkbox.getAttribute("checked");
            if (checked === "checked") {
                checkbox.removeAttribute("checked");
            } else {
                checkbox.setAttribute("checked", "checked");
            }
        }
    });

    loadAllContent();
})();
