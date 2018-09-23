const fs = require('fs');
const path = require('path');

let prevIncludes;

module.exports = function(source) {
    this.cacheable();

    let includesPath = this.query.pathToIncludes;
    let includes;

    let pathFrom = this.resource.substring(0, this.resource.lastIndexOf("/"));
    let pathTo = includesPath;
    let relativeFromToPath = path.relative(pathFrom, pathTo) + '/';

    includes = fs.readdirSync(includesPath);

    if(prevIncludes === includes) {
        console.log('includesLoader: Includes are the same.');
        return source;
    } else {
        console.log('includesLoader: Includes were changed.');
        prevIncludes = includes;
        let includesList = '';

        includes.forEach(function(include) {
            includesList += 'include ' + relativeFromToPath + include + '\n';
        });
        includesList = includesList.replace('include _includes.pug', '');

        return includesList + source;
    }
};