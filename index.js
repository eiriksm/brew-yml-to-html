var yaml = require('js-yaml');
var fs = require('fs');

module.exports = function(filename, template) {
  try {
    var data = yaml.safeLoad(fs.readFileSync(process.cwd() + '/' + filename, 'utf-8'));
    var html = {};
    for (var prop in data) {
      if (data.hasOwnProperty(prop)) {
        // Write a js object with these properties.
        var js = [];
        // Write it with a script tag and everything.
        js.push("<script>var docs = JSON.parse('");
        js.push(JSON.stringify(data[prop]));
        js.push("');</script>");
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
