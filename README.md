## Boilerplate for the impatient developer

This boilerplate provides a starting point for medium size projects. I built it with the following work flow in mind:

- Different sites in project load the same CSS and JS
- Minimal HTML is added to each site, and then user-specific data is rendered via Handlebars
- The data would be coming from each components module / through sockets, or ajax call - whatever you like
- Inline CSS and deferred JS makes sure of quick rendering
- Accessibility is checked before deploy, though you have an option to queue that up to watch html changes

### Technologies

- ES6 aka Harmony
- [Babel](https://babeljs.io/) to transpile JS back to ES5
- [Browserify](http://browserify.org/) to deal with the modules
- [Handlebars](http://handlebarsjs.com/) for templating
- [Sass](http://sass-lang.com/) instead of pure CSS
- [Critical](https://github.com/addyosmani/critical) for inlining CSS

### Disclaimer

Use it as you like, it might not be perfect, but it's a good start to modify it to your preference. I can't guarantee anything and will not fix future bugs. The purpose of this setup was to get something out there that can produce well performing sites and also build in accessibility safety check. If you think you can improve it without increasing specificity, don't hesitate to send a pull request.