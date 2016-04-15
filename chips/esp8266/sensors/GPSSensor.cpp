#include "GPSSensor.h"

GPSSensor::GPSSensor(String sensorId, Handler* handler)
{
  _sensorId = sensorId;
  _handler = handler;
  _heading = 0;
  _location = Location(0, 0);
}

String GPSSensor::locationToString()
{
  return _location.toString();
}

String GPSSensor::headingToString()
{
  return String(_heading);
}

String GPSSensor::serializeValueForUpdateType(String updateType)
{
  if (updateType == "location") {
    return locationToString();
  }
  if (updateType == "heading") {
    return headingToString();
  }
}

String GPSSensor::serialize()
{
  return _sensorId + ":" + locationToString() + "," + headingToString();
}

void GPSSensor::setup()
{
}

long lastTime = millis();
void GPSSensor::loop()
{
  if (millis() - lastTime > 10) {
    _heading = random(0, 360);
    _handler->onReading(_sensorId, "heading", this);
    _location = Location(random(-90, 90), random(-180, 180));
    _handler->onReading(_sensorId, "location", this);
    lastTime = millis();
  }
}
