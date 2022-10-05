const fs = require('fs');
let envFileContent = process.argv[2];
fs.writeFileSync("src/environments/environment.prod.ts", envFileContent);
fs.writeFileSync("src/environments/environment.ts", envFileContent);
