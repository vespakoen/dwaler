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
bool isParsing = false;
String liveCommandId = "";
String regularCommandId = "";
char parsedCommand[50];
uint8_t parseIndex = 0;

String destinationCommandId = "";
void onDestination(const char* line)
{
  Serial.println(destinationCommandId + "," + String(line));
}

String tripCommandId = "";
void onTripRow(const char* line)
{
  Serial.println(tripCommandId + "," + String(line));
}

void loop() {
  bool shouldUpdate = false;

  while (Serial.available()) {
    char c = Serial.read();
    if (c != '\n' && c != '\r') {
      parsedCommand[parseIndex] = c;
      parseIndex++;
    } else {
      parsedCommand[parseIndex] = '\0';
      String parsedCommandStr = String(parsedCommand);
      uint8_t seperatorIndex = parsedCommandStr.indexOf(',');
      String commandId = parsedCommandStr.substring(0, seperatorIndex);
      String remainder = parsedCommandStr.substring(seperatorIndex + 1);
      seperatorIndex = remainder.indexOf(',');
      String command = remainder.substring(0, seperatorIndex);
      remainder = remainder.substring(seperatorIndex + 1);
      if (command == "live") {
        liveCommandId = commandId;
      }
      if (command == "liveh" || command == "triph") {
        Serial.println(commandId + ",ts,lat,lng,alt");
      }
      if (command == "regular") {
        regularCommandId = commandId;
      }
      if (command == "regularh" || command == "stateh") {
        Serial.println(commandId + ",slat,slng,dlat,dlng,sats,fix,fix,top,distance");
      }
      if (command == "liveoff") {
        liveCommandId = "";
      }
      if (command == "regularoff") {
        regularCommandId = "";
      }
      if (command == "state") {
        Serial.println(commandId + "," + state.regularToString());
      }
      if (command == "dests") {
        destinationCommandId = commandId;
        storage.getLines("DESTS", onDestination);
      }
      if (command == "destsh") {
        Serial.println(commandId + ",name,lat,lng");
      }
      if (command == "trip") {
        tripCommandId = commandId;
        String tripFile = remainder;
        tripFile.replace(',', '-');
        storage.getLines(tripFile.c_str(), onTripRow);
      }
      parsedCommand[0] = '\0';
      parseIndex = 0;
    }
  }

  if (millis() - timer > 500) {
    if (divider % 4 == 0 || divider % 8 == 0 || divider % 12 == 0 || divider % 16 == 0) {
      if (regularCommandId != "") {
        Serial.println(regularCommandId + "," + state.regularToString());
      }
    }
    if (divider % 16 == 0) {
      divider = 1;
    } else {
      divider++;
    }
    if (liveCommandId != "") {
      Serial.println(liveCommandId + "," + state.liveToString());
    }
    if (state.fix) {
      storage.append("LOG", state.liveToString().c_str());
    }
    shouldUpdate = true;
    timer = millis();
  }
  gpsSensor.loop(shouldUpdate);
  display.loop(shouldUpdate);
}
