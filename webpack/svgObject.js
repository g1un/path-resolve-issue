var fs = require('fs');

//create svg filename-filecontent object
module.exports = (svgDirPath) => {
    let svgFileNamesArr = fs.existsSync(svgDirPath) ? fs.readdirSync(svgDirPath) : [];
    let svgObject = {};

    svgFileNamesArr.forEach((fileName, i) => {
        let _fileName = fileName.replace(/\.[^/.]+$/, "");
        svgObject[_fileName] = fs.readFileSync(svgDirPath + '/' + fileName, 'utf8');
    });
    // console.log('svgObject\n', svgObject);

    return svgObject;
};