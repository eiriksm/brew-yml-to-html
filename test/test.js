require('should');
var b = require('..');
var fs = require('fs');

describe('Module functionality', function() {
  it('Should export a function', function() {
    b.should.be.instanceOf(Function);
  });
  it('Should read the test brew.yml file', function() {
    var filename = './test/assets/brews.yml';
    var template = fs.readFileSync('./test/assets/brews.html', 'utf-8');
    var r = b(filename, template);
    console.log(r);
  });
});
