import $ from './lib/jquery';
import Handlebars from './lib/handlebars';
import * as hbs from './modules/templates';

(function(window, undefined){
	'use strict';

	console.log('This is the main JS working as expected.');
	var data = { name: 'Sandra Szenti'},
		$container = $('#container');

	// just to make HBS rendering visible
	var template = Handlebars.template(hbs.test),
		welcome = template(data);
	$(welcome).appendTo($container);

	// now let's render a list
	var listTemplate = Handlebars.template(hbs.list);
	data.items = [];

	for (let temp in hbs) {
		data.items.push({'item': temp});
	}
	$(listTemplate(data)).appendTo($container);

}(window));
