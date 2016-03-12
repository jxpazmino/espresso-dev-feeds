var Handlebars = require('handlebars');
var data = {
    title: 'My title',
    people: [
        {
            name: 'jon',
            age: 34
        },
        {
            name: 'mary',
            age: 24
        },
        {
            name: 'abby',
            age: 11
        }
    ]
};

var template = Handlebars.compile(document.getElementById('people-template').innerHTML);

var content = document.getElementById('content');
content.innerHTML = template(data);