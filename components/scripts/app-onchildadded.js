var Firebase = require('firebase');

var rootRef = new Firebase('https://scrap-dev-news.firebaseio.com/');

rootRef.child("settings").on("value", function(snapshot) {
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var date = new Date(snapshot.val().lastupdate);
    var formattedDate = date.toDateString();
    var formattedTime = date.toTimeString();
    var updateField = document.getElementById("updatetime");
    updateField.innerHTML = formattedDate.slice(4,10) + " @ " + formattedTime.slice(0,5);
});


var fetchArticles = rootRef.child("articles").orderByChild("millisInverse").on("child_added", function(snapshot) {
    var data = snapshot.val();
    var siteTag = snapshot.key().slice(11,13);
    
    var article = document.createElement("article");
    article.innerHTML = '<svg class="left" width="54" height="54" viewbox="0 0 200 200"><use xlink:href="#sym-' + siteTag + '"></use></svg>';
    
    var title = document.createElement("a");
    title.className = "title";
    title.innerHTML = data.title;
    title.setAttribute("href", data.url);
    title.setAttribute("target", "_blank");
    
    var time = document.createElement("time");
    var formattedDate = data.date.replace(/\//g,"-");
    time.innerHTML = formattedDate;
    time.setAttribute("datetime", formattedDate);
    
    article.appendChild(title);
    article.appendChild(time);
    
    var numComments = data.commentcount;
    if(numComments !== void 1) {
        var comments = document.createElement("a");
        if(numComments===1) {
            comments.innerHTML = numComments + " comment";
        } else {
            comments.innerHTML = numComments + " comments";
        }
        comments.className = "comments";
        comments.setAttribute("href", data.commenturl);
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
    
});
var content = document.getElementById("content");
var h2 = document.getElementsByTagName("h2");
content.removeChild(h2[0]);


// rootRef.off("child_added");
