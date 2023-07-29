import express from 'express'
import { SensorRepository } from '../repositories'
import { createDynamoDBClient } from '../gateways/dynamodbExample'

export const sensorRouter = express.Router()

const docClient = createDynamoDBClient()
const repository = new SensorRepository(docClient, 'SensorData')

sensorRouter.get('/', (req, res) => {
  res.send({ message: 'Get all sensor data' })
})

sensorRouter.get('/:id', async (req, res) => {
  const sensorId = req.params.id
  const sensor = await repository.getSensorData(sensorId, '')
  res.send({ message: sensor })
})

sensorRouter.put('/:id', async (req, res) => {
  const SensorID = req.params.id
  const { SensorType, Timestamp, Value } = req.body
  await repository.updateSensorData({ SensorID, SensorType, Timestamp, Value })
  res.send({ message: `Updated sensor with ID ${SensorID} to: ${JSON.stringify(req.body)}` });
})

sensorRouter.delete('/:id', async (req, res) => {
  const SensorID = req.params.id;
  await repository.deleteSensorData({ SensorID, Timestamp: '' })
  res.send({ message: `Delete sensor with ID ${SensorID}` });
});
