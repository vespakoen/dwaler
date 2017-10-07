#include "IO.h"

IO::IO(
  State *state,
  Fat16Storage *storage
)
{
  _state = state;
  _storage = storage;
}

String destinationCommandId = "";
void onDestination(char* line)
{
  Serial.print(destinationCommandId + "," + String(line));
}

void IO::changeDestination() {
  loadDestinationLocation();

  // figure out new trip id
  char tripFileBuff[6] = "TRIPS";
  uint16_t lines = storage.countLines(tripFileBuff);
  char tripIdBuff[4];
  sprintf(tripIdBuff, "%i", lines);
  strcpy(state.tripId, tripIdBuff);

  // add trip
  char appendBuff[20];
  strcpy(appendBuff, state.timestamp);
  storage.append(tripFileBuff, appendBuff);
}

String tripCommandId = "";
void IO::onTrip(char* line)
{
  Serial.print(tripCommandId + "," + String(line));
}

String tripRowCommandId = "";
void IO::onTripRow(char* line)
{
  Serial.print(tripRowCommandId + "," + String(line));
}

String liveCommandId = "";
void IO::handleCommand(String command)
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
  if (commandName == "state") {
    Serial.println(commandId + "," + state.toString());
  }
  if (commandName == "liveoff") {
    liveCommandId = "";
  }
  if (commandName == "chdest") {
    onState((char *) remainder.c_str());
    changeDestination();
  }
  if (commandName == "dests") {
    destinationCommandId = commandId;
    storage.getLines("DESTS", onDestination);
  }
  if (commandName == "trips") {
    // tripCommandId = commandId;
    // String tripFile = remainder + ".TRP";
    storage.getLines("TRIPS", onTrip);
  }
  if (commandName == "trip") {
    tripRowCommandId = commandId;
    String tripRowFile = remainder;
    tripRowFile.replace(',', '.');
    storage.getLines(tripRowFile.c_str(), onTripRow);
  }
}

void IO::setup()
{
  Serial.begin(115200);
}

char parsedCommand[50];
uint8_t parseIndex = 0;
void IO::loop(bool shouldUpdate)
{
  if (liveCommandId != "" && shouldUpdate) {
    Serial.println(liveCommandId + "," + state.liveToString());
  }
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
}
