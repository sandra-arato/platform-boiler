'use strict';

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libJquery = require('./lib/jquery');

var _libJquery2 = _interopRequireDefault(_libJquery);

var _libHandlebars = require('./lib/handlebars');

var _libHandlebars2 = _interopRequireDefault(_libHandlebars);

var _modulesTemplates = require('./modules/templates');

var hbs = _interopRequireWildcard(_modulesTemplates);

(function (window, undefined) {
	'use strict';

	console.log('This is the main JS working as expected.');
	var data = { name: 'Sandra Szenti' },
	    $container = (0, _libJquery2['default'])('#container');

	// just to make HBS rendering visible
	var template = _libHandlebars2['default'].template(hbs.test),
	    welcome = template(data);
	(0, _libJquery2['default'])(welcome).appendTo($container);

	// now let's render a list
	var listTemplate = _libHandlebars2['default'].template(hbs.list);
	data.items = [];

	for (var temp in hbs) {
		data.items.push({ 'item': temp });
	}
	(0, _libJquery2['default'])(listTemplate(data)).appendTo($container);
})(window);
"use strict";

var templates = templates || {};
templates["list"] = { "1": function _(depth0, helpers, partials, data) {
        var helper;

        return "		<li>" + this.escapeExpression((helper = (helper = helpers.item || (depth0 != null ? depth0.item : depth0)) != null ? helper : helpers.helperMissing, typeof helper === "function" ? helper.call(depth0, { "name": "item", "hash": {}, "data": data }) : helper)) + "</li>\n";
    }, "compiler": [6, ">= 2.0.0-beta.1"], "main": function main(depth0, helpers, partials, data) {
        var stack1;

        return "<ul>\n" + ((stack1 = helpers.each.call(depth0, depth0 != null ? depth0.items : depth0, { "name": "each", "hash": {}, "fn": this.program(1, data, 0), "inverse": this.noop, "data": data })) != null ? stack1 : "") + "</ul>";
    }, "useData": true };
templates["test"] = { "compiler": [6, ">= 2.0.0-beta.1"], "main": function main(depth0, helpers, partials, data) {
        var helper;

        return "<div class=\"hello\">\n	<p>This is a test paragraph. Thanks for rendering me, " + this.escapeExpression((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing, typeof helper === "function" ? helper.call(depth0, { "name": "name", "hash": {}, "data": data }) : helper)) + "!</p>\n</div>";
    }, "useData": true };
module.exports = templates;
//# sourceMappingURL=all.js.map