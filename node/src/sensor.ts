import express from 'express'

export const sensorRouter = express.Router()

sensorRouter.get('/', (req, res) => {
  res.send({ message: 'Get all sensor data' })
})

sensorRouter.get('/:id', (req, res) => {
  const sensorId = req.params.id
  res.send({ message: `Get sensor with ID ${sensorId}` })
})

sensorRouter.put('/:id', (req, res) => {
  const sensorId = req.params.id
  res.send({ message: `Updated sensor with ID ${sensorId} to: ${JSON.stringify(req.body)}` });
})

sensorRouter.delete('/:id', (req, res) => {
  const sensorId = req.params.id;
  res.send({ message: `Delete sensor with ID ${sensorId}` });
});
