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
    // console.log(snapshot.val().date + " : " + snapshot.val().title + " : " + snapshot.val().site + " @ " + snapshot.val().url);
    var data = snapshot.val();
    
    
    var article = document.createElement("article");
    
    var svgAttrs = {
        width: "54",
        height: "54",
        version: "1.1",
        viewbox: "0 0 200 200",
    };
    
    // var svg = document.createElement("svg");
//    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//     svg.className = "left";
//     svg.innerHTML = '<use xlink:href="#sym-sv"></use>';
//     svg.setAttribute("fill", "red");
//     // var use = document.createElement("use");
//     // use.setAttribute("xlink:href", "#sym-s");
//     // svg.appendChild(use);
//     for(var key in svgAttrs) {
//         svg.setAttribute(key, svgAttrs[key]);
//     }
    
    var title = document.createElement("a");
    title.className = "title";
    title.innerText = data.title;
    title.setAttribute("href", data.url);
    title.setAttribute("target", "_blank");
    
    // var time = document.createElement("time");
    // var formattedDate = data.date.replace(/\//g,"-");
    // time.innerHTML = formattedDate;
    // time.setAttribute("datetime", formattedDate);
    
    // article.appendChild(svg);
    article.appendChild(title);
    // article.appendChild(time);
    
    // var numComments = data.commentcount;
    // if(numComments !== void 1) {
    //     var comments = document.createElement("a");
    //     if(numComments===1) {
    //         comments.innerHTML = numComments + " comment";
    //     } else {
    //         comments.innerHTML = numComments + " comments";
    //     }
    //     comments.className = "comments";
    //     comments.setAttribute("href", data.commenturl);
    //     comments.setAttribute("target", "_blank");
    //     article.appendChild(comments);
    // } else {
    //     var nocomments = document.createElement("span");
    //     nocomments.className = "comments";
    //     nocomments.innerHTML = "&nbsp;"; //keep block formatting
    //     article.appendChild(nocomments);
    // }
    
    var container = document.getElementById("content");
    content.appendChild(article);
    
});

// rootRef.off("child_added");
