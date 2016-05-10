// MANAGER INCLUDES
#include "services/WiFiManager.h"

// SENSOR INCLUDES
#include "sensors/Sensor.h"
#include "sensors/SensorCollection.h"
#include "sensors/GPSSensor.h"

// HANDLER INCLUDES
#include "handlers/Handler.h"
#include "handlers/HandlerCollection.h"
// #include "handlers/SerialHandler.h"
#include "handlers/WebSocketHandler.h"

// CONSTRUCT MANAGERS
WiFiManager wiFiManager("Dwaler", "dwaler");

// CONSTRUCT HANDLERS
// SerialHandler serialHandler;
WebSocketHandler webSocketHandler;
// LCDDisplayHandler displayHandler;
Handler* handlers[] = { &webSocketHandler/*, &serialHandler, &displayHandler*/ };
HandlerCollection handlerCollection(handlers, sizeof(handlers) / sizeof(Handler));

// CONSTRUCT SENSORS
GPSSensor gpsSensor("gps", &handlerCollection);
// TempSensor tempSensor(&handlerCollection, 12);
// RPMSensor rpmSensor(&handlerCollection, 13);
// FuelSensor fuelSensor(&handlerCollection, 13);
Sensor* sensors[] = { &gpsSensor };
SensorCollection sensorCollection(sensors, sizeof(sensors) / sizeof(Sensor));

// INITIALIZE
void setup() {
  wiFiManager.setup();
  handlerCollection.setup();
  sensorCollection.setup();
  GPSSensor gpsSensor = sensorCollection.getSensor("gps");
  Serial.println(gpsSensor->locationToString());
}

// LOOP
long lastStateUpdateTime = millis();
void loop() {
  wiFiManager.loop();
  handlerCollection.loop();
  sensorCollection.loop();
  if (millis() - lastStateUpdateTime > 2000) {
    webSocketHandler.broadcast("state", sensorCollection.serialize());
    lastStateUpdateTime = millis();
  }
}
