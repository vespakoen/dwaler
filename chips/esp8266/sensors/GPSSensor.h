#ifndef GPSSensor_h
#define GPSSensor_h

#include <Arduino.h>
#include "Sensor.h"
#include "../Location.h"
#include "../handlers/Handler.h"

class GPSSensor : public Sensor {
  public:
    GPSSensor(String sensorId, Handler* handler);
    String locationToString();
    String headingToString();
    String serializeValueForUpdateType(String updateType);
    String serialize();
    void setup();
    void loop();
  private:
    String _sensorId;
    Location _location;
    uint16_t _heading;
    Handler* _handler;
};

#endif
