const og = require('open-graph');

const url = 'https://github.com/lydiahallie/javascript-questions';

og(url, function (err, meta) {
  console.log(meta);
});
