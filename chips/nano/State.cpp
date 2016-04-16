#include "State.h"

State::State(uint8_t activeScreen, const char *tripName)
{
  _activeScreen = activeScreen;
  _tripName = tripName;
}

State::State()
{
  _activeScreen = 0;
  _tripName = "";
  _startingLocation = Location(0, 0);
  _destinationLocation = Location(0, 0);
  _topSpeed = 0;
  _travelledDistance = 0;
}

uint8_t State::getActiveScreen()
{
  return _activeScreen;
}

void State::setActiveScreen(uint8_t activeScreen)
{
  _activeScreen = activeScreen;
}

void State::getTripName(char *buffer, uint8_t size)
{
  strncpy(buffer, _tripName, size -1);
  buffer[size - 1] = 0;
}

void State::setStartingLocation(Location location)
{
  _startingLocation = location;
}

void State::setDestinationLocation(Location location)
{
  _destinationLocation = location;
}

Location State::getStartingLocation()
{
  return _startingLocation;
}

Location State::getDestinationLocation()
{
  return _destinationLocation;
}

void State::setTopSpeed(float topSpeed)
{
  _topSpeed = topSpeed;
}

float State::getTopSpeed()
{
  return _topSpeed;
}

void State::setTravelledDistance(float travelledDistance)
{
  _travelledDistance = travelledDistance;
}

float State::getTravelledDistance()
{
  return _travelledDistance;
}

String State::toString()
{
  // char tripNameBuffer[14];
  // getTripName(tripNameBuffer, 14);
  return String(_activeScreen) + "," +
    String(_tripName) + "," +
    _startingLocation.toString() + "," +
    String(_topSpeed, 2) + "," +
    String(_travelledDistance, 2);
}

void State::toString(char* buff)
{
  String str = toString();
  str.toCharArray(buff, 50);
}
