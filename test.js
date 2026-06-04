const fs = require('fs');
const html = `replace(/[\\/]$/, '')`;
fs.writeFileSync('test.html', html);
