#include "SensorCollection.h"

SensorCollection::SensorCollection(Sensor* sensors[], uint8_t sensorCount)
{
  _sensors = sensors;
  _sensorCount = sensorCount;
}

Sensor* SensorCollection::getSensor(String sensorId)
{
  return _sensors[0];
}

String SensorCollection::serialize()
{
  String result;
  for (uint8_t i = 0; i < _sensorCount; i++) {
    result += _sensors[i]->serialize();
    if (i != _sensorCount - 1) {
      result += ";";
    }
  }
  return result;
}

void SensorCollection::setup()
{
  for (uint8_t i = 0; i < _sensorCount; i++) {
    _sensors[i]->setup();
  }
}

void SensorCollection::loop()
{
  for (uint8_t i = 0; i < _sensorCount; i++) {
    _sensors[i]->loop();
  }
}
