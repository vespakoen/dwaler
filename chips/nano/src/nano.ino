#include "sensor/GPSSensor.h"
#include "display/LCDDisplay.h"
#include "storage/Fat16Storage.h"
#include "State.h"
#include "Location.h"

Location startingLocation = {50.7997071, 5.7300786};
Location destinationLocation = {52.50497, 13.4287313};
State state = {startingLocation, destinationLocation};

Fat16Storage storage(4);                         // (CS)
TinyLCD lcd(19, 14, 18, 17, 16, 15);             // (RS, ENABLE, D4, D5, D6, D7);
SoftwareSerial softwareSerial(3, 2);             // (RX, TX)

GPSSensor gpsSensor(&softwareSerial, &state);
LCDDisplay display(&lcd, &state);

void setup() {
  Serial.begin(115200);
  storage.setup();
  gpsSensor.setup();
  display.setup();
}

uint32_t timer = millis();
uint8_t divider = 1;
void loop() {
  bool shouldUpdate = false;
  if (millis() - timer > 500) {
    if (divider % 4 == 0 || divider % 8 == 0 || divider % 12 == 0 || divider % 16 == 0) {
      Serial.println("r:" + state.regularToString());
    }
    if (divider % 16 == 0) {
      Serial.println("hl:" + state.liveHeaderToString());
      Serial.println("hr:" + state.regularHeaderToString());
      divider = 1;
    } else {
      divider++;
    }
    Serial.println("l:" + state.liveToString());
    if (state.fix) {
      storage.append("LOG", state.liveToString().c_str());
    }
    shouldUpdate = true;
    timer = millis();
  }
  gpsSensor.loop(shouldUpdate);
  display.loop(shouldUpdate);
}
