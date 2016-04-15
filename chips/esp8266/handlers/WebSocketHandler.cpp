#include "WebSocketHandler.h"

WebSocketsServer webSocketsServer(8081);

static void _onEvent(uint8_t num, WStype_t type, uint8_t * payload, size_t length)
{
  switch (type) {
    case WStype_DISCONNECTED:
      Serial.printf("[%u] Disconnected!\n", num);
      break;
    case WStype_CONNECTED:
      Serial.printf("[%u] Connected\n", num);
      break;
  }
}

WebSocketHandler::WebSocketHandler()
{
}

void WebSocketHandler::onReading(String sensorId, String updateType, Sensor *sensor)
{
  broadcast(sensorId + "." + updateType, sensor->serializeValueForUpdateType(updateType));
}

void WebSocketHandler::broadcast(String type, String message)
{
  webSocketsServer.broadcastTXT(type + "$" + message);
}

void WebSocketHandler::setup()
{
  webSocketsServer.begin();
  webSocketsServer.onEvent(_onEvent);
}

void WebSocketHandler::loop()
{
  webSocketsServer.loop();
}
