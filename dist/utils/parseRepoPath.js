"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

/*
 * Parses an owner and repo from a GitHub string
 * example The-Politico/template_pit-test
 * example: https://github.com/The-Politico/template_pit-test
 * example: git@github.com:The-Politico/template_pit-test.git
 */
exports.default = repoPath => {
  let str = repoPath;
  str = str.replace(/git@github\.com:/, '');
  str = str.replace(/https?:\/\/github.com\//, '');
  str = str.replace(/\.git/, '');
  const parts = str.split('/');

  if (parts.length !== 2) {
    throw new Error(`Invalid repo path: ${repoPath}`);
  }

  return {
    owner: parts[0],
    repo: parts[1]
  };
};