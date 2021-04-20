#!/usr/bin/env node
'use strict';

var https = require('https');

function getLatestNonBetaVersion (name) {
  return new Promise(function (resolve, reject) {
    https.get("https://registry.npmjs.org/".concat(name), function (resp) {
      resp.setEncoding('utf8');
      var body = '';
      resp.on('data', function (data) {
        body += data;
      });
      resp.on('end', function () {
        var data = JSON.parse(body);
        var versions = Object.keys(data.versions).reverse();
        var latestNonBetaVersion = data['dist-tags'].latest;
        versions.some(function (v) {
          if (v.indexOf('beta') === -1 && v.indexOf('alpha') === -1) {
            latestNonBetaVersion = v;
            return true;
          }

          return false;
        });
        resolve(latestNonBetaVersion);
      });
    });
  });
}

module.exports = getLatestNonBetaVersion;
