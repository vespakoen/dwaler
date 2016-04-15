#include "SerialHandler.h"

SerialHandler::SerialHandler(unsigned long baudRate)
{
  _baudRate = baudRate;
}

void SerialHandler::onReading(String sensorId, String updateType, Sensor *sensor)
{
  Serial.println(sensorId + "$" + updateType + "$" + sensor->serializeValueForUpdateType(updateType));
}

void SerialHandler::setup()
{
  Serial.begin(_baudRate);
}

void SerialHandler::loop()
{
}
