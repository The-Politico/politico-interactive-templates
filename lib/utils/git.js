#!/usr/bin/env node
'use strict';

require('@politico/interactive-bin/lib/scripts/env');
var rest = require('@octokit/rest');

var client = new rest.Octokit({
  auth: process.env.GITHUB_TOKEN
});

module.exports = client;
