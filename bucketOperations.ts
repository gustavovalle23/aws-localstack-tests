import AWS from 'aws-sdk';

interface CreateBucketInterface {
  bucketName: string;
  s3: AWS.S3;
}

const createBucket = ({ bucketName, s3 }: CreateBucketInterface) => {
  s3.createBucket({ Bucket: bucketName, CreateBucketConfiguration: { LocationConstraint: 'us-west-2' } }, (err: AWS.AWSError) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Bucket ${bucketName} created successfully.`);
    }
  });
};

const checkBucketExists = ({ bucketName, s3 }: CreateBucketInterface) => {
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

export const createBucketIfDoesNotExists = ({ bucketName, s3 }: CreateBucketInterface) => {
  checkBucketExists({ bucketName, s3 });
};
