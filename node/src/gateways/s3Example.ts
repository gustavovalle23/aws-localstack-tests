import AWS from 'aws-sdk'
import fs from 'fs'
import dotenv from 'dotenv';

dotenv.config();


interface S3BaseInterface {
  s3: AWS.S3;
  bucketName: string;
}

export const createS3Client = () => {
  return new AWS.S3({
    endpoint: process.env.ENDPOINT,
    region: 'us-west-2',
    s3ForcePathStyle: true,
  })
}

const createBucket = ({ s3, bucketName }: S3BaseInterface) => {
  s3.createBucket({ Bucket: bucketName, CreateBucketConfiguration: { LocationConstraint: 'us-west-2', } }, (err: AWS.AWSError) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Bucket ${bucketName} created successfully.`);
    }
  });
};

const createBucketIfDoesNotExists = ({ s3, bucketName }: S3BaseInterface) => {
  s3.headBucket({ Bucket: bucketName }, (headBucketError: AWS.AWSError) => {
    if (headBucketError) {
      if (headBucketError.statusCode === 404) {
        createBucket({ bucketName, s3 });
      } else {
        console.error(headBucketError);
      }
    } else {
      console.log(`Bucket ${bucketName} already exists.`);
    }
  });
};

export const putObjectS3 = ({ s3, bucketName }: S3BaseInterface) => {
  createBucketIfDoesNotExists({ s3, bucketName })

  const fileContent = fs.readFileSync('node.png')

  s3.putObject({ Bucket: bucketName, Key: 'path/to/file.png', Body: fileContent }).promise().then((response) => {
    console.log(response)
  })
}

export const listS3Objects = ({ s3, bucketName }: S3BaseInterface) => {
  return new Promise((resolve, reject) => {
    s3.listObjects({ Bucket: bucketName }, (err, data) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(`Bucket ${bucketName} contains ${data.Contents?.length} files:`);
        resolve(data.Contents);
      }
    });
  });
}

const bucketName = process.env.BUCKET_NAME || 'my-bucket';
const s3 = createS3Client()
s3.config.update({ region: 'us-west-2' })

createBucketIfDoesNotExists({ bucketName, s3 })

const fileContent = fs.readFileSync('node.png')

s3.putObject({ Bucket: bucketName, Key: 'path/to/file.png', Body: fileContent }).promise().then((response) => {
  console.log(response)
})
