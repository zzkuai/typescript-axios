const path = require('path');

exports.resolve = (file) => path.resolve(__dirname, '../' + file);
