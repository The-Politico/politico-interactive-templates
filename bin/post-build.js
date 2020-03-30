// Replaces
// "var rest = require('@octokit/rest');" with
// "var { Octokit } = require('@octokit/rest');"
const fs = require('fs-extra');
const path = require('path');

const DIST = path.join(__dirname, '..', 'dist');
const IDX_LOC = path.join(DIST, 'index.js');
const CLI_LOC = path.join(DIST, 'cli.js');

const replaceText = file => {
  file = file.replace(
    `var rest = require('@octokit/rest');`,
    `var { Octokit } = require('@octokit/rest');`
  );

  file = file.replace(
    `new rest.Octokit`,
    `new Octokit`
  );

  return file;
};

const run = async() => {
  let idxjs = await fs.readFile(IDX_LOC, 'utf8');
  let clijs = await fs.readFile(CLI_LOC, 'utf8');

  idxjs = replaceText(idxjs);
  clijs = replaceText(clijs);

  await Promise.all([
    fs.outputFile(IDX_LOC, idxjs, 'utf8'),
    fs.outputFile(CLI_LOC, clijs, 'utf8'),
  ]);
};

if (require.main === module) {
  run();
}
