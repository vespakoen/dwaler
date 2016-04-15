#ifndef WebSocketHandler_h
#define WebSocketHandler_h

#include <Arduino.h>
#include "Handler.h"
#include "../sensors/Sensor.h"
#include "../libs/websocketserver/WebSocketsServer.h"

class WebSocketHandler : public Handler {
  public:
    WebSocketHandler();
    void onReading(String sensorId, String updateType, Sensor *sensor);
    void broadcast(String type, String message);
    void setup();
    void loop();
  private:
    WebSocketsServer *_webSocketsServer;
};

#endif
