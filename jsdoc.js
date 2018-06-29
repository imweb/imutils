const { exec } = require('child_process');

const config = require('./package.json');

const { version } = config;

const cmd = `./node_modules/.bin/jsdoc -d ./doc/${version} --configure .jsdoc.json --verbose`;

exec(cmd, { env: process.env }, (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
  if (stderr) {
    console.log(stderr);
  }
  if (stdout) {
    console.log(stdout);
  }
});
