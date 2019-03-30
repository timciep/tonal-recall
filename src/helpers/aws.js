var AWS = require('aws-sdk');


var albumBucketName = 'audio-bits-data';
var bucketRegion = 'us-east-2';
var IdentityPoolId = 'us-east-2:4e5876dd-4d80-4081-8b5a-ee9df06311c9';

// AWS.config.update({
//   region: bucketRegion,
//   credentials: new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: IdentityPoolId
//   })
// });

AWS.config.region = bucketRegion;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: IdentityPoolId
});

let s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: { Bucket: albumBucketName }
});

// export { s3 }

module.exports.s3 = s3;