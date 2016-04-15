#ifndef Handler_h
#define Handler_h

#include <Arduino.h>
#include "../sensors/Sensor.h"

class Handler
{
  public:
    virtual void onReading(String sensorId, String updateType, Sensor *sensor);
    virtual void setup();
    virtual void loop();
};

#endif
