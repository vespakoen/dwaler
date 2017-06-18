#include "sensor/GPSSensor.h"
#include "display/LCDDisplay.h"
#include "storage/Fat16Storage.h"
#include "State.h"
#include "Location.h"

Location startingLocation = {0.0, 0.0};
Location destinationLocation = {0.0, 0.0};
State state = {"", "", startingLocation, destinationLocation};

Fat16Storage storage(4);                         // (CS)
TinyLCD lcd(19, 14, 18, 17, 16, 15);             // (RS, ENABLE, D4, D5, D6, D7);
SoftwareSerial softwareSerial(3, 2);             // (RX, TX)
GPSSensor gpsSensor(&softwareSerial, &state);
LCDDisplay display(&lcd, &state);
IO io(&state, &storage);
Dwaler dwaler(&state, &storage);

void setup()
{
  io.setup();
  storage.setup();
  gpsSensor.setup();
  display.setup();
  dwaler.setup();
}

uint32_t timer = millis();
void loop()
{
  bool shouldUpdate = false;
  // every half a second
  if (millis() - timer > 500) {
    shouldUpdate = true;
    timer = millis();
  }
  gpsSensor.loop(shouldUpdate);
  display.loop(shouldUpdate);
  io.loop(shouldUpdate);
  dwaler.loop(shouldUpdate);
}
