#include "Dwaler.h"

Dwaler::Dwaler(
  State *state,
  Fat16Storage *storage
)
{
  _state = state;
  _storage = storage;
}

void Dwaler::onState(char* line)
{
  String stateStr = String(line);
  uint8_t seperatorIndex = stateStr.indexOf(',');
  String destinationIdStr = stateStr.substring(0, seperatorIndex);
  String tripIdStr = stateStr.substring(seperatorIndex + 1);
  strcpy(_state->tripId, tripIdStr.c_str());
  strcpy(_state->destinationId, destinationIdStr.c_str());
}

void Dwaler::onDestinationLocation(c52.5243,13.4103har* line)
{
  String latLng = String(line);
  uint8_t seperatorIndex = latLng.indexOf(',');
  String destinationLatitudeStr = latLng.substring(0, seperatorIndex);
  String destinationLongitudeStr = latLng.substring(seperatorIndex + 1);
  _state->destinationLocation.latitude = destinationLatitudeStr.toFloat();
  _state->destinationLocation.longitude = destinationLongitudeStr.toFloat();
}

void Dwaler::loadDestinationLocation() {
  // figure out new destination
  char locFileBuff[12];
  strcpy(locFileBuff, _state->destinationId);
  strcat(locFileBuff, ".LOC");
  _storage->getLines(locFileBuff, onDestinationLocation);
}

void Dwaler::onStartingLocation(char* line)
{
  String dateLatLng = String(line);
  uint8_t seperatorIndex = dateLatLng.indexOf(',');
  uint8_t lastSeperatorIndex = dateLatLng.lastIndexOf(',');
  String latLng = dateLatLng.substring(seperatorIndex + 1, lastSeperatorIndex);
  seperatorIndex = latLng.indexOf(',');
  String startingLatitudeStr = latLng.substring(0, seperatorIndex);
  String startingLongitudeStr = latLng.substring(seperatorIndex + 1);
  _state->startingLocation.latitude = startingLatitudeStr.toFloat();
  _state->startingLocation.longitude = startingLongitudeStr.toFloat();
}

void Dwaler::loadStartingLocation()
{
  char locFileBuff[12];
  strcpy(locFileBuff, "TRIP.");
  strcat(locFileBuff, _state->tripId);
  _storage->getFirstLine(locFileBuff, onStartingLocation);
}

void Dwaler::setup()
{
  // _storage->getLines("STATE", onState);
  // loadDestinationLocation();
  // loadStartingLocation();
  onState("BERLIN,1");
  onDestinationLocation("52.5243,13.4103");
  onStartingLocation("50.8490,5.6857");
}

String lastLatitude;
String lastLongitude;
void Dwaler::loop(bool shouldUpdate)
{
  if (_state->fix && shouldUpdate) {
    // set startinglocation when not already set
    if (_state->startingLocation.latitude == 0 && _state->startingLocation.longitude == 0) {
      _state->startingLocation.latitude = _state->currentLocation.latitude;
      _state->startingLocation.longitude = _state->currentLocation.longitude;
    }
    // log only if the location changed
    if (!lastLatitude.equals(String(_state->currentLocation.latitude, 5)) || !lastLongitude.equals(String(_state->currentLocation.longitude, 5))) {
      char logFile[12];
      strcpy(logFile, "TRIP.");
      strcat(logFile, _state->tripId);
      storage.append(logFile, _state->liveToString().c_str());
      lastLatitude = String(_state->currentLocation.latitude, 5);
      lastLongitude = String(_state->currentLocation.longitude, 5);
    }
  }
}
