var fs = require('fs');
var path = require('path');
var basePath = path.resolve('build/tasks/configs');

// This will load all the files in this directory and make them available
// to the Grunt build.  Properties are prefixed by the file name
fs.readdirSync(basePath).forEach(function(file)
{
    if (file.match(/.+\.js/g) !== null)
    {
        var name = file.replace('.js', '');
        exports[name] = require(basePath + '/' + file);
    }
});
