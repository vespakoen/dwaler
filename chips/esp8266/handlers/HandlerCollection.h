#ifndef HandlerCollection_h
#define HandlerCollection_h

#include <Arduino.h>
#include "Handler.h"
#include "../sensors/Sensor.h"

class HandlerCollection : public Handler {
  public:
    HandlerCollection(Handler* handlers[], uint8_t handlerCount);
    void onReading(String sensorId, String updateType, Sensor *sensor);
    void setup();
    void loop();
  private:
    Handler** _handlers;
    uint8_t _handlerCount;
};

#endif
