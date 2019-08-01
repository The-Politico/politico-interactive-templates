const https = require('https');

export default function(name) {
  return new Promise((resolve, reject) => {
    https.get(`https://registry.npmjs.org/${name}`, resp => {
      resp.setEncoding('utf8');
      let body = '';

      resp.on('data', data => {
        body += data;
      });

      resp.on('end', () => {
        const data = JSON.parse(body);
        const versions = Object.keys(data.versions).reverse();
        let latestNonBetaVersion = data['dist-tags'].latest;
        versions.some(v => {
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
