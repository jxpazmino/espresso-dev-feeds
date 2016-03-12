"use strict";
var $ = require('jquery');
var data = { title: 'This Form', name: 'Joey' };
var html = MyApp.templates.feeds(data);
// console.log(html);

$(document).ready(function () {
    $('#dynamic-content').html(html);
});