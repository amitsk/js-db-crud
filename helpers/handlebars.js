import Handlebars from 'handlebars';

Handlebars.registerHelper('capitalize', function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
});

Handlebars.registerHelper('obj', function(obj) {
  return JSON.stringify(obj, null, 2);
});