#include "GPSSensor.h"
#include "State.h"
#include "DisplayLCD.h"
#include "Storage.h"
#include "Location.h"

Location startingLocation = {52.50497, 13.4287313};
Location destinationLocation = {50.7997071, 5.7300786};

Storage store(4);                                // (CS)
TinyLCD lcd(19, 14, 18, 17, 16, 15);             // (RS, ENABLE, D4, D5, D6, D7);
SoftwareSerial softwareSerial(3, 2);             // (RX, TX)
TinyGPS gps;

State state = {startingLocation, destinationLocation};

GPSSensor GPSSensor(&gps, &softwareSerial, &state);
DisplayLCD DisplayLCD(&lcd, &state);

void setup() {
  Serial.begin(115200);
  store.setup();
  GPSSensor.setup();
  DisplayLCD.setup();
}

uint32_t timer = millis();
void loop() {
  bool shouldUpdate = false;
  if (millis() - timer > 3000) {
    if (state.fix) {
      Serial.println(state.toString());
      store.append("LOG", state.toString().c_str());
    }
    shouldUpdate = true;
    timer = millis();
  }
  GPSSensor.loop(shouldUpdate);
  DisplayLCD.loop(shouldUpdate);
}
