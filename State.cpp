#include "State.h"

State::State(uint8_t activeScreen, const char *tripName)
{
  _activeScreen = activeScreen;
  _tripName = tripName;
}

uint8_t State::getActiveScreen()
{
  return _activeScreen;
}

void State::getTripName(char *buffer, uint8_t size)
{
  strncpy(buffer, _tripName, size -1);
  buffer[size -1] = 0;
}

void State::toString(char* buff)
{
  char activeScreenBuffer[3];
  char tripNameBuffer[14];
  getTripName(tripNameBuffer, 14);
  uint8_t activeScreen = getActiveScreen();
  itoa(activeScreen, activeScreenBuffer, 10);
  strcpy(buff, activeScreenBuffer);
  strcat(buff, ",");
  strcat(buff, tripNameBuffer);
}
