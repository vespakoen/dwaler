#ifndef h_GPSSensor
#define h_GPSSensor

#include "Arduino.h"
#include <SoftwareSerial.h>
#include <TinyGPS.h>
#include "../Location.h"
#include "../State.h"
#include "../config.h"

class GPSSensor {
  public:
    GPSSensor(SoftwareSerial* softwareSerial, State *state);
    void setup();
    void loop(bool shouldUpdate);
  private:
    SoftwareSerial* _softwareSerial;
    State* _state;
};

#endif
