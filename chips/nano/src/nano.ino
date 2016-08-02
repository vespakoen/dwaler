#include "sensor/GPSSensor.h"
#include "display/LCDDisplay.h"
#include "storage/Fat16Storage.h"
#include "State.h"
#include "Location.h"

Location startingLocation = {50.7997071, 5.7300786};
Location destinationLocation = {52.50497, 13.4287313};
State state = {startingLocation, destinationLocation, "BERLIN", 1};

Fat16Storage storage(4);                         // (CS)
TinyLCD lcd(19, 14, 18, 17, 16, 15);             // (RS, ENABLE, D4, D5, D6, D7);
SoftwareSerial softwareSerial(3, 2);             // (RX, TX)

GPSSensor gpsSensor(&softwareSerial, &state);
LCDDisplay display(&lcd, &state);

String newDest;
void onChdest(const char* line)
{
  String lineStr = String(line);
  uint8_t newDestLength = newDest.length();
  if (lineStr.substring(0, newDestLength) == newDest) {
    String latLng = lineStr.substring(newDestLength + 1);
    Serial.println(latLng);
    uint8_t seperatorIndex = latLng.indexOf(',');
    Serial.println(String(seperatorIndex));
    String destinationLatitudeStr = latLng.substring(seperatorIndex + 1);
    Serial.println(destinationLatitudeStr);
    // Serial.println(latLng);
    // String destinationLongitudeStr = latLng.substring(11, 12 + 8);
    // Serial.println(destinationLongitudeStr);
    // state.destinationLocation.latitude = latLng.substring(0, seperatorIndex).toFloat();
    // state.destinationLocation.longitude = latLng.substring(seperatorIndex + 1).toFloat();
    // state.destinationName = newDest;
    // state.tripNum = storage.countLines(newDest.c_str()) + 1;
    // String tripFile = newDest + ".TRP";
    // String appendStr = String(state.timestamp) + "\n";
    // storage.append(tripFile.c_str(), appendStr.c_str());
  }
}

String destinationCommandId = "";
void onDestination(const char* line)
{
  Serial.println(destinationCommandId + "," + String(line));
}

String tripCommandId = "";
void onTrip(const char* line)
{
  Serial.println(tripCommandId + "," + String(line));
}

String tripRowCommandId = "";
void onTripRow(const char* line)
{
  Serial.println(tripRowCommandId + "," + String(line));
}

String liveCommandId = "";
void handleCommand(String command)
{
  uint8_t seperatorIndex = command.indexOf(',');
  String commandId = command.substring(0, seperatorIndex);
  String remainder = command.substring(seperatorIndex + 1);
  seperatorIndex = remainder.indexOf(',');
  String commandName = remainder.substring(0, seperatorIndex);
  remainder = remainder.substring(seperatorIndex + 1);
  if (commandName == "live") {
    liveCommandId = commandId;
  }
  if (commandName == "liveh" || commandName == "triph") {
    Serial.println(commandId + ",ts,lat,lng,alt");
  }
  if (commandName == "state") {
    Serial.println(commandId + "," + state.toString());
  }
  if (commandName == "stateh") {
    Serial.println(commandId + ",slat,slng,dlat,dlng,dest,sats,fix,fixq,top,dist,trip");
  }
  if (commandName == "liveoff") {
    liveCommandId = "";
  }
  if (commandName == "chdest") {
    if (state.destinationName != newDest) {
      newDest = remainder;
      storage.getLines("DESTS", onChdest);
    }
  }
  if (commandName == "dests") {
    destinationCommandId = commandId;
    storage.getLines("DESTS", onDestination);
  }
  if (commandName == "destsh") {
    Serial.println(commandId + ",name,lat,lng");
  }
  if (commandName == "trips") {
    tripCommandId = commandId;
    String tripFile = remainder + ".TRP";
    storage.getLines(tripFile.c_str(), onTrip);
  }
  if (commandName == "tripsh") {
    Serial.println(commandId + ",ts");
  }
  if (commandName == "trip") {
    tripRowCommandId = commandId;
    String tripRowFile = remainder;
    tripRowFile.replace(',', '-');
    storage.getLines(tripRowFile.c_str(), onTripRow);
  }
}

void onState(const char* line) {
  newDest = String(line);
  storage.getLines("DESTS", onChdest);
}

void setup() {
  Serial.begin(115200);
  storage.setup();
  gpsSensor.setup();
  display.setup();
  storage.getLines("STATE", onState);
}

uint32_t timer = millis();
uint8_t parseIndex = 0;
char parsedCommand[50];
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
      handleCommand(parsedCommandStr);
      parsedCommand[0] = '\0';
      parseIndex = 0;
    }
  }
  if (millis() - timer > 500) {
    if (liveCommandId != "") {
      Serial.println(liveCommandId + "," + state.liveToString());
    }
    if (state.fix) {
      String logFile = state.destinationName + "-" + String(state.tripNum);
      storage.append(logFile.c_str(), state.liveToString().c_str());
    }
    shouldUpdate = true;
    timer = millis();
  }
  gpsSensor.loop(shouldUpdate);
  display.loop(shouldUpdate);
}
