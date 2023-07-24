import express, { NextFunction, Request, Response } from 'express'
import { sensorRouter } from './sensor'

export const app = express()
app.use(express.json())

app.use('/sensors', sensorRouter)

app.use((req, res, next) => {
  res.send({ message: 'Hello World' })
})

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send(error.message);
})
