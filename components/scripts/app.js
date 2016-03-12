"use strict";
var $ = require('jquery');
var Handlebars = require('handlebars');
var templates = require('templates');
var data = { title: 'This Form', name: 'Joey' };
var output = templates.feeds;
var html = templates.feeds(data);
// console.log(html);

$(document).ready(function () {
    $('#content').html(html);
    
    // var content = document.getElementById('content');
    // content.innerHTML = output;
});

// var content = document.getElementById('content');
// content.innerHTML = template(data);