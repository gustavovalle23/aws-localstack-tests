import AWS from 'aws-sdk';
import { DeleteSensorInput, SensorData, UpdateSensorInput } from './types';


export class SensorRepository {
  private docClient: AWS.DynamoDB.DocumentClient;
  private sensorDataTable: string;

  constructor(docClient: AWS.DynamoDB.DocumentClient, tableName: string) {
    this.docClient = docClient;
    this.sensorDataTable = tableName;
  }

  async createSensorData({ PatientID, SensorID, Value, SensorType, Timestamp }: SensorData): Promise<AWS.DynamoDB.DocumentClient.PutItemOutput | void> {
    const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
      TableName: this.sensorDataTable,
      Item: {
        SensorID,
        Timestamp,
        PatientID,
        SensorType,
        Value
      },
    };

    try {
      return (await this.docClient.put(params).promise()).$response.data;
    } catch (error) {
      console.error('Error creating Sensor Data:', error);
    }
  }

  async getSensorData(sensorID: string, timestamp: string): Promise<AWS.DynamoDB.DocumentClient.AttributeMap | void> {
    const params: AWS.DynamoDB.DocumentClient.GetItemInput = {
      TableName: this.sensorDataTable,
      Key: {
        SensorID: sensorID,
        Timestamp: timestamp,
      },
    };

    try {
      const result = await this.docClient.get(params).promise();
      if (result.Item) {
        return result.Item
      } else {
        console.log('Sensor Data not found.');
      }
    } catch (error) {
      console.error('Error retrieving Sensor Data:', error);
    }
  }

  async updateSensorData({ SensorID, Timestamp, SensorType, Value }: UpdateSensorInput): Promise<void> {
    const params: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
      TableName: this.sensorDataTable,
      Key: {
        SensorID,
        Timestamp,
      },
      UpdateExpression: 'set SensorType = :st, Value = :val',
      ExpressionAttributeValues: {
        ':st': SensorType,
        ':val': Value,
      },
      ReturnValues: 'UPDATED_NEW',
    };

    try {
      await this.docClient.update(params).promise();
    } catch (error) {
      console.error('Error updating Sensor Data:', error);
    }
  }

  async deleteSensorData({ SensorID, Timestamp }: DeleteSensorInput): Promise<void> {
    const params: AWS.DynamoDB.DocumentClient.DeleteItemInput = {
      TableName: this.sensorDataTable,
      Key: {
        SensorID,
        Timestamp,
      },
    };

    try {
      await this.docClient.delete(params).promise();
    } catch (error) {
      console.error('Error deleting Sensor Data:', error);
    }
  }
}
