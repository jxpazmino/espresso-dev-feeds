var Handlebars = require("handlebars");
 {"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"hello\" style=\"border: 1px solid red;\">\r\n    <h1>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h1>\r\n    <div class=\"body\">\r\n        Hello, "
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "! I'm a template. \r\n    </div>\r\n</div>\r\n<!--<div class=\"container\">\r\n    <div class=\"row\">\r\n        <div class=\"col m12\">\r\n            <div class=\"card-panel white\" style=\"margin-bottom:0; padding:0px;\">\r\n                <svg class=\"sym-s left\" width=\"54\" height=\"54\" viewbox=\"0 0 200 200\" style=\"margin-right:10px;margin-top:0px; margin-left:0px; margin-bottom:-6px\">\r\n                    <use xlink:href=\"#sym-s\"></use>\r\n                </svg>\r\n                <h5 class=\"truncate\" style=\"max-width:70%; display:inline-block;\">"
    + alias4(((helper = (helper = helpers.href || (depth0 != null ? depth0.href : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"href","hash":{},"data":data}) : helper)))
    + " - "
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h5>\r\n                <time datetime=\"2016-11-30\" class=\"right\" style=\"display:inline-block; padding: 10px; margin-top:6px;max-width:200px\">2 days ago</time>\r\n                <div style=\"clear:both\"></div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div class=\"container\">\r\n    <div class=\"row\">\r\n        <div class=\"col m12\">\r\n            <div class=\"card-panel white\" style=\"margin-bottom:0; padding:0px;\">\r\n                <svg class=\"sym-s left\" width=\"54\" height=\"54\" viewbox=\"0 0 200 200\" style=\"margin-right:10px;margin-top:0px; margin-left:0px; margin-bottom:-6px\">\r\n                    <use xlink:href=\"#sym-s\"></use>\r\n                </svg>\r\n                <h5 class=\"truncate\" style=\"max-width:70%; display:inline-block;\">Lorem ipsum dolor sit amet, consec lksjd lks lktetur adipisicing elit Lorem adipisicing elit lorem klsjd l ipsum dolor sit amet, consectetur </h5>\r\n                <time datetime=\"2016-11-30\" class=\"right\" style=\"display:inline-block; padding: 10px; margin-top:6px;max-width:200px\">2 days ago</time>\r\n                <div style=\"clear:both\"></div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>-->";
},"useData":true}