#ifndef SensorCollection_h
#define SensorCollection_h

#include <Arduino.h>
#include "Sensor.h"

class SensorCollection
{
  public:
    SensorCollection(Sensor* sensors[], uint8_t sensorCount);
    Sensor* getSensor(String sensorId);
    String serialize();
    void setup();
    void loop();
  private:
    Sensor** _sensors;
    uint8_t _sensorCount;
};

#endif
