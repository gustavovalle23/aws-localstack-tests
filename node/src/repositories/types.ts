export interface SensorData {
  SensorID: string;
  Timestamp: string;
  PatientID: string;
  SensorType: string;
  Value: number;
}

export interface UpdateSensorInput {
  SensorID: string;
  Timestamp: string;
  SensorType: string;
  Value: number;
}

export interface DeleteSensorInput {
  SensorID: string;
  Timestamp: string;
}
