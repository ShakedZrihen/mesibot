const AWS = require('aws-sdk');
const fs = require('fs');

module.exports.logFormat = serverless => {
  const file = fs.readFileSync('config/log-format.json', 'utf-8');
  return JSON.stringify(JSON.parse(file));
};
