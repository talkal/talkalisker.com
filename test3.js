const fs = require('fs');
fs.writeFileSync('test3.txt', `replace(/\\/$/, '')`);
