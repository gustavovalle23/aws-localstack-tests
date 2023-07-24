import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import { createDynamoDBClient } from '../gateways/dynamodbExample';

dotenv.config();

const docClient = createDynamoDBClient()

interface SensorData {
  SensorID: string;
  Timestamp: string;
  PatientID: string;
  SensorType: string;
  Value: number;
}

const sensorDataTable = 'SensorData';

async function createSensorData({ PatientID, SensorID, Value, SensorType, Timestamp }: SensorData): Promise<void> {
  const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
    TableName: sensorDataTable,
    Item: {
      SensorID,
      Timestamp,
      PatientID,
      SensorType,
      Value
    },
  };

  try {
    await docClient.put(params).promise();
    console.log('Sensor Data created successfully.');
  } catch (error) {
    console.error('Error creating Sensor Data:', error);
  }
}

async function getSensorData(sensorID: string, timestamp: string): Promise<void> {
  const params: AWS.DynamoDB.DocumentClient.GetItemInput = {
    TableName: sensorDataTable,
    Key: {
      SensorID: sensorID,
      Timestamp: timestamp,
    },
  };

  try {
    const result = await docClient.get(params).promise();
    if (result.Item) {
      console.log('Sensor Data:', result.Item);
    } else {
      console.log('Sensor Data not found.');
    }
  } catch (error) {
    console.error('Error retrieving Sensor Data:', error);
  }
}

async function updateSensorData(
  sensorID: string,
  timestamp: string,
  sensorType: string,
  value: number
): Promise<void> {
  const params: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
    TableName: sensorDataTable,
    Key: {
      SensorID: sensorID,
      Timestamp: timestamp,
    },
    UpdateExpression: 'set SensorType = :st, Value = :val',
    ExpressionAttributeValues: {
      ':st': sensorType,
      ':val': value,
    },
    ReturnValues: 'UPDATED_NEW',
  };

  try {
    await docClient.update(params).promise();
    console.log('Sensor Data updated successfully.');
  } catch (error) {
    console.error('Error updating Sensor Data:', error);
  }
}

async function deleteSensorData(sensorID: string, timestamp: string): Promise<void> {
  const params: AWS.DynamoDB.DocumentClient.DeleteItemInput = {
    TableName: sensorDataTable,
    Key: {
      SensorID: sensorID,
      Timestamp: timestamp,
    },
  };

  try {
    await docClient.delete(params).promise();
    console.log('Sensor Data deleted successfully.');
  } catch (error) {
    console.error('Error deleting Sensor Data:', error);
  }
}

async function main(): Promise<void> {
  const SensorID = uuidv4();
  const Timestamp = new Date().toISOString();
  await createSensorData({ PatientID: 'patient-1', SensorID, SensorType: 'presence', Timestamp, Value: 1 });

  await getSensorData('sensor-1', '2023-07-23T10:00:00Z');
  await updateSensorData('sensor-1', '2023-07-23T10:00:00Z', 'heart-rate', 80);
  await deleteSensorData('sensor-1', '2023-07-23T10:00:00Z');
}

main();
