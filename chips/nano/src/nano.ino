#include "sensor/GPSSensor.h"
#include "display/LCDDisplay.h"
#include "storage/Fat16Storage.h"
#include "State.h"
#include "Location.h"

// Location startingLocation = {52.50497, 13.4287313};
// Location destinationLocation = {39.9961663, -7.144483};
Location startingLocation = {0.0, 0.0};
Location destinationLocation = {0.0, 0.0};
State state = {"", "1", startingLocation, destinationLocation};

Fat16Storage storage(4);                         // (CS)
TinyLCD lcd(19, 14, 18, 17, 16, 15);             // (RS, ENABLE, D4, D5, D6, D7);
SoftwareSerial softwareSerial(3, 2);             // (RX, TX)

GPSSensor gpsSensor(&softwareSerial, &state);
LCDDisplay display(&lcd, &state);

void onChangeDestination(char* line)
{
  String lineStr = String(line);
  uint8_t seperatorIndex = lineStr.indexOf(',');
  String destinationId = lineStr.substring(0, seperatorIndex);
  if (destinationId == String(state.destinationId)) {
    String latLng = lineStr.substring(destinationId.length() + 1);
    latLng.trim(); // mehhh
    uint8_t seperatorIndex = latLng.indexOf(',');
    String destinationLatitudeStr = latLng.substring(0, seperatorIndex);
    String destinationLongitudeStr = latLng.substring(seperatorIndex + 1);
    state.destinationLocation.latitude = destinationLatitudeStr.toFloat();
    state.destinationLocation.longitude = destinationLongitudeStr.toFloat();
  }
}

String destinationCommandId = "";
void onDestination(char* line)
{
  Serial.println(destinationCommandId + "," + String(line));
}

String tripCommandId = "";
void onTrip(char* line)
{
  Serial.println(tripCommandId + "," + String(line));
}

String tripRowCommandId = "";
void onTripRow(char* line)
{
  Serial.println(tripRowCommandId + "," + String(line));
}

void changeDestination()
{
  // set new destination location
  storage.getLines("DESTS", onChangeDestination);

  // figure out new trip id
  // char tripFileBuff[11];
  // strcpy(tripFileBuff, state.destinationId);
  // strcat(tripFileBuff, ".TRP");
  // uint16_t lines = storage.countLines(tripFileBuff);
  // char tripIdBuff[4];
  // sprintf(tripIdBuff, "%i", lines + 1);
  // strcpy(state.tripId, tripIdBuff);

  // add trip
  // char appendBuff[20];
  // strcpy(appendBuff, state.timestamp ? state.timestamp : state.tripId);
  // strcat(appendBuff, "\n");
  // storage.append(tripFileBuff, appendBuff);
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
    Serial.println(commandId + ",dest,trip,slat,slng,dlat,dlng,sats,fix,fixq,top,dist");
  }
  if (commandName == "liveoff") {
    liveCommandId = "";
  }
  if (commandName == "chdest") {
    remainder.toCharArray(state.destinationId, 8);
    changeDestination();
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
    tripRowFile.replace(',', '.');
    storage.getLines(tripRowFile.c_str(), onTripRow);
  }
}

void onState(char* line) {
  strcpy(state.destinationId, line);
}

void setup() {
  Serial.begin(115200);
  storage.setup();
  gpsSensor.setup();
  display.setup();
  storage.getLines("STATE", onState);
  changeDestination();
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
      // set startinglocation when not already set
      if (state.startingLocation.latitude == 0 && state.startingLocation.longitude == 0) {
        state.startingLocation.latitude = state.currentLocation.latitude;
        state.startingLocation.longitude = state.currentLocation.longitude;
      }
      // log that shit
      char logFile[12];
      strcpy(logFile, state.destinationId);
      strcat(logFile, ".");
      strcat(logFile, state.tripId);
      storage.append(logFile, state.liveToString().c_str());
    }
    shouldUpdate = true;
    timer = millis();
  }
  gpsSensor.loop(shouldUpdate);
  display.loop(shouldUpdate);
}
