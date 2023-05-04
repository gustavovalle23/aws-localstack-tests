import AWS from 'aws-sdk'
import fs from 'fs'
import { createBucketIfDoesNotExists } from './bucketOperations'
import dotenv from 'dotenv';

dotenv.config();

const bucketName = process.env.BUCKET_NAME || 'my-bucket';

const accessKeyId = process.env.ACCESS_KEY_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const endpoint = process.env.ENDPOINT;

const s3 = new AWS.S3({
  endpoint,
  accessKeyId,
  secretAccessKey,
  s3ForcePathStyle: true,
})


createBucketIfDoesNotExists({ bucketName, s3 })

const fileContent = fs.readFileSync('node.png')

s3.putObject({ Bucket: 'my-bucket', Key: 'path/to/file.png', Body: fileContent }).promise().then((response) => {
  console.log(response)
})


s3.listObjects({ Bucket: bucketName }, (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Bucket ${bucketName} contains ${data.Contents?.length} files:`);
    data.Contents?.forEach((item) => {
      console.log(item.Key);
    });
  }
});
