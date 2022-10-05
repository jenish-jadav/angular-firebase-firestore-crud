const fs = require('fs');
let envFileContent = process.argv[2];
//envFileContent=envFileContent.substring(1,envFileContent.length-1)
fs.writeFileSync("src/environments/environment.prod.ts", envFileContent);
