var yaml = require('js-yaml');
var fs = require('fs');

module.exports = function(filename, template) {
  try {
    var data = yaml.safeLoad(fs.readFileSync(process.cwd() + '/' + filename, 'utf-8'));
    var html = {};
    for (var prop in data) {
      if (data.hasOwnProperty(prop)) {
        var js = [];
        js.push("var docs = JSON.parse('");
        js.push(JSON.stringify(data[prop]));
        js.push("');");
        html[prop] = template.replace('{{graphs}}', js.join(''));
      }
    }
    return html;
  }
  catch (err) {
    console.error(err);
    throw new Error('Error loading data. Probably the file does not exist?');
  }
};
