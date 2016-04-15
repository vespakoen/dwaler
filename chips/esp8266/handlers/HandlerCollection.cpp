#include "HandlerCollection.h"

HandlerCollection::HandlerCollection(Handler* handlers[], uint8_t handlerCount)
{
  _handlers = handlers;
  _handlerCount = handlerCount;
}

void HandlerCollection::onReading(String sensorId, String updateType, Sensor *sensor)
{
  for (uint8_t i = 0; i < _handlerCount; i++) {
    _handlers[i]->onReading(sensorId, updateType, sensor);
  }
}

void HandlerCollection::setup()
{
  for (uint8_t i = 0; i < _handlerCount; i++) {
    _handlers[i]->setup();
  }
}

void HandlerCollection::loop()
{
  for (uint8_t i = 0; i < _handlerCount; i++) {
    _handlers[i]->loop();
  }
}
