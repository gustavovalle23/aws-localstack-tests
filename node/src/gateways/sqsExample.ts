import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const QueueUrl = process.env.QUEUE_SQS_SENSOR || 'test'

const SQSConfig = {
  endpoint: process.env.ENDPOINT,
  region: process.env.REGION
};

const createSQSClient = () => {
  return new AWS.SQS(SQSConfig);
}

const sqs = createSQSClient()

sqs.receiveMessage({ QueueUrl, WaitTimeSeconds: 0 }, (err, data) => {
  if (err) {
    console.log(err);
  } else if (!data.Messages) {
    console.log('no message found');
  } else {
    data.Messages.forEach(message => console.log(JSON.stringify(message.Body)))
  }
});
