#ifndef Sensor_h
#define Sensor_h

class Sensor
{
  public:
    virtual String serializeValueForUpdateType(String updateType);
    virtual String serialize();
    virtual void setup();
    virtual void loop();
};

#endif
