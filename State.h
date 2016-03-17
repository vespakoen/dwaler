#ifndef h_State
#define h_State

#include "Arduino.h"

class State {
  public:
    State(uint8_t activeScreen, const char* tripName);
    uint8_t getActiveScreen();
    void getTripName(char *buffer, uint8_t size);
    void toString(char* buff);
  private:
    uint8_t _activeScreen;
    const char* _tripName;
};

#endif
