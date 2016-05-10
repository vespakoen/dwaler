#ifndef h_GPSSensor
#define h_GPSSensor

#include "Arduino.h"
#include <SoftwareSerial.h>
#include <TinyGPS.h>
#include "Location.h"
#include "State.h"

class GPSSensor {
  public:
    GPSSensor(TinyGPS *gps, SoftwareSerial* softwareSerial, State *state);
    void setup();
    void loop(bool shouldUpdate);
  private:
    TinyGPS* _gps;
    SoftwareSerial* _softwareSerial;
    State* _state;
};

#endif
