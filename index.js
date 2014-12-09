var yaml = require('js-yaml');
var fs = require('fs');

module.exports = function(filename, template) {
  try {
    var data = yaml.safeLoad(fs.readFileSync(process.cwd() + '/' + filename, 'utf-8'));
    var html = {};
    for (var prop in data) {
      if (data.hasOwnProperty(prop) && data[prop]) {
        html[prop] = template;
        // Write a js object with the properties we know.
        for (var p in data[prop]) {
          var replaceString = '{{' + p + '}}';
          if (!template.indexOf(replaceString) > 0) {
            continue;
          }
          var js = [];
          // Write it with a script tag and everything.
          js.push("<script>var docs = JSON.parse('");
          js.push(JSON.stringify(data[prop][p]));
          js.push("');</script>");
          html[prop] = html[prop].replace(replaceString, js.join(''));
        }
      }
    }
    return html;
  }
  catch (err) {
    console.error(err);
    throw new Error('Error loading data. Probably the file does not exist?');
  }
};
