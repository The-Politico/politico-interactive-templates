#!/usr/bin/env node
'use strict';

var hermes = require('@politico/hermes');
var rest = require('@octokit/rest');

hermes.env.loadEnvFromPibrc();
var client = new rest.Octokit({
  auth: process.env.GITHUB_TOKEN
});

module.exports = client;
