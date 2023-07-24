import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const dynamoDBConfig = {
  endpoint: process.env.ENDPOINT,
  region: process.env.REGION,
};

export const createDynamoDBClient = () => {
  return new AWS.DynamoDB.DocumentClient(dynamoDBConfig);
};

export const createItem = async (db: AWS.DynamoDB, tableName: string, item: any) => {
  const params = {
    TableName: tableName,
    Item: item,
  };

  return db.putItem(params).promise();
};

export const readItem = async (db: AWS.DynamoDB, tableName: string, key: any) => {
  const params = {
    TableName: tableName,
    Key: key,
  };

  return db.getItem(params).promise().then((data) => data.Item);
};

export const updateItem = async (db: AWS.DynamoDB, tableName: string, key: any, updateExpression: string, expressionAttributeValues: any) => {
  const params = {
    TableName: tableName,
    Key: key,
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: 'ALL_NEW',
  };

  return db.updateItem(params).promise().then((data) => data.Attributes);
};

export const deleteItem = async (db: AWS.DynamoDB, tableName: string, key: any) => {
  const params = {
    TableName: tableName,
    Key: key,
    ReturnValues: 'ALL_OLD',
  };

  return db.deleteItem(params).promise().then((data) => data.Attributes);
};
