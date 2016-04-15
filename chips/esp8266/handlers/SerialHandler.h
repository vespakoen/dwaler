#ifndef SerialHandler_h
#define SerialHandler_h

#include <Arduino.h>
#include "Handler.h"
#include "../sensors/Sensor.h"

class SerialHandler : public Handler {
  public:
    SerialHandler(unsigned long baudRate);
    void onReading(String sensorId, String updateType, Sensor *sensor);
    void setup();
    void loop();
  private:
    unsigned long _baudRate;
};

#endif
