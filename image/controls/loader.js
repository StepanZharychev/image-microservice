const sharp = require('sharp');
const path = require('path');

const loadImage = (fileString, fullname, previewName) => {
    const buf = Buffer.from(fileString, 'base64');
    sharp(buf).toFile(path.join(__dirname, `../imgs/${fullname}`));
    sharp(buf).resize(200, 200).toFile(path.join(__dirname, `../imgs/${previewName}`));
};

module.exports = {
    load: loadImage
};